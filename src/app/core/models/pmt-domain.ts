import { PmtAsset } from './pmt-asset';

export class PmtDomain extends PmtAsset {
	protected validityStart: string;
  	protected validityEnd: string;

  	 public clone(asset: PmtDomain)  {
  		var dataObject = Object.assign({}, asset);
        for (var prop in dataObject){
        	this[prop]=dataObject[prop];
        }
 	}
}