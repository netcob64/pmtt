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
export var ItMessageMedia;
(function (ItMessageMedia) {
    ItMessageMedia["FILE"] = "FILE";
    ItMessageMedia["MESSAGE"] = "MESSAGE";
    ItMessageMedia["WS"] = "WEB SERVICE";
})(ItMessageMedia || (ItMessageMedia = {}));
export var ItMessageFrequency;
(function (ItMessageFrequency) {
    ItMessageFrequency["DAILY"] = "DAILY";
    ItMessageFrequency["WEEKLY"] = "WEEKLY";
    ItMessageFrequency["MONTHLY"] = "MONTHLY";
    ItMessageFrequency["MESSAGE"] = "MESSAGE";
})(ItMessageFrequency || (ItMessageFrequency = {}));
export var ItMessageProtocol;
(function (ItMessageProtocol) {
    ItMessageProtocol["FTP"] = "FTP";
    ItMessageProtocol["HTTP"] = "HTTP";
    ItMessageProtocol["TDX"] = "TRADE EXPRESS";
})(ItMessageProtocol || (ItMessageProtocol = {}));
var ItMessage = /** @class */ (function (_super) {
    __extends(ItMessage, _super);
    function ItMessage() {
        return _super.call(this) || this;
    }
    ItMessage.prototype.SetData = function (data) {
        this.name = data;
        this.data = data;
    };
    ItMessage.prototype.SetSource = function (asset) {
        this.source = asset;
    };
    ItMessage.prototype.SetTarget = function (asset) {
        this.target = asset;
    };
    ItMessage.prototype.IsEqual = function (message) {
        if (this.id != undefined && message.id != undefined) {
            return (this.id == message.id);
        }
        return (message.source.IsEqual(this.source) && message.target.IsEqual(this.target) && message.getName() == this.getName());
    };
    return ItMessage;
}(ItAsset));
export { ItMessage };
var ItMessageList = /** @class */ (function () {
    function ItMessageList() {
    }
    return ItMessageList;
}());
export { ItMessageList };
//# sourceMappingURL=it-message.js.map