var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.me = this;
        this.logged = true;
        this.title = 'MapIT';
        //console.log('localStorage.getItem(auth_token)='+localStorage.getItem('auth_token'));
        //console.log('sessionStorage.getItem(auth_token)='+sessionStorage.getItem('auth_token'));
        if (sessionStorage.getItem('auth_token') != null)
            this.logged = true;
        //localStorage.setItem('auth_token', 'key2');
    }
    AppComponent.prototype.TraceSession = function () {
        var str;
        str = 'SESSION auth_token: ' + sessionStorage.getItem('auth_token');
        //str += '\nLOCAL auth_token: '+localStorage.getItem('auth_token');
        return str;
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map