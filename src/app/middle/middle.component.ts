import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { PmtVersion } from '../core/models/pmt-version';
import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})

export class MiddleComponent {
  @Input() guiCtrl: GuiCtrlComponent;
  @Input() panelOpenState: boolean = true;

  constructor() { }
/*
  AddNewApplication(event: Event): void {
    event.stopPropagation(); // if not the accordilion close
    this.guiCtrl.AddNewPmtVersion();
  }
  
  AddNewMetamodel(event: Event): void {
    event.stopPropagation(); // if not the accordilion close
    this.guiCtrl.AddNewMetamodel();
  }*/

  OnClose(): void { }
}
