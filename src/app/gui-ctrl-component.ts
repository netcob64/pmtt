import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AppComponent } from './app.component';
import { TabContentType } from './core/models/tab-content-type';
import { DataService } from './core/services/data.service';
import { DataServiceDataType } from './core/services/data.service.data.type';
import { inspect } from 'util';
import { PmtAsset } from './core/models/pmt-asset';
import { PmtVersion } from './core/models/pmt-version';
import { PmtDomain } from './core/models/pmt-domain';

class TabContent {
  type: TabContentType;
  content: PmtAsset | any;
  constructor(type: TabContentType, content: PmtAsset | any) {
    this.type = type;
    this.content = content;
  }
  getLabel(): string {
    if (this.content.GetName instanceof Object) {
    return this.content.GetName();
  } else {
    return this.content.name;
  }
    /*
    if (this.content instanceof PmtVersion) {
    return 'app: ' + this.content.GetName();
    } else if (this.content instanceof ItMetamodel) {
    return 'class: ' + this.content.GetName();
    } else if (this.content instanceof ItMap) {
    return 'map[' + this.content.GetType() + ']: ' + this.content.GetName() + ' (' + this.content.getAsset().GetName() + ')';
    } else {
      return this.content.name;
    }*/
  }
}

@Component({ selector: 'gui-ctrl', template: `` })
export class GuiCtrlComponent {
  me: GuiCtrlComponent = this;
  @Input() app: AppComponent;
  objectClassIndex: Map < string,  Map < string,  PmtAsset >> ;

  public PMT_VERSION_CLASS_NAME: string = (new PmtVersion()).GetClassName();
  public PMT_DOMAIN_CLASS_NAME: string = (new PmtDomain()).GetClassName();
  

  pmtVersion(): Map < string,  PmtAsset > { return this.objectClassIndex.get(this.PMT_VERSION_CLASS_NAME); }
  pmtDomain(): Map < string,  PmtAsset > { return this.objectClassIndex.get(this.PMT_DOMAIN_CLASS_NAME); }
 
   private tabContentTypeForClass = {
    "PmtVersion": TabContentType.PMT_VERSION,
    "PmtDomain": TabContentType.PMT_DOMAIN,
    /*"ItMetamodel": TabContentType.META_MODEL,
    "ItMap": TabContentType.MAP,*/
  }

  constructor(private dataService: DataService) {
    this.objectClassIndex = new Map();

    this.objectClassIndex.set(this.PMT_VERSION_CLASS_NAME, new Map());
    this.objectClassIndex.set(this.PMT_DOMAIN_CLASS_NAME, new Map());
   
    dataService.guiCtrl = this;

    this.AddTabContent(TabContentType.TXT, {
      name: 'Welcome',
      html: `<h1>Welcome</h1>
      <h3>TODO</h3>
      <h2>
        <ul>        
          <li>todo 1</li>
        </ul>
      </h2>
      <ul>     
      <li>todo 2</li>
      </ul>
    </div>`
    });
  }

 //-------------------------
  // PmtAsset management
  //-------------------------

  GetLabelFor(className: string, id: number): string {
    let assets: Array<PmtAsset> = [...this.objectClassIndex.get(className).values()];
    let asset : PmtAsset = assets.find(asset => asset.GetId() == id);
    return asset.GetName();
  } 

  GetAssetFromID(className: string, id: number) : PmtAsset {
    let assets: Array<PmtAsset> = [...this.objectClassIndex.get(className).values()];
    return assets.find(asset => asset.GetId() == id);
  }
  /**
  *
  */
  GetAssetByName(className: string, name: string): PmtAsset {
    return this.objectClassIndex.get(className).get(name);
  }

  GetPmtAssetNameIndex(className: string) : Map<string, PmtAsset> {
    return this.objectClassIndex.get(className);
  }  
/*
  GetItMetamodels() {
    return this.GetPmtAssets(this.IT_METAMODEL_CLASS_NAME);
  }
*/
  

  GetPmtAssets(className: string) : Array<PmtAsset> {
    if (this.objectClassIndex.has(className)){
      return Array.from(this.objectClassIndex.get(className).values());
    } else {
      return [];
    }
  }

  GetApplicationTitle(): string {
      return this.app.title;
    }

  



  /**
  * Add a Tab for an PmtAsset edition
  * obj: string | PmtAsset,   string for creation of a new PmtAsset defined by its class (param: objClass)
  *                          or an instance of PmtAsset
  * objClass ? : any         class of the object to be created
  */
  private AddPmtAssetTab(obj: string | PmtAsset, objClass ? : any): void {
    var object: PmtAsset;

    if (typeof obj == 'string') {
      object = new objClass();
      object.SetName(obj);
    } else {
      object = obj;
    }

    this.AddTabContent(this.tabContentTypeForClass[object.GetClassName()], object);
  }

  EditPmtAsset(asset: PmtAsset) {
    //console.log('EditMetamodel() - ', inspect(asset));
    this.AddPmtAssetTab(asset);
  }

  PmtAssetSaved(newAsset: PmtAsset, oldAsset: PmtAsset) {
    //console.log('PmtAssetSaved => asset ',inspect(asset));
    console.log('PmtAssetSaved => asset ', newAsset.GetName(), oldAsset.GetName());
    if (this.objectClassIndex.get(newAsset.GetClassName()).has(oldAsset.GetName())) {
      this.objectClassIndex.get(newAsset.GetClassName()).delete(oldAsset.GetName());
    }
    this.objectClassIndex.get(newAsset.GetClassName()).set(newAsset.GetName(), newAsset);
  }

  private dataServiceTypeForClass = {
    "PmtVersion": DataServiceDataType.PMT_VERSION,
  }

  DeletePmtAsset(asset: PmtAsset) {
    console.log("Delete model id=" + asset.GetId() + ", name=" + asset.GetName());
    this.dataService.SetDataType(this.dataServiceTypeForClass[asset.GetClassName()]);
    this.dataService.Delete(asset).subscribe(data => this.DeletePmtAssetDataHandler(data, asset));
  }

  DeletePmtAssetDataHandler(data: any, asset: PmtAsset): void {
    if (data != undefined && data.status == 'success') {
      //this.metamodels = this.metamodels.filter(a => a.id !== data.id);
      this.objectClassIndex.get(asset.GetClassName()).delete(asset.GetName());
      let tc : TabContent = this.SearchTabContent(this.tabContentTypeForClass[asset.GetClassName()], asset);
      this.DeleteTabContent(tc);
    } else if (data != undefined) {
      this.ShowError(data.message);
    } else {
      this.ShowError('Error: DB issue, trying to delete ' + asset.GetClassName() + ' '+ asset.GetName());
    }
  }

  LoadPmtAssets(assetClass: any) : void {
    this.dataService.SetDataType(this.dataServiceTypeForClass[(new assetClass()).GetClassName()]);
    this.dataService.Get().subscribe(data => this.LoadPmtAssetsDataHandler(data, assetClass));
  }
  
  LoadPmtAssetsDataHandler(data: any, assetClass: any): void {
    var asset:PmtAsset= new assetClass();
    this.ShowMessage('LoadPmtAssetsDataHandler(): asset class = ' + asset.GetClassName()+ ' - data : ' + inspect(data));
    if (data['data'] != undefined) {
      data['data'].forEach(jsonData => this.objectClassIndex.get(asset.GetClassName()).set(jsonData.name, (new assetClass()).SetFromJson(jsonData)));
      console.log('LoadPmtAssetsDataHandler() - '+asset.GetClassName()+'(s) loaded!');
    } else {
      this.ShowError('Error: DB issue, trying to get metamodels');
    }
  }



  //-------------------------
  // Tabs management
  //-------------------------
  tabs: TabContent[] = [];
  activeTab: TabContent;
  activeTabIndex: number = 0;

  private AddTabContent(tabType: TabContentType, asset:PmtAsset|Object): void {
    let tab : TabContent;
    let assName : string = (asset instanceof PmtAsset? asset.GetName() :"");

    // search if asset is already open in a tab
    let index = this.tabs.findIndex(elt => {
      return elt.type == tabType && (assName=="" || assName == elt.content.GetName())
    });
    //console.log('index='+index);
    if (index < 0) {
      // not found -> create new tab
      tab = new TabContent(tabType, asset);
      this.activeTab = tab;
      this.activeTabIndex = this.tabs.length;
      this.tabs = this.tabs.concat(tab);
      if (asset instanceof PmtAsset) {
        // add asset in asset list
        this.objectClassIndex.get(asset.GetClassName()).set(asset.GetName(), asset);
      }
    } else {
      // found -> show the tab
      this.activeTabIndex = index;
    }
  }

  private SearchTabContent(tabType: TabContentType, asset: PmtAsset | Object): TabContent {
    let assName: string = (asset instanceof PmtAsset ? asset.GetName() : "");
    // search if asset is already open in a tab
    return this.tabs.find(elt => {
      return elt.type == tabType && (assName == "" || assName == elt.content.GetName())
    });
  
  }

  DeleteTabContent(tabContent: TabContent): void {
    if (tabContent!=undefined){
      this.tabs = this.tabs.filter(tc => tc !== tabContent);
      this.activeTab = this.tabs[0];
    }
  }

  //------------
  // Trace, Debug, Error
  //------------
  nbError: number = 0;
  ShowError(error: string) {
    this.nbError++;
    this.ShowMessage('<span class="error"><b>ERROR >>> </b>' + error + '</span>');
    console.error("ERROR >>> " + error);
  }

  footerMessage: string = "";
  // TRACE IN gui
  ShowMessage(msg: string): void {
    var s: string = this.footerMessage.substring(0, 10000);
    this.footerMessage = '<p>' + msg + '</p>' + s;
    //console.log(msg);
  }

  ClearMessage(): void {
    this.footerMessage = '';
    this.nbError = 0;
  }

  debugIsVisible: boolean = false;

  DebugShowHide(): boolean {
    this.debugIsVisible = !this.debugIsVisible;
    return this.debugIsVisible;
  }
  //-------------------------
  // Login management
  //-------------------------
  first: boolean = true;

  Login(login: string, password: string): boolean {
    this.first = false;
    console.log('First: ' + this.first);
    console.log('Login: ' + login);
    console.log('Password: ' + password);
    if (login == "cob" && password == "cob") {
      this.app.logged = true;
      sessionStorage.setItem('access_token', 'fddf');
    } else {
      this.app.logged = false;

    }
    return this.app.logged;
  }

  Logout(): void {
    sessionStorage.removeItem('auth_token');
    this.app.logged = false;
    this.first = true;
  }

  //-------------------------
  // SideNav contrrol
  //-------------------------
  sidenavIsOpen: boolean = true;
  SidenavShowHide() {
    this.sidenavIsOpen = !this.sidenavIsOpen;

  }
  IsSidenavIsOpen(): boolean {
    return this.sidenavIsOpen;
  }
  GetSideNavLabel(): string {
    return (this.sidenavIsOpen?"Hide Sidenav":"Show Sidenav");
  }

  //-------------------------
  // PmtVersion management
  //-------------------------
  AddNewPmtVersion() {
    this.AddPmtAssetTab('NEW_PMT_VERSION', PmtVersion);
  }
  //-------------------------
  // PmtDomain management
  //-------------------------
  AddNewPmtDomain() {
    this.AddPmtAssetTab('NEW_PMT_DOMAIN', PmtDomain);
  }

}
