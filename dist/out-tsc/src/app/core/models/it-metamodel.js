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
import { ItMetamodelAttribute, ItMetamodelAttributeType } from './it-metamodel-attribute';
import { ItAsset } from './it-asset';
export var ItMetamodelStatus;
(function (ItMetamodelStatus) {
    ItMetamodelStatus["DRAFT"] = "DRAFT";
    ItMetamodelStatus["ACTIV"] = "ACTIVATED";
})(ItMetamodelStatus || (ItMetamodelStatus = {}));
var ItMetamodel = /** @class */ (function (_super) {
    __extends(ItMetamodel, _super);
    function ItMetamodel() {
        var _this = _super.call(this) || this;
        _this.classStatus = ItMetamodelStatus.DRAFT;
        _this.version = 0;
        _this.attributes = [];
        _this.relations = [];
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.NUM, "id", "ID", true));
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.NUM, "version", "Version", true));
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.TXT, "name", "Name", true));
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.LIST, "type", "Type", true));
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.LIST, "status", "Status", true));
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.DATE, "validityStart", "Validity start date", true));
        _this.attributes.push(new ItMetamodelAttribute(ItMetamodelAttributeType.DATE, "validityEnd", "Validity end date", true));
        return _this;
    }
    ItMetamodel.prototype.clone = function (asset) {
        var dataObject = Object.assign({}, asset);
        for (var prop in dataObject) {
            this[prop] = dataObject[prop];
        }
    };
    return ItMetamodel;
}(ItAsset));
export { ItMetamodel };
//# sourceMappingURL=it-metamodel.js.map