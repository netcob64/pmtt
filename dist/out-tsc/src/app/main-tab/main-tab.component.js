var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { TabContentType } from '../core/models/tab-content-type';
import { MatTabGroup } from '@angular/material/tabs';
var MainTabComponent = /** @class */ (function () {
    function MainTabComponent() {
        // important to be able to use in html 'as let option of (TabContentType|enumToArray)''
        this.TabContentType = TabContentType;
    }
    MainTabComponent.prototype.tabChanged = function (tabChangeEvent) {
        /*let str :string ='MainTabComponent.tabChanged : tabChangeEvent => index => '+ tabChangeEvent.index+' / tabGroup.selectedIndex='+ this.tabGroup.selectedIndex;
        console.log(str);*/
    };
    __decorate([
        ViewChild('tabGroup'),
        __metadata("design:type", MatTabGroup)
    ], MainTabComponent.prototype, "tabGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], MainTabComponent.prototype, "guiCtrl", void 0);
    MainTabComponent = __decorate([
        Component({
            selector: 'app-main-tab',
            templateUrl: './main-tab.component.html',
            styleUrls: ['./main-tab.component.css'],
            encapsulation: ViewEncapsulation.None,
        })
    ], MainTabComponent);
    return MainTabComponent;
}());
export { MainTabComponent };
//# sourceMappingURL=main-tab.component.js.map