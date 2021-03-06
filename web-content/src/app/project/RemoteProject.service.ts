import {Injectable} from "@angular/core";
import {RemoteProject} from "./model/RemoteProject.model";
import {Observable} from "rxjs/Observable";
import {BackendAPIService} from "../util/BackendAPI.service";
import {RemoteProjectFactory} from "./RemoteProject.factory";

@Injectable()
export class RemoteProjectService {

    constructor(private backendAPIService: BackendAPIService,
                private remoteProjectFactory: RemoteProjectFactory) {
    }

    fetchProjects(): Observable<RemoteProject[]> {
        return this.backendAPIService.fetchAllProjects()
            .map(json=><any[]>json)
            .map(json => json.map(projectJson=>this.remoteProjectFactory.createProject(projectJson)));
    }

    removeProject(projectToRemove: RemoteProject): Observable<boolean> {
        return this.backendAPIService.removeProject(projectToRemove.projectId);
    }
}