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
var Project_model_1 = require("./model/Project.model");
var ProjectService = /** @class */ (function () {
    function ProjectService(backendAPIService) {
        this.backendAPIService = backendAPIService;
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
    ProjectService.prototype.createProject = function () {
        return new Project_model_1.Project();
    };
    ProjectService.prototype.changePlaces = function (newIndex, previousIndex) {
        var i = newIndex - 1;
        var previousMinusOne = previousIndex - 1;
        console.log(newIndex + " " + previousIndex);
        while (i < previousMinusOne) {
            this.projectList[i].projectRank++;
        }
        //sure would be nice if javascript had the comparable interface...
        this.projectList.sort(function (a, b) { return a.projectRank - b.projectRank; });
    };
    ProjectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=Project.service.js.map