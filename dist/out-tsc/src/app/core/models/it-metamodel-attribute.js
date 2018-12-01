export var ItMetamodelAttributeType;
(function (ItMetamodelAttributeType) {
    ItMetamodelAttributeType["TXT"] = "TXT";
    ItMetamodelAttributeType["NUM"] = "NUM";
    ItMetamodelAttributeType["LIST"] = "LIST";
    ItMetamodelAttributeType["BOOL"] = "BOOL";
    ItMetamodelAttributeType["DATE"] = "DATE";
    ItMetamodelAttributeType["TIME"] = "TIME";
})(ItMetamodelAttributeType || (ItMetamodelAttributeType = {}));
var ItMetamodelAttribute = /** @class */ (function () {
    function ItMetamodelAttribute(type, name, label, isSystem, valSystem, values) {
        if (isSystem === void 0) { isSystem = false; }
        if (valSystem === void 0) { valSystem = false; }
        if (values === void 0) { values = ""; }
        this.type = type;
        this.name = name;
        this.label = label;
        this.values = values;
        this.isSystem = isSystem;
        this.valSystem = valSystem;
    }
    ;
    return ItMetamodelAttribute;
}());
export { ItMetamodelAttribute };
//# sourceMappingURL=it-metamodel-attribute.js.map