import { Component, OnInit, Input } from '@angular/core';
import { GuiCtrlComponent } from '../gui-ctrl-component';
import { PmtVersion } from '../core/models/pmt-version';

@Component({
  selector: 'app-pmtversion',
  templateUrl: './pmtversion.component.html',
  styleUrls: ['./pmtversion.component.css']
})

export class PmtversionComponent {
  @Input() guiCtrl: GuiCtrlComponent;
  @Input() object: PmtVersion;
}
