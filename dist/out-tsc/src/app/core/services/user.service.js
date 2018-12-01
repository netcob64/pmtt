var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import 'rxjs/Rx'; // To have 'of' 
import { User } from "../models/user";
export var MOCK_USER = new User();
MOCK_USER._id = "1";
MOCK_USER.email = "foo@test.com";
MOCK_USER.firstName = "Foo";
MOCK_USER.lastName = "Bar";
MOCK_USER.password = "password";
/**
 * The user service.
 */
var UserService = /** @class */ (function () {
    function UserService() {
        /**
         * True if authenticated
         * @type
         */
        this._authenticated = false;
    }
    /**
     * Authenticate the user
     *
     * @param {string} email The user's email address
     * @param {string} password The user's password
     * @returns {Observable<User>} The authenticated user observable.
     */
    UserService.prototype.authenticate = function (email, password) {
        // Normally you would do an HTTP request to determine to
        // attempt authenticating the user using the supplied credentials.
        if (email === MOCK_USER.email && password === MOCK_USER.password) {
            this._authenticated = true;
            return Observable.of(MOCK_USER);
        }
        return Observable.throw(new Error("Invalid email or password"));
    };
    /**
     * Determines if the user is authenticated
     * @returns {Observable<boolean>}
     */
    UserService.prototype.authenticated = function () {
        return Observable.of(this._authenticated);
    };
    /**
     * Returns the authenticated user
     * @returns {User}
     */
    UserService.prototype.authenticatedUser = function () {
        // Normally you would do an HTTP request to determine if
        // the user has an existing auth session on the server
        // TODO
        return Observable.of(MOCK_USER);
    };
    /**
     * Create a new user
     * @returns {User}
     */
    UserService.prototype.create = function (user) {
        // Normally you would do an HTTP request to POST the user
        // details and then return the new user object
        // but, let's just return the new user for this example.
        // TODO
        this._authenticated = true;
        return Observable.of(user);
    };
    /**
     * End session
     * @returns {Observable<boolean>}
     */
    UserService.prototype.signout = function () {
        // Normally you would do an HTTP request sign end the session
        // but, let's just return an observable of true.
        // TODO
        this._authenticated = false;
        return Observable.of(true);
    };
    UserService = __decorate([
        Injectable()
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map