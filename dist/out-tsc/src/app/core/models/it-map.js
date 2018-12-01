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
import { ItAsset } from './it-asset';
export var ItMapType;
(function (ItMapType) {
    ItMapType["ENV"] = "ENV. DIAGRAM";
    ItMapType["MOD"] = "MODULE DIAGRAM";
    ItMapType["X"] = "TBD";
})(ItMapType || (ItMapType = {}));
var ItMap = /** @class */ (function (_super) {
    __extends(ItMap, _super);
    function ItMap(asset) {
        var _this = _super.call(this) || this;
        if (asset != null) {
            _this.asset = asset;
            _this.assetID = asset.getID();
            _this.assetClass = asset.getClassName();
            _this.asset.addMap(_this, true);
        }
        console.log('ItMap.constructor ', _this);
        return _this;
    }
    ItMap.prototype.clone = function (asset) {
        var dataObject = Object.assign({}, asset);
        for (var prop in dataObject) {
            this[prop] = dataObject[prop];
        }
    };
    ItMap.prototype.setAsset = function (asset) {
        this.asset = asset;
    };
    ItMap.prototype.getAsset = function () {
        return this.asset;
    };
    ItMap.prototype.getAssetID = function () {
        return this.assetID;
    };
    ItMap.prototype.getAssetClass = function () {
        return this.assetClass;
    };
    ItMap.prototype.setGraphData = function (data) {
        this.graphData = data;
    };
    return ItMap;
}(ItAsset));
export { ItMap };
//# sourceMappingURL=it-map.js.map