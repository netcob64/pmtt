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
import { ItAssetStatus } from '../core/models/it-asset';
import { ItApplication, ItApplicationType } from '../core/models/it-application';
import { DataService } from '../core/services/data.service';
import { DataServiceDataType } from '../core/services/data.service.data.type';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { inspect } from 'util';
var ApplicationFormComponent = /** @class */ (function () {
    function ApplicationFormComponent(dataService) {
        this.dataService = dataService;
        this.ItApplicationTypeEnum = ItApplicationType;
        this.ItAssetStatusEnum = ItAssetStatus;
        this.error = false;
        this.errorMessage = null;
        this.dataService.SetDataType(DataServiceDataType.APPLICATION);
        this.prev = new ItApplication();
    }
    ApplicationFormComponent.prototype.ngOnInit = function () {
        this.prev.clone(this.application);
    };
    ApplicationFormComponent.prototype.CheckToBeSaved = function () {
        if (this.NotEqual(this.application, this.prev) || this.application.id == null) {
            return true;
        }
        else {
            return false;
        }
    };
    ApplicationFormComponent.prototype.Save = function () {
        var _this = this;
        if (this.CheckToBeSaved()) {
            this.dataService.Save(this.application).subscribe(function (data) { return _this.SaveDataHandler(data); });
        }
    };
    ApplicationFormComponent.prototype.SaveDataHandler = function (data) {
        if (data == undefined) {
            this.error = true;
            this.errorMessage = 'database error';
            this.guiCtrl.ShowMessage(this.errorMessage);
        }
        else if (data.status != 'success') {
            this.error = true;
            this.errorMessage = data.message;
            this.guiCtrl.ShowMessage(this.errorMessage);
        }
        else {
            var newObj = this.application.id != data.id;
            console.log('ApplicationFormComponent::SaveApplicationDataHandler: ' + (newObj ? 'CREATED' : 'UPDATED') + ' id=' + data.id);
            this.error = false;
            this.application.id = data.id;
            //this.guiCtrl.ApplicationSaved(this.application, newObj); 
            this.guiCtrl.ItAssetSaved(this.application, this.prev);
            this.prev.clone(this.application);
        }
    };
    ApplicationFormComponent.prototype.NotEqual = function (o1, o2) {
        var equal;
        equal = inspect(o1).localeCompare(inspect(o2)) == 0;
        return !equal;
    };
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], ApplicationFormComponent.prototype, "guiCtrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ItApplication)
    ], ApplicationFormComponent.prototype, "application", void 0);
    ApplicationFormComponent = __decorate([
        Component({
            selector: 'app-application-form',
            templateUrl: './application-form.component.html',
            styleUrls: ['./application-form.component.css']
        }),
        __metadata("design:paramtypes", [DataService])
    ], ApplicationFormComponent);
    return ApplicationFormComponent;
}());
export { ApplicationFormComponent };
//# sourceMappingURL=application-form.component.js.map