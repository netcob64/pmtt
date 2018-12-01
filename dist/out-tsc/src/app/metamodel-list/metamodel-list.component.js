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
import { ItMetamodel } from '../core/models/it-metamodel';
var MetamodelListComponent = /** @class */ (function () {
    function MetamodelListComponent() {
    }
    MetamodelListComponent.prototype.ngOnInit = function () {
        console.log('MetamodelListComponent.ngOnInit() - load metamodels...');
        this.guiCtrl.LoadItAssets(ItMetamodel);
    };
    /*
        Assets(): Array<ItAsset> {
            return Array.from(this.guiCtrl.GetItAssets(IT_METAMODEL_CLASS_NAME));
        }*/
    MetamodelListComponent.prototype.Delete = function (model, event) {
        //event.stopPropagation();
        this.guiCtrl.DeleteItAsset(model);
    };
    MetamodelListComponent.prototype.Edit = function (model, event) {
        //event.stopPropagation();
        this.guiCtrl.EditItAsset(model);
    };
    MetamodelListComponent.prototype.stopEventPropagation = function (event) {
        event.stopPropagation();
        //this.menu.openMenu();
    };
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], MetamodelListComponent.prototype, "guiCtrl", void 0);
    MetamodelListComponent = __decorate([
        Component({
            selector: 'app-metamodel-list',
            templateUrl: './metamodel-list.component.html',
            styleUrls: ['./metamodel-list.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], MetamodelListComponent);
    return MetamodelListComponent;
}());
export { MetamodelListComponent };
//# sourceMappingURL=metamodel-list.component.js.map