import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmtAsset } from '../models/pmt-asset';
import { GuiCtrlComponent } from '../../gui-ctrl-component';
import { DataServiceDataType } from './data.service.data.type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  //private dataUrl = 'http://localhost:8000/api/data';  // URL to web api

  private dataServiceRoot: string = 'http://localhost:8080/api';
  private getUrl: string;
  private saveUrl: string;
  private deleteUrl: string;
  private objectClass: string;
  private dataType: DataServiceDataType;

  guiCtrl: GuiCtrlComponent;
  
  constructor(private http: HttpClient) {}

  //TODO: find a way to use authHttp
  SetDataType(type: DataServiceDataType) {
    this.dataType = type;
    //switch(this.dataType) {
    //case DataServiceDataType.META_MODEL:
       this.getUrl = this.dataServiceRoot;
       this.saveUrl = this.getUrl;
       this.deleteUrl = this.getUrl;
       this.objectClass = type.toString();
      // break;
    //case DataServiceDataType.APPLICATION:
      // this.getUrl = this.dataServiceRoot;
      // this.deleteUrl = this.getUrl;
      // this.objectClass = type.toString();
      //  break;
    //default:
      // this.getUrl = 'UNDEF'; 
      // this.saveUrl = this.getUrl ;
      // this.deleteUrl = this.getUrl;
     //}
  }

  Get(): Observable<PmtAsset[]> {
    const url = `${this.getUrl}/class=${this.objectClass}`;
    return this.http.get<PmtAsset[]>(url)
      .pipe(
      tap(data => {

        // this.log(`fetched object`);
        // guiCtrl.AddMessage('data => '+JSON.stringify(data));

      }),
      catchError(this.handleError<PmtAsset[]>('Get', []))
      );
  }
  /** POST: add or update a new data to the server 
  }*/
  Save(obj: PmtAsset): Observable<PmtAsset> {
    const url = `${this.saveUrl}/class=${this.objectClass}`;
    return this.http.post<PmtAsset>(url, obj, httpOptions)
      .pipe(
      tap(_ => this.log(`added object class=${this.objectClass} id=${obj.GetId()}`)),
      tap(_ => console.log("DataService::Save : object version: ", obj.GetVersion())),
      catchError(this.handleError<PmtAsset>('Save'))
      );
  }

  Delete(obj: PmtAsset): Observable<PmtAsset> {
    const id = obj.GetId();
    const version = obj.GetVersion();
    const url = `${this.deleteUrl}/class=${this.objectClass}&id=${id}&version=${version}`;

    return this.http.delete<PmtAsset>(url, httpOptions)
      .pipe(
      tap(_ => this.log(`deleted object id=${id} version=${version}`)),
      catchError(this.handleError<PmtAsset>('Delete'))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  

      // TODO: better job of transforming error for user consumption
      this.guiCtrl.ShowError(`DataService ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(msg) {
   console.log(msg);
    this.guiCtrl.ShowMessage(msg);
  }
}