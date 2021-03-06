import {Component, Input} from '@angular/core';
import {Project} from "../model/Project.model";
import {RedirectService} from "../../util/RedirectService";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'project-view',
    template: require('./ProjectView.component.htm')
})
export class ProjectViewComponent {

    constructor(private redirectService: RedirectService) {
    }

    private _project: Project;

    @Input()
    get project(): Project {
        return this._project;
    }

    set project(value: Project) {
        this._project = value;
    }

    get description(): string {
        return this._project.preachySpeechy;
    }


    get excerpt(): string {
        return this.project.excerpt;
    }

    get reachBinary(): Observable<any> {
        return this.project.reachBlob;
    }


    get backgroundStyle(): string {
        return this.project.backgroundColor;
    }

    get textColor(): string {
        return this.project.descriptionTextColor;
    }

    redirect(): void {
        this.redirectService.redirectToUrl(this.project.url);
    }

    mouseEnter(): void {
        this.changeBackgroundStyle(this.project.hoverColor);
    }

    private container_hover_color: string = '';

    mouseLeave(): void {
        this.changeBackgroundStyle('');
    }

    private changeBackgroundStyle(style: string): void {
        this.container_hover_color = style;
    }

    get fileName(): string {
        return this.project.fileName;
    }

    get titleColor(): string {
        return this.project.titleColor;
    }

    get hostNameColor(): string {
        return this.project.hostNameColor;
    }

    get pwdColor(): string {
        return this.project.pwdColor;
    }

    get caretBlurredStyle(): string {
        return this.project.caretBlurredStyle;
    }

    get caretSolidColor(): string {
        return this.project.caretSolidColor;
    }
}