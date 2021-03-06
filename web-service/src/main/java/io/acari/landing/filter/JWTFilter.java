package io.acari.landing.filter;

import io.acari.landing.auth.AuthConfigs;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.util.annotation.NonNull;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static io.acari.landing.auth.SecurityUtils.HEADER_KEY;
import static io.acari.landing.auth.SecurityUtils.TOKEN_PREFIX;

@Component
public class JWTFilter implements WebFilter {

    @Override
    @NonNull
    public Mono<Void> filter(@NonNull ServerWebExchange exchange, @NonNull WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        if(isIgnored(request.getURI().getPath())){
            return chain.filter(exchange);
        }

        ServerHttpResponse response = exchange.getResponse();
        List<String> authHeaders = request.getHeaders().get(HEADER_KEY);

        if (rejectRequest(authHeaders)) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        return getAuthentication(authHeaders)
                .filter(Authentication::isAuthenticated)
                .onErrorMap(t->new AccessDeniedException("YOU SHALL NOT PASS"))
                .switchIfEmpty(Mono.error(new AccessDeniedException("YOU SHALL NOT PASS!!")))
                .flatMap(goodToken -> chain.filter(exchange));

    }

    private boolean rejectRequest(List<String> authHeaders) {
        return authHeaders == null || authHeaders.stream().noneMatch(s -> s.startsWith(TOKEN_PREFIX));
    }

    private boolean isIgnored(String path) {
        return path.lastIndexOf("/") == 0 ||
                path.equals("/api/projects") ||
                path.startsWith("/api/image/get/") ||
                path.equals("/api/token");
    }


    private Mono<UsernamePasswordAuthenticationToken> getAuthentication(List<String> request) {
        return Mono.just(request)
                .filter(Objects::nonNull)
                .filter(headers -> !headers.isEmpty())
                .map(headers -> headers.get(0))
                .filter(Objects::nonNull)
                .map(token ->
                        Jwts.parser()
                                .setSigningKey(AuthConfigs.Configs.SECRET.getValue().getBytes())
                                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                                .getBody()
                                .getSubject()
                ).filter(Objects::nonNull)
                .map(user -> new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>()));

    }
}
