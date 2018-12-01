import { ItAsset, ItAssetStatus } from './it-asset';
import { ItMessage } from './it-message';

export enum PmtDomainType {
	PRO="PROGICIEL",
	SPE="SPECIFIQUE",
	X="..."
}

export class PmtDomain extends ItAsset {
	private outMessages: ItMessage[];
	private inMessages: ItMessage[];

	constructor() {
		super();
		this.status=ItAssetStatus.DRA;

        //console.log('PmtDomains.constructor ', this);
	}
	public addMessage(message: ItMessage, isInMessage: boolean = false): void {
		if (isInMessage){
			this.inMessages.concat(message);
		} else {
			this.outMessages.concat(message);
		}
	}

    public clone(asset: PmtDomain)  {
  		var dataObject = Object.assign({}, asset);
        for (var prop in dataObject){
        	this[prop]=dataObject[prop];
        }
 	}
  
}


export class PmtDomainList  {
  applications: PmtDomain[];
}