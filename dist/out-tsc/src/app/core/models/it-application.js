var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ItAsset, ItAssetStatus } from './it-asset';
export var ItApplicationType;
(function (ItApplicationType) {
    ItApplicationType["PRO"] = "PROGICIEL";
    ItApplicationType["SPE"] = "SPECIFIQUE";
    ItApplicationType["X"] = "...";
})(ItApplicationType || (ItApplicationType = {}));
var ItApplication = /** @class */ (function (_super) {
    __extends(ItApplication, _super);
    function ItApplication() {
        var _this = _super.call(this) || this;
        _this.status = ItAssetStatus.DRA;
        return _this;
        //console.log('ItApplications.constructor ', this);
    }
    ItApplication.prototype.addMessage = function (message, isInMessage) {
        if (isInMessage === void 0) { isInMessage = false; }
        if (isInMessage) {
            this.inMessages.concat(message);
        }
        else {
            this.outMessages.concat(message);
        }
    };
    ItApplication.prototype.clone = function (asset) {
        var dataObject = Object.assign({}, asset);
        for (var prop in dataObject) {
            this[prop] = dataObject[prop];
        }
    };
    return ItApplication;
}(ItAsset));
export { ItApplication };
var ItApplicationList = /** @class */ (function () {
    function ItApplicationList() {
    }
    return ItApplicationList;
}());
export { ItApplicationList };
//# sourceMappingURL=it-application.js.map