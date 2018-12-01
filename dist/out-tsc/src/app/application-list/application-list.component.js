var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { ItApplication } from '../core/models/it-application';
var ApplicationListComponent = /** @class */ (function () {
    //@ViewChild(MatMenuTrigger) menu: MatMenuTrigger;
    function ApplicationListComponent() {
    }
    ApplicationListComponent.prototype.ngOnInit = function () {
        console.log('ApplicationListComponent.ngOnInit() - load apps...');
        this.guiCtrl.LoadItAssets(ItApplication);
    };
    ApplicationListComponent.prototype.Delete = function (app, event) {
        //event.stopPropagation();
        //this.guiCtrl.DeleteApplication(app);		
        this.guiCtrl.DeleteItAsset(app);
    };
    ApplicationListComponent.prototype.Edit = function (app, event) {
        event.stopPropagation();
        //this.guiCtrl.EditApplication(app);
        this.guiCtrl.EditItAsset(app);
    };
    ApplicationListComponent.prototype.AddApplicationMap = function (app, event) {
        //event.stopPropagation();
        this.guiCtrl.AddNewApplicationMap(app);
    };
    ApplicationListComponent.prototype.AddSubApplication = function (app, event) {
        //event.stopPropagation();
    };
    ApplicationListComponent.prototype.stopEventPropagation = function (event) {
        event.stopPropagation();
        //this.menu.openMenu();
    };
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], ApplicationListComponent.prototype, "guiCtrl", void 0);
    ApplicationListComponent = __decorate([
        Component({
            selector: 'app-application-list',
            templateUrl: './application-list.component.html',
            styleUrls: ['./application-list.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ApplicationListComponent);
    return ApplicationListComponent;
}());
export { ApplicationListComponent };
//# sourceMappingURL=application-list.component.js.map