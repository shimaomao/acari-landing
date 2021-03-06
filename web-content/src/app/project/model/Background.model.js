"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Background = /** @class */ (function () {
    function Background(colorOne, colorTwo, textColor, hostNameColor, pwdColor, titleColor, hoverColor, caretSolidColor, caretBlurredStyle) {
        if (colorOne === void 0) { colorOne = '#8d85d6'; }
        if (colorTwo === void 0) { colorTwo = '#464646'; }
        if (textColor === void 0) { textColor = '#f5f5f5'; }
        if (hostNameColor === void 0) { hostNameColor = 'orange'; }
        if (pwdColor === void 0) { pwdColor = 'cyan'; }
        if (titleColor === void 0) { titleColor = 'ghostwhite'; }
        if (hoverColor === void 0) { hoverColor = 'rgba(141, 133, 214, 0.55)'; }
        if (caretSolidColor === void 0) { caretSolidColor = 'purple'; }
        if (caretBlurredStyle === void 0) { caretBlurredStyle = '0.05em purple solid'; }
        this._colorOne = colorOne;
        this._colorTwo = colorTwo;
        this._textColor = textColor;
        this._hostNameColor = hostNameColor;
        this._pwdColor = pwdColor;
        this._titleColor = titleColor;
        this._hoverColor = hoverColor;
        this._caretSolidColor = caretSolidColor;
        this._caretBlurredStyle = caretBlurredStyle;
    }
    Object.defineProperty(Background.prototype, "caretSolidColor", {
        get: function () {
            return this._caretSolidColor;
        },
        set: function (value) {
            this._caretSolidColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "caretBlurredStyle", {
        get: function () {
            return this._caretBlurredStyle;
        },
        set: function (value) {
            this._caretBlurredStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "hostNameColor", {
        get: function () {
            return this._hostNameColor;
        },
        set: function (value) {
            this._hostNameColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "pwdColor", {
        get: function () {
            return this._pwdColor;
        },
        set: function (value) {
            this._pwdColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "titleColor", {
        get: function () {
            return this._titleColor;
        },
        set: function (value) {
            this._titleColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "backgroundStyle", {
        get: function () {
            return this._backgroundStyle;
        },
        set: function (value) {
            this._backgroundStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "colorOne", {
        get: function () {
            return this._colorOne;
        },
        set: function (value) {
            this._colorOne = value;
            this.rebuildStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "colorTwo", {
        get: function () {
            return this._colorTwo;
        },
        set: function (value) {
            this._colorTwo = value;
            this.rebuildStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "textColor", {
        get: function () {
            return this._textColor;
        },
        set: function (value) {
            this._textColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Background.prototype, "hoverColor", {
        get: function () {
            return this._hoverColor;
        },
        set: function (value) {
            this._hoverColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Background.prototype.rebuildStyle = function () {
        this.backgroundStyle = this.buildStyle();
    };
    Background.prototype.buildStyle = function () {
        var rgba = this._colorOne;
        var rgba2 = this._colorTwo;
        return "linear-gradient(to right, " + rgba + ", " + rgba2 + ")";
    };
    return Background;
}());
exports.Background = Background;
//# sourceMappingURL=Background.model.js.map