"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BackendAPI_service_1 = require("../util/BackendAPI.service");
var Observable_1 = require("rxjs/Observable");
var LocalProject_model_1 = require("./model/LocalProject.model");
var LocalProject_factory_1 = require("./LocalProject.factory");
var RemoteProject_model_1 = require("./model/RemoteProject.model");
var ProjectUpload_service_1 = require("./upload/ProjectUpload.service");
var ProjectService = /** @class */ (function () {
    function ProjectService(backendAPIService, localProjectFactory, projectUploadService) {
        this.backendAPIService = backendAPIService;
        this.localProjectFactory = localProjectFactory;
        this.projectUploadService = projectUploadService;
        this._projectList = [];
    }
    Object.defineProperty(ProjectService.prototype, "projectList", {
        get: function () {
            return this._projectList;
        },
        set: function (value) {
            this._projectList = value;
        },
        enumerable: true,
        configurable: true
    });
    ProjectService.prototype.projectCount = function () {
        return Observable_1.Observable.of(this.projectList.length);
    };
    ProjectService.prototype.addProject = function () {
        this.projectList.forEach(function (project) { return project.projectRank++; });
        this.projectList.unshift(this.createProject());
    };
    ProjectService.prototype.removeProject = function (projectToRemove) {
        if (projectToRemove instanceof RemoteProject_model_1.RemoteProject) {
        }
        else if (projectToRemove instanceof LocalProject_model_1.LocalProject) {
            this.removeLocal(projectToRemove);
        }
    };
    ProjectService.prototype.removeLocal = function (projectToRemove) {
        var start = projectToRemove.projectRank - 1;
        this.projectList.splice(start, 1);
        //promotions!!
        for (var i = start; i < this.projectList.length; i++)
            this.projectList[i].projectRank--;
    };
    ProjectService.prototype.promoteProject = function (projectToPromote) {
        var projectToPromoteIndex = projectToPromote.projectRank - 1; //project passed in
        if (projectToPromoteIndex > 0) {
            var projectToDemoteIndex = projectToPromoteIndex - 1;
            this.promoteDemote(projectToPromoteIndex, projectToDemoteIndex);
        }
    };
    ProjectService.prototype.demoteProject = function (projectToDemote) {
        var projectToPromoteIndex = projectToDemote.projectRank;
        if (projectToPromoteIndex < this.projectList.length) {
            var projectToDemoteIndex = projectToPromoteIndex - 1; //project passed in
            this.projectList[projectToPromoteIndex].projectRank--;
            this.projectList[projectToDemoteIndex].projectRank++;
            this.CHANGE_PLACES(projectToDemoteIndex, projectToPromoteIndex);
        }
    };
    ProjectService.prototype.saveAllProjects = function () {
        var _this = this;
        //todo: future me start here! -Love Past You <3
        this.projectList
            .filter(function (project) { return project.dirtyGurl; })
            .forEach(function (project) {
            if (project.isLocal()) {
                _this.projectUploadService.pushFileToStorage(project);
            }
            else if (project.isRemote()) {
            }
        });
        return Observable_1.Observable.of(true);
    };
    ProjectService.prototype.promoteDemote = function (projectToPromoteIndex, projectToDemoteIndex) {
        this.projectList[projectToPromoteIndex].projectRank--;
        this.projectList[projectToDemoteIndex].projectRank++;
        this.CHANGE_PLACES(projectToDemoteIndex, projectToPromoteIndex);
    };
    ProjectService.prototype.createProject = function () {
        return this.localProjectFactory.createProject();
    };
    ProjectService.prototype.CHANGE_PLACES = function (indexOne, indexTwo) {
        var placeHolder = this.projectList[indexOne];
        this.projectList[indexOne] = this.projectList[indexTwo];
        this.projectList[indexTwo] = placeHolder;
    };
    ProjectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService,
            LocalProject_factory_1.LocalProjectFactory,
            ProjectUpload_service_1.ProjectUploadService])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=Project.service.js.map