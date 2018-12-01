var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { GuiCtrlComponent } from '../gui-ctrl-component';
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent( /*private rd: Renderer2*/) {
    }
    LoginFormComponent.prototype.Login = function () {
        //this.login=this.loginElt.nativeElement.value;
        //this.password=this.loginElt.nativeElement.value;
        if (!this.guiCtrl.Login(this.login, this.password)) {
            this.loginElt.nativeElement.focus();
        }
    };
    LoginFormComponent.prototype.Validate = function (event) {
        if (event.which == 13)
            this.Login();
    };
    LoginFormComponent.prototype.PasswordFocus = function (event) {
        if (event.which == 13) {
            this.passwordElt.nativeElement.focus();
        }
    };
    LoginFormComponent.prototype.ngOnInit = function () {
        this.loginElt.nativeElement.focus();
    };
    LoginFormComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], LoginFormComponent.prototype, "guiCtrl", void 0);
    __decorate([
        ViewChild('loginInput'),
        __metadata("design:type", ElementRef)
    ], LoginFormComponent.prototype, "loginElt", void 0);
    __decorate([
        ViewChild('passwordInput'),
        __metadata("design:type", ElementRef)
    ], LoginFormComponent.prototype, "passwordElt", void 0);
    LoginFormComponent = __decorate([
        Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map