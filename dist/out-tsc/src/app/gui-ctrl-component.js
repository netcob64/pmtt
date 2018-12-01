var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { Component, Input } from '@angular/core';
import { AppComponent } from './app.component';
import { ItAsset } from './core/models/it-asset';
import { ItApplication } from './core/models/it-application';
import { ItMap } from './core/models/it-map';
import { ItMessage } from './core/models/it-message';
import { TabContentType } from './core/models/tab-content-type';
import { ItMetamodel } from './core/models/it-metamodel';
import { DataService } from './core/services/data.service';
import { DataServiceDataType } from './core/services/data.service.data.type';
import { inspect } from 'util';
var TabContent = /** @class */ (function () {
    function TabContent(type, content) {
        this.type = type;
        this.content = content;
    }
    TabContent.prototype.getLabel = function () {
        if (this.content instanceof ItApplication) {
            return 'app: ' + this.content.name;
        }
        else if (this.content instanceof ItMetamodel) {
            return 'class: ' + this.content.name;
        }
        else if (this.content instanceof ItMap) {
            return 'map[' + this.content.type + ']: ' + this.content.name + ' (' + this.content.getAsset().name + ')';
        }
        else {
            return this.content.name;
        }
    };
    return TabContent;
}());
var GuiCtrlComponent = /** @class */ (function () {
    function GuiCtrlComponent(dataService) {
        this.dataService = dataService;
        this.me = this;
        this.test = true;
        /* TODO: initialize from Database */
        this.IT_METAMODEL_CLASS_NAME = (new ItMetamodel()).getClassName();
        this.IT_APPLICATION_CLASS_NAME = (new ItApplication()).getClassName();
        this.IT_MAP_CLASS_NAME = (new ItMap()).getClassName();
        this.IT_MESSAGE_CLASS_NAME = (new ItMessage()).getClassName();
        this.tabContentTypeForClass = {
            "ItApplication": TabContentType.APP,
            "ItMetamodel": TabContentType.META_MODEL,
            "ItMap": TabContentType.MAP,
        };
        this.dataServiceTypeForClass = {
            "ItApplication": DataServiceDataType.APPLICATION,
            "ItMetamodel": DataServiceDataType.META_MODEL,
            "ItMap": DataServiceDataType.MAP,
        };
        //-------------------------
        // Tabs management
        //-------------------------
        this.tabs = [];
        this.activeTabIndex = 0;
        //------------
        // Trace, Debug, Error
        //------------
        this.nbError = 0;
        this.footerMessage = "";
        this.debugIsVisible = false;
        //-------------------------
        // Login management
        //-------------------------
        this.first = true;
        //-------------------------
        // SideNav contrrol
        //-------------------------
        this.sidenavIsOpen = true;
        this.objectClassIndex = new Map();
        //this.metamodels = [];    
        //this.applications = [];
        //this.maps = [];
        this.objectClassIndex.set(this.IT_APPLICATION_CLASS_NAME, new Map());
        this.objectClassIndex.set(this.IT_METAMODEL_CLASS_NAME, new Map());
        this.objectClassIndex.set(this.IT_MAP_CLASS_NAME, new Map());
        this.objectClassIndex.set(this.IT_MESSAGE_CLASS_NAME, new Map());
        dataService.guiCtrl = this;
        this.AddTabContent(TabContentType.TXT, {
            name: 'Welcome',
            html: "<h1>Welcome</h1>\n      <h3>TODO</h3>\n      <h2>\n        <ul>        \n          <li>Passer ItApplication en generique comme Metamodel dans guiCtrl, applicaiton-list etc..</li>\n          <li>permet de factoriser le code de guiCtrl..</li>\n          <li>Finir la genericite mxgraph : GraphObject etc pour avoir des label et les editer sur tout type d'objet...</li>\n        </ul>\n      </h2>\n      <ul>        \n        <li><b>Map:</b> chargement depuis BDD</li>\n        <li><b>Map:</b>Parametrage de la visu des graph en fonction de la date</li>\n        <li><b>Map:</b>Bug affichage mxGrpah quand Zoom Chrome actif....</li>\n        <li><b>Map:</b>Bouton Zoom</li>\n        <li><b>Map:</b>Print, Print setup, Preview</li>\n        <li><b>Map:</b>add ANALitics funtion -> graph of dependencies...</li>\n        <li>if an asset edition tab already exist don't create a new one...</li>\n        <li>Gestion de l'objet meta model...: <b>revoir l'IHM de gestion des attr system</b></li>\n        <li>Angular Material Tree component pour list des app?</li>        \n        <li>Gestion des versions des objets et acces concurrents</li>\n        <li>Gestion \"not saved\" pour app, graph, metamodel...\n        <li>Authentification</li>\n      </ul>\n    </div>"
        });
        //this.ShowError('coucou');
    }
    //metamodels: ItMetamodel[];
    //applications: ItApplication[];
    //maps: ItMap[];
    GuiCtrlComponent.prototype.metamodels = function () { return this.objectClassIndex.get(this.IT_METAMODEL_CLASS_NAME); };
    GuiCtrlComponent.prototype.GetLabelFor = function (className, id) {
        var assets = __spread(this.objectClassIndex.get(className).values());
        var asset = assets.find(function (asset) { return asset.getId() == id; });
        return asset.getName();
    };
    GuiCtrlComponent.prototype.GetAssetFromID = function (className, id) {
        var assets = __spread(this.objectClassIndex.get(className).values());
        return assets.find(function (asset) { return asset.getId() == id; });
    };
    /**
    *
    */
    GuiCtrlComponent.prototype.GetAssetByName = function (className, name) {
        return this.objectClassIndex.get(className).get(name);
    };
    GuiCtrlComponent.prototype.GetItAssetNameIndex = function (className) {
        return this.objectClassIndex.get(className);
    };
    GuiCtrlComponent.prototype.GetItMetamodels = function () {
        return this.GetItAssets(this.IT_METAMODEL_CLASS_NAME);
    };
    GuiCtrlComponent.prototype.GetItApplications = function () {
        return this.GetItAssets(this.IT_APPLICATION_CLASS_NAME);
    };
    GuiCtrlComponent.prototype.GetItMaps = function () {
        return this.GetItAssets(this.IT_MAP_CLASS_NAME);
    };
    GuiCtrlComponent.prototype.GetItAssets = function (className) {
        if (this.objectClassIndex.has(className)) {
            return Array.from(this.objectClassIndex.get(className).values());
        }
        else {
            return [];
        }
    };
    GuiCtrlComponent.prototype.GetApplicationTitle = function () {
        return this.app.title;
    };
    //-------------------------
    // Meta model management
    //-------------------------
    GuiCtrlComponent.prototype.AddNewMetamodel = function () {
        this.AddItAssetTab('NEW_METAMODEL', ItMetamodel);
    };
    /**
    * Add a Tab for an ItAsset edition
    * obj: string | ItAsset,   string for creation of a new ItAsset defined by its class (param: objClass)
    *                          or an instance of ItAsset
    * objClass ? : any         class of the object to be created
    */
    GuiCtrlComponent.prototype.AddItAssetTab = function (obj, objClass) {
        var object;
        if (typeof obj == 'string') {
            object = new objClass();
            object.setName(obj);
        }
        else {
            object = obj;
        }
        this.AddTabContent(this.tabContentTypeForClass[object.getClassName()], object);
    };
    GuiCtrlComponent.prototype.EditItAsset = function (asset) {
        //console.log('EditMetamodel() - ', inspect(asset));
        this.AddItAssetTab(asset);
    };
    GuiCtrlComponent.prototype.ItAssetSaved = function (newAsset, oldAsset) {
        //console.log('ItAssetSaved => asset ',inspect(asset));
        console.log('ItAssetSaved => asset ', newAsset.getName(), oldAsset.getName());
        if (this.objectClassIndex.get(newAsset.getClassName()).has(oldAsset.getName())) {
            this.objectClassIndex.get(newAsset.getClassName()).delete(oldAsset.getName());
        }
        this.objectClassIndex.get(newAsset.getClassName()).set(newAsset.getName(), newAsset);
    };
    GuiCtrlComponent.prototype.DeleteItAsset = function (asset) {
        var _this = this;
        console.log("Delete model id=" + asset.getId() + ", name=" + asset.getName());
        this.dataService.SetDataType(this.dataServiceTypeForClass[asset.getClassName()]);
        this.dataService.Delete(asset).subscribe(function (data) { return _this.DeleteItAssetDataHandler(data, asset); });
    };
    GuiCtrlComponent.prototype.DeleteItAssetDataHandler = function (data, asset) {
        if (data != undefined && data.status == 'success') {
            //this.metamodels = this.metamodels.filter(a => a.id !== data.id);
            this.objectClassIndex.get(asset.getClassName()).delete(asset.getName());
        }
        else if (data != undefined) {
            this.ShowError(data.message);
        }
        else {
            this.ShowError('Error: DB issue, trying to delete ' + asset.getClassName() + ' ' + asset.getName());
        }
    };
    GuiCtrlComponent.prototype.LoadItAssets = function (assetClass) {
        var _this = this;
        this.dataService.SetDataType(this.dataServiceTypeForClass[(new assetClass()).getClassName()]);
        this.dataService.Get().subscribe(function (data) { return _this.LoadItAssetsDataHandler(data, assetClass); });
    };
    GuiCtrlComponent.prototype.LoadItAssetsDataHandler = function (data, assetClass) {
        var _this = this;
        var asset = new assetClass();
        this.ShowMessage('LoadItAssetsDataHandler(): asset class = ' + asset.getClassName() + ' - data : ' + inspect(data));
        if (data['data'] != undefined) {
            data['data'].forEach(function (jsonData) { return _this.objectClassIndex.get(asset.getClassName()).set(jsonData.name, (new assetClass()).setFromJson(jsonData)); });
            console.log('LoadItAssetsDataHandler() - ' + asset.getClassName() + '(s) loaded!');
        }
        else {
            this.ShowError('Error: DB issue, trying to get metamodels');
        }
    };
    //-------------------------
    // ItMap management
    //-------------------------
    GuiCtrlComponent.prototype.RegisterMessage = function (message) {
        var messages = __spread(this.objectClassIndex.get(this.IT_MESSAGE_CLASS_NAME).values());
        var existingMessage = messages.find(function (msg) { return message.IsEqual(msg); });
        if (existingMessage == undefined) {
            this.objectClassIndex.get(this.IT_MESSAGE_CLASS_NAME).set(message.getName(), message);
        }
    };
    //-------------------------
    // ItApplication management
    //-------------------------
    GuiCtrlComponent.prototype.AddNewApplication = function () {
        this.AddItAssetTab('NEW_APP', ItApplication);
    };
    GuiCtrlComponent.prototype.AddNewApplicationMap = function (application) {
        this.AddMapTab(application, 'MAP_NEW');
    };
    GuiCtrlComponent.prototype.AddApplicationTab = function (appref) {
        var app;
        if (typeof appref == 'string') {
            app = new ItApplication();
            app.name = appref;
        }
        else {
            app = appref;
        }
        this.AddTabContent(TabContentType.APP, app);
    };
    GuiCtrlComponent.prototype.AddMapTab = function (app, mapref) {
        var map;
        if (typeof mapref == 'string') {
            map = new ItMap(app);
            map.name = mapref;
        }
        else {
            map = mapref;
        }
        this.AddTabContent(TabContentType.MAP, map);
    };
    GuiCtrlComponent.prototype.AddTabContent = function (tabType, asset) {
        var tab;
        var assName = (asset instanceof ItAsset ? asset.getName() : "");
        // search if asset is already open in a tab
        var index = this.tabs.findIndex(function (elt) {
            return elt.type == tabType && (assName == "" || assName == elt.content.getName());
        });
        //console.log('index='+index);
        if (index < 0) {
            // not found -> create new tab
            tab = new TabContent(tabType, asset);
            this.activeTab = tab;
            this.activeTabIndex = this.tabs.length;
            this.tabs = this.tabs.concat(tab);
        }
        else {
            // found -> show the tab
            this.activeTabIndex = index;
        }
    };
    GuiCtrlComponent.prototype.DeleteTabContent = function (tabContent) {
        this.tabs = this.tabs.filter(function (tc) { return tc !== tabContent; });
        this.activeTab = this.tabs[0];
    };
    GuiCtrlComponent.prototype.ShowError = function (error) {
        this.nbError++;
        this.ShowMessage('<span class="error"><b>ERROR >>> </b>' + error + '</span>');
        console.error("ERROR >>> " + error);
    };
    // TRACE IN gui
    GuiCtrlComponent.prototype.ShowMessage = function (msg) {
        var s = this.footerMessage.substring(0, 10000);
        this.footerMessage = '<p>' + msg + '</p>' + s;
        //console.log(msg);
    };
    GuiCtrlComponent.prototype.ClearMessage = function () {
        this.footerMessage = '';
        this.nbError = 0;
    };
    GuiCtrlComponent.prototype.DebugShowHide = function () {
        this.debugIsVisible = !this.debugIsVisible;
        return this.debugIsVisible;
    };
    GuiCtrlComponent.prototype.Login = function (login, password) {
        this.first = false;
        console.log('First: ' + this.first);
        console.log('Login: ' + login);
        console.log('Password: ' + password);
        if (login == "cob" && password == "cob") {
            this.app.logged = true;
            sessionStorage.setItem('access_token', 'fddf');
        }
        else {
            this.app.logged = false;
        }
        return this.app.logged;
    };
    GuiCtrlComponent.prototype.Logout = function () {
        sessionStorage.removeItem('auth_token');
        this.app.logged = false;
        this.first = true;
    };
    GuiCtrlComponent.prototype.SidenavShowHide = function () {
        this.sidenavIsOpen = !this.sidenavIsOpen;
    };
    GuiCtrlComponent.prototype.IsSidenavIsOpen = function () {
        return this.sidenavIsOpen;
    };
    __decorate([
        Input(),
        __metadata("design:type", AppComponent)
    ], GuiCtrlComponent.prototype, "app", void 0);
    GuiCtrlComponent = __decorate([
        Component({ selector: 'gui-ctrl', template: "" }),
        __metadata("design:paramtypes", [DataService])
    ], GuiCtrlComponent);
    return GuiCtrlComponent;
}());
export { GuiCtrlComponent };
//# sourceMappingURL=gui-ctrl-component.js.map