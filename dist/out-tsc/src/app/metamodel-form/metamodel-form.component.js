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
import { ItMetamodel } from '../core/models/it-metamodel';
import { ItMetamodelAttribute, ItMetamodelAttributeType } from '../core/models/it-metamodel-attribute';
import { ItMetamodelRelation } from '../core/models/it-metamodel-relation';
import { DataService } from '../core/services/data.service';
import { DataServiceDataType } from '../core/services/data.service.data.type';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { inspect } from 'util';
var MetamodelFormComponent = /** @class */ (function () {
    function MetamodelFormComponent(dataService) {
        this.dataService = dataService;
        this.error = false;
        this.errorMessage = null;
        this.ItMetamodelAttributeTypeEnum = ItMetamodelAttributeType;
        this.ItAssetStatusEnum = ItAssetStatus;
        dataService.SetDataType(DataServiceDataType.META_MODEL);
        this.prev = new ItMetamodel();
    }
    MetamodelFormComponent.prototype.ngOnInit = function () {
        this.prev.clone(this.model);
        this.guiCtrl.ShowMessage('attributes: ' + inspect(this.model.attributes));
    };
    MetamodelFormComponent.prototype.CheckToBeSaved = function () {
        if (this.NotEqual(this.model, this.prev) || this.model.id == null) {
            return true;
        }
        else {
            return false;
        }
    };
    MetamodelFormComponent.prototype.AddAttribute = function (event) {
        var attr = new ItMetamodelAttribute(ItMetamodelAttributeType.TXT, "", "");
        this.model.attributes.push(attr);
    };
    MetamodelFormComponent.prototype.DeleteAttribute = function (attr) {
        this.model.attributes = this.model.attributes.filter(function (a) { return a !== attr; });
    };
    MetamodelFormComponent.prototype.AddRelation = function (event) {
        var rel = new ItMetamodelRelation();
        this.model.relations.push(rel);
    };
    MetamodelFormComponent.prototype.DeleteRelation = function (rel) {
        this.model.relations = this.model.relations.filter(function (r) { return r !== rel; });
    };
    MetamodelFormComponent.prototype.Save = function () {
        var _this = this;
        if (this.CheckToBeSaved()) {
            this.dataService.Save(this.model).subscribe(function (data) { return _this.SaveDataHandler(data); });
        }
        /*
        this.model.attributes.forEach(function(element) {
          this.guiCtrl.AddMessage('\t'+inspect(element));
        }, this);
        this.guiCtrl.AddMessage('attributes: ');*/
    };
    MetamodelFormComponent.prototype.SaveDataHandler = function (data) {
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
            var newObj = this.model.id != data.id;
            this.guiCtrl.ShowMessage('MetamodelFormComponent::SaveMetamodelDataHandler: ' + (newObj ? 'CREATED' : 'UPDATED') + ' id=' + data.id);
            this.error = false;
            this.model.id = data.id;
            this.model.version = data.version;
            //console.log("SaveMetamodelDataHandler prev.name='"+this.prev.name+"' model.name='"+this.model.name+"'");
            this.guiCtrl.ItAssetSaved(this.model, this.prev);
            this.prev.clone(this.model);
        }
    };
    MetamodelFormComponent.prototype.NotEqual = function (o1, o2) {
        var equal;
        equal = inspect(o1).localeCompare(inspect(o2)) == 0;
        return !equal;
    };
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], MetamodelFormComponent.prototype, "guiCtrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ItMetamodel)
    ], MetamodelFormComponent.prototype, "model", void 0);
    MetamodelFormComponent = __decorate([
        Component({
            selector: 'app-metamodel-form',
            templateUrl: './metamodel-form.component.html',
            styleUrls: ['./metamodel-form.component.css']
        }),
        __metadata("design:paramtypes", [DataService])
    ], MetamodelFormComponent);
    return MetamodelFormComponent;
}());
export { MetamodelFormComponent };
//# sourceMappingURL=metamodel-form.component.js.map