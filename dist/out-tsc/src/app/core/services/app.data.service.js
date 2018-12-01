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
var AppDataService = /** @class */ (function () {
    function AppDataService(http) {
        this.http = http;
        //private dataUrl = 'http://localhost:8000/api/data';  // URL to web api
        this.dataServiceRoot = 'http://192.168.0.16:8080/api';
        this.appsUrl = this.dataServiceRoot + '/applications'; // URL to web api
        this.saveAppUrl = this.dataServiceRoot + '/applications'; // URL to web api
        this.deleteAppUrl = this.dataServiceRoot + '/application'; // URL to web api
    }
    //TODO: find a way to use authHttp
    AppDataService.prototype.GetApplications = function () {
        return this.http.get(this.appsUrl)
            .pipe(tap(function (data) {
            // this.log(`fetched applications`);
            // console.log('data => '+JSON.stringify(data));
        }), catchError(this.handleError('GetApplications', [])));
    };
    /** POST: add or update a new data to the server
    }*/
    AppDataService.prototype.SaveApplication = function (application) {
        var _this = this;
        return this.http.post(this.saveAppUrl, application, httpOptions)
            .pipe(tap(function (application) { return _this.log("added application w/ id=" + application.id); }), catchError(this.handleError('SaveApplication')));
    };
    AppDataService.prototype.DeleteApplication = function (app) {
        var _this = this;
        var id = typeof app === 'number' ? app : app.id;
        var url = this.deleteAppUrl + "/id=" + id;
        return this.http.delete(url, httpOptions)
            .pipe(tap(function (_) { return _this.log("deleted application id=" + id); }), catchError(this.handleError('DeleteApplication')));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    AppDataService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    AppDataService.prototype.log = function (msg) {
        console.log("ERROR: " + msg);
        this.guiCtrl.ShowMessage(msg);
    };
    AppDataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AppDataService);
    return AppDataService;
}());
export { AppDataService };
//# sourceMappingURL=app.data.service.js.map