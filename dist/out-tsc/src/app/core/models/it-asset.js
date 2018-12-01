export var ItAssetStatus;
(function (ItAssetStatus) {
    ItAssetStatus["DRA"] = "PROJET";
    ItAssetStatus["PRO"] = "PRODUCTION";
    ItAssetStatus["ARC"] = "ARCHIVE";
})(ItAssetStatus || (ItAssetStatus = {}));
var ItAsset = /** @class */ (function () {
    function ItAsset() {
        this.className = this.constructor.name;
        this.status = ItAssetStatus.DRA;
    }
    ItAsset.prototype.setFromJson = function (jsonData) {
        this.className = this.constructor.name;
        for (var prop in jsonData) {
            //console.log(prop+' => '+ jsonData[prop]);
            this[prop] = jsonData[prop];
        }
        //console.log(this);
        return this;
    };
    ItAsset.prototype.getJsonData = function () {
        return JSON.parse(JSON.stringify(this));
    };
    ItAsset.prototype.getId = function () {
        return this.id;
    };
    ItAsset.prototype.getClassName = function () {
        return this.constructor.name;
    };
    ItAsset.prototype.getID = function () {
        return this.id;
    };
    ItAsset.prototype.getMaps = function () {
        return this.maps;
    };
    ItAsset.prototype.addMap = function (map, isMainMap) {
        if (isMainMap === void 0) { isMainMap = false; }
        if (this.maps == undefined)
            this.maps = [];
        this.maps.concat(map);
        if (isMainMap)
            this.mainMap = map;
    };
    ItAsset.prototype.getMainMap = function () {
        return this.mainMap;
    };
    /** for instance application module */
    ItAsset.prototype.addChildren = function (asset) {
        if (this.children == undefined)
            this.children = [];
        this.children.concat(asset);
    };
    ItAsset.prototype.getName = function () {
        return this.name;
    };
    ItAsset.prototype.setName = function (name) {
        this.name = name;
    };
    ItAsset.prototype.IsEqual = function (asset) {
        return asset.id == this.id;
    };
    return ItAsset;
}());
export { ItAsset };
//# sourceMappingURL=it-asset.js.map