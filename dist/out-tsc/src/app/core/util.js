var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var typeCache = {};
export function type(label) {
    if (typeCache[label]) {
        throw new Error("Action type \"" + label + "\" is not unique\"");
    }
    typeCache[label] = true;
    return label;
}
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var EscapeHtmlPipe = /** @class */ (function () {
    function EscapeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    EscapeHtmlPipe.prototype.transform = function (content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    };
    EscapeHtmlPipe = __decorate([
        Pipe({ name: 'keepHtml', pure: false }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], EscapeHtmlPipe);
    return EscapeHtmlPipe;
}());
export { EscapeHtmlPipe };
var EnumToArrayPipe = /** @class */ (function () {
    function EnumToArrayPipe() {
    }
    EnumToArrayPipe.prototype.transform = function (data) {
        return Object.keys(data);
    };
    EnumToArrayPipe = __decorate([
        Pipe({ name: 'enumToArray', pure: true })
    ], EnumToArrayPipe);
    return EnumToArrayPipe;
}());
export { EnumToArrayPipe };
/*
export function EnumToArray(enumName) : Array<string[]> {
  console.log('EnumToArray => ');

  let arr : Array<string[]> = [];
  for (var k in enumName) {
    if(isNaN(Number(k]) === false){
    let a = [k, enumName[k]];
    arr=arr.concat(a);}
  }
  console.log(arr);
  return arr;
 
    return Object.keys(enumName)
        .filter(value => isNaN(Number(value)) === false)
        .map(key => [key, enumName[key]]);
 
  } */ 
//# sourceMappingURL=util.js.map