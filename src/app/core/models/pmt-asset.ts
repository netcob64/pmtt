import { v1 as uuid } from 'uuid';
import { PmtVersion } from './pmt-version';

export enum PmtAssetStatus {
  DRA = "DRAFT",
  PRO = "PRODUCTION",
  ARC = "ARCHIVE"
}

export type PmtAssetID = any;

export class PmtAsset {
  protected className: string;
  protected id: PmtAssetID;
  protected pmtVersion: PmtVersion;
  protected name: string;
  protected description: string;
  protected label: string;
  protected type: string;
  protected status: PmtAssetStatus;
  protected version: number;
  protected validityStart: string;
  protected validityEnd: string;
  protected children: PmtAsset[];

  constructor(id? : PmtAssetID) {
    this.className = this.constructor.name;
    this.status = PmtAssetStatus.DRA;
    this.id = (id != undefined ? id : uuid());
    this.version = 0;
    //console.log('ID => ', this.id);
  }

  SetFromJson(jsonData: Object): PmtAsset {
    this.className = this.constructor.name;
    for (var prop in jsonData) {
      //console.log(prop+' => '+ jsonData[prop]);
      this[prop] = jsonData[prop];
    }
    //console.log("SetForJson", this);
    return this;
  }

  GetJsonData(): Object {
    return JSON.parse(JSON.stringify(this));
  }

  public GetId(): PmtAssetID {
    return this.id;
  }

  public GetVersion(): number {
    return this.version;
  }
    
  public SetVersion(version: number): void {
    this.version = version;
  }

  public GetType(): string {
    return this.type;
  }

  public GetClassName(): string {
    return this.constructor.name;
  }

  /** for instance application module */
  public AddChildren(asset: PmtAsset): void {
    if (this.children == undefined) this.children = [];
    this.children.concat(asset);
  }

  public GetName(): string {
    return this.name;
  }
  public GetDescription(): string {
    return this.description;
  }

  public SetName(name: string): void {
    this.name = name;
  }

  IsEqual(asset: PmtAsset): boolean {
    return asset.id == this.id;
  }
}


