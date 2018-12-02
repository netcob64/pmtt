import { Component, Input, OnInit} from '@angular/core';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { PmtDomain } from '../core/models/pmt-domain';
import { DataService } from '../core/services/data.service';
import { DataServiceDataType } from '../core/services/data.service.data.type';
import { inspect } from 'util';

@Component({
  selector: 'app-pmtdomain',
  templateUrl: './pmtdomain.component.html',
  styleUrls: ['./pmtdomain.component.css']
})
export class PmtdomainComponent implements OnInit {
  @Input() guiCtrl: GuiCtrlComponent;
  @Input() object: PmtDomain;

  error : boolean = false;
  errorMessage : string = null;
  prevValue: PmtDomain;

  constructor(private dataService: DataService) { 
    this.dataService.SetDataType(DataServiceDataType.PMT_DOMAIN);
    this.prevValue=new PmtDomain();
  }
  ngOnInit() {
    this.prevValue.clone(this.object);
  }

   CheckToBeSaved() : boolean {
     if (this.NotEqual(this.object , this.prevValue) || this.object.GetVersion() == 0) {
      //this.application.SetModified(true);
      //this.prev.SetModified(true);
      return true; 
    } else {
      //this.application.SetModified(false);
      //this.prev.SetModified(false);
      return false; 
    }
  }

  Save(): void {
    if (this.CheckToBeSaved()) {
    this.dataService.Save(this.object).subscribe(data => this.SaveDataHandler(data));
    }
  }

  SaveDataHandler(data: any): void {
    if (data==undefined){
      this.error = true;
      this.errorMessage = 'database error';
      this.guiCtrl.ShowMessage(this.errorMessage);
    }
    else if (data.status != 'success'){
      this.error = true;
      this.errorMessage = data.message;
      this.guiCtrl.ShowMessage(this.errorMessage);
    } else {      
      console.log(data, 'ApplicationFormComponent::SaveApplicationDataHandler(): version='+data.version+(data.version>0?' UPDATED' : ' CREATED'));
      this.error = false;
      this.object.SetVersion(data.version);
      this.guiCtrl.PmtAssetSaved(this.object, this.prevValue);    
      this.prevValue.clone(this.object);
    }
  }

  NotEqual(o1, o2): boolean {
    var equal : boolean;
    equal = inspect(o1).localeCompare(inspect(o2)) == 0;
    return !equal;
  }
}
