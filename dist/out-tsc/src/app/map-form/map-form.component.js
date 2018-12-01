var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ItMap, ItMapType } from '../core/models/it-map';
import { ItMessage } from '../core/models/it-message';
import { DataService } from '../core/services/data.service';
import { DataServiceDataType } from '../core/services/data.service.data.type';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { MxGraph } from '../core/mxgraph/mx.graph';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MapFormDialogComponent } from './map-form-dialog.component';
import { inspect } from 'util';
//declare var mxClient : any;
var MapFormComponent = /** @class */ (function () {
    function MapFormComponent(dataService, dialog) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.searchAppStr = 'app';
        this.ItMapType = ItMapType;
        this.error = false;
        this.errorMessage = null;
        this.isToBeSaved = false;
        this.appSelectionControl = new FormControl();
        this.dataService.SetDataType(DataServiceDataType.MAP);
        this.prev = new ItMap();
    }
    MapFormComponent.prototype.OpenDialog = function (cell) {
        var _this = this;
        // cell is current selected edge
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        var dialogRef = this.dialog.open(MapFormDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (data) {
            if (data != undefined) {
                // Create new message
                _this.isToBeSaved = true;
                var msg = new ItMessage();
                msg.SetData(data.description);
                msg.SetSource(cell.source.value.GetAsset());
                msg.SetTarget(cell.target.value.GetAsset());
                //--> Test if the message already exists, if yes reuse, if not create
                _this.guiCtrl.RegisterMessage(msg);
                _this.graph.BeginUpdate();
                //console.log('message label =>' + data.description);
                _this.graph.SetValue(cell, _this.graph.AssetToGraphObject(msg));
                _this.graph.EndUpdate();
                //console.log(this.graph);
            }
            else {
                // no name provided for link -> remove created edge
                console.log('NO NAME FORM LINK');
                _this.graph.RemoveSelection();
            }
        });
    };
    MapFormComponent.prototype.GraphInfo = function () {
        console.log(this.graph.ViewXML());
        console.log(ItMapType);
    };
    MapFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.prev.clone(this.map);
        this.filteredOptions = this.appSelectionControl.valueChanges
            .pipe(startWith(''), map(function (value) { return _this._filter(value); }));
        console.log('ngOnInit:', this.map);
    };
    MapFormComponent.prototype._filter = function (value) {
        //const availableApplications = this.guiCtrl.applications
        var availableApplications = this.guiCtrl.GetItAssets(this.guiCtrl.IT_APPLICATION_CLASS_NAME).map(function (app) { return app.name; });
        var filterValue = value.toLowerCase();
        return availableApplications.filter(function (appName) { return appName.toLowerCase().includes(filterValue); });
        //return this.availableApplications.filter(option => option.toLowerCase().includes(filterValue));
    };
    MapFormComponent.prototype.AddApplication = function (evt) {
        console.log(this.appSelectionControl.value);
        //if(this.appSelectionControl.value!=undefined && this.guiCtrl.GetApplicationByName(this.appSelectionControl.value)!=undefined){
        if (this.appSelectionControl.value != undefined && this.guiCtrl.GetAssetByName(this.guiCtrl.IT_APPLICATION_CLASS_NAME, this.appSelectionControl.value) != undefined) {
            this.isToBeSaved = true;
            this.graph.InsertVertex(this.guiCtrl.GetAssetByName(this.guiCtrl.IT_APPLICATION_CLASS_NAME, this.appSelectionControl.value), 10, 10, 50, 50);
            //this.graph.insertVertex(this.guiCtrl.GetApplicationByName(this.appSelectionControl.value), 10, 10, 50, 50);
            this.appSelectionControl.setValue('');
        }
    };
    MapFormComponent.prototype.RemoveSelectionFromMap = function () {
        var cells = this.graph.RemoveSelection();
        console.log(cells);
        console.log(this.graph);
    };
    MapFormComponent.prototype.RemoveSelectionFromDataBase = function () {
        alert('MapFormComponent.RemoveSelectionFromDataBase() TODO');
    };
    MapFormComponent.prototype.ngOnChanges = function (changes) {
        console.log('CHANGE: ' + inspect(changes.map));
        //Also be aware that you can pass options object to inspect (see link above)
        // inspect(myObject[, options: {showHidden, depth, colors, showProxy, ...moreOptions}])
    };
    MapFormComponent.prototype.Save = function () {
        var _this = this;
        this.map.setGraphData(this.graph.ViewXML());
        this.dataService.Save(this.map).subscribe(function (data) { return _this.SaveDataHandler(data); });
    };
    MapFormComponent.prototype.SaveDataHandler = function (data) {
        if (data == undefined) {
            this.error = true;
            this.errorMessage = 'database error';
            this.guiCtrl.ShowMessage(this.errorMessage);
        }
        else if (data.status != 'success') {
            this.error = true;
            this.errorMessage = data.message;
            this.guiCtrl.ShowMessage(this.errorMessage);
        }
        else {
            var newObj = this.map.id != data.id;
            console.log('MapFormComponent::SaveDataHandler: ' + (newObj ? 'CREATED' : 'UPDATED') + ' id=' + data.id);
            this.error = false;
            this.map.id = data.id;
            this.guiCtrl.ItAssetSaved(this.map, this.prev);
            this.prev.clone(this.map);
        }
    };
    MapFormComponent.prototype.ngAfterViewInit = function () {
        var mapform = this;
        this.graph = new MxGraph(this.graphContainerRef.nativeElement, this.guiCtrl);
        console.log('ngAfterViewInit:', this.map);
        this.graph.RegisterAddCellHandler(function (sender, evt) {
            console.log('CELLS_ADDED:');
            console.log(evt);
            var cells = evt.getProperty('cells');
            if (cells != null && cells[0].isEdge()) {
                var source = evt.getProperty('source');
                var target = evt.getProperty('target');
                if (source != null) {
                    console.log('source:' + source.value.name);
                }
                if (target != null) {
                    console.log('target:' + target.value.name);
                }
                mapform.OpenDialog(cells[0]);
            }
        });
        this.graph.BeginUpdate();
        try {
            var c1 = this.graph.InsertVertex(this.map.getAsset(), 20, 40, 80, 70);
            /*
            let m = this.guiCtrl.GetApplicationByName('moSaic');
            let c2 = this.graph.insertVertex(m, 20, 40, 80, 70);
            this.graph.insertEdge(m, c1, c2, 20, 40, 80, 70);
            */
        }
        catch (error) {
            console.error(error);
        }
        finally {
            this.graph.EndUpdate();
        }
    };
    MapFormComponent.prototype.CheckToBeSaved = function () {
        if (this.NotEqual(this.map, this.prev) || this.map.id == null) {
            return true;
        }
        else {
            return false;
        }
    };
    MapFormComponent.prototype.NotEqual = function (o1, o2) {
        var equal;
        equal = inspect(o1).localeCompare(inspect(o2)) == 0;
        return !equal;
    };
    __decorate([
        ViewChild('graphContainer'),
        __metadata("design:type", ElementRef)
    ], MapFormComponent.prototype, "graphContainerRef", void 0);
    __decorate([
        Input(),
        __metadata("design:type", GuiCtrlComponent)
    ], MapFormComponent.prototype, "guiCtrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ItMap)
    ], MapFormComponent.prototype, "map", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MapFormComponent.prototype, "searchAppStr", void 0);
    MapFormComponent = __decorate([
        Component({
            selector: 'app-map-form',
            templateUrl: './map-form.component.html',
            styleUrls: ['./map-form.component.css']
        }),
        __metadata("design:paramtypes", [DataService, MatDialog])
    ], MapFormComponent);
    return MapFormComponent;
}());
export { MapFormComponent };
//# sourceMappingURL=map-form.component.js.map