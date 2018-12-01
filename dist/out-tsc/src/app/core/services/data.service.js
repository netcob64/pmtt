var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        //private dataUrl = 'http://localhost:8000/api/data';  // URL to web api
        this.dataServiceRoot = 'http://localhost:8080/api';
    }
    //TODO: find a way to use authHttp
    DataService.prototype.SetDataType = function (type) {
        this.dataType = type;
        //switch(this.dataType) {
        //case DataServiceDataType.META_MODEL:
        this.getUrl = this.dataServiceRoot;
        this.saveUrl = this.getUrl;
        this.deleteUrl = this.getUrl;
        this.objectClass = type.toString();
        // break;
        //case DataServiceDataType.APPLICATION:
        // this.getUrl = this.dataServiceRoot;
        // this.deleteUrl = this.getUrl;
        // this.objectClass = type.toString();
        //  break;
        //default:
        // this.getUrl = 'UNDEF'; 
        // this.saveUrl = this.getUrl ;
        // this.deleteUrl = this.getUrl;
        //}
    };
    DataService.prototype.Get = function () {
        var url = this.getUrl + "/class=" + this.objectClass;
        return this.http.get(url)
            .pipe(tap(function (data) {
            // this.log(`fetched object`);
            // guiCtrl.AddMessage('data => '+JSON.stringify(data));
        }), catchError(this.handleError('Get', [])));
    };
    /** POST: add or update a new data to the server
    }*/
    DataService.prototype.Save = function (obj) {
        var _this = this;
        var url = this.saveUrl + "/class=" + this.objectClass;
        return this.http.post(url, obj, httpOptions)
            .pipe(tap(function (application) { return _this.log("added object class=" + _this.objectClass + " id=" + obj.id); }), catchError(this.handleError('Save')));
    };
    DataService.prototype.Delete = function (obj) {
        var _this = this;
        var id = typeof obj === 'number' ? obj : obj.id;
        var url = this.deleteUrl + "/class=" + this.objectClass + "&id=" + id;
        return this.http.delete(url, httpOptions)
            .pipe(tap(function (_) { return _this.log("deleted object id=" + id); }), catchError(this.handleError('Delete')));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    DataService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: better job of transforming error for user consumption
            _this.guiCtrl.ShowError("DataService " + operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    DataService.prototype.log = function (msg) {
        console.log(msg);
        this.guiCtrl.ShowMessage(msg);
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map