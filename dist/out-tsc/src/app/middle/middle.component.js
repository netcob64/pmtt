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
var MiddleComponent = /** @class */ (function () {
    function MiddleComponent() {
        this.panelOpenState = true;
    }
    MiddleComponent.prototype.AddNewApplication = function (event) {
        event.stopPropagation(); // if not the accordilion close
        this.guiCtrl.AddNewApplication();
    };
    MiddleComponent.prototype.AddNewMetamodel = function (event) {
        event.stopPropagation(); // if not the accordilion close
        this.guiCtrl.AddNewMetamodel();
    };
    MiddleComponent.prototype.OnClose = function () { };
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], MiddleComponent.prototype, "guiCtrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiddleComponent.prototype, "panelOpenState", void 0);
    MiddleComponent = __decorate([
        Component({
            selector: 'app-middle',
            templateUrl: './middle.component.html',
            styleUrls: ['./middle.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], MiddleComponent);
    return MiddleComponent;
}());
export { MiddleComponent };
//# sourceMappingURL=middle.component.js.map