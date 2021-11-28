import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Simulacio d'una Backend Api amb dades agafades del localstorage
export class BackendApiService {

  constructor(private http: HttpClient) { }

  public getDataFromKey(key: string): Promise<any[]>{
    return new Promise((resolve, reject) => {
      let data:any = localStorage.getItem(key);
      if(data !== null){
        resolve(JSON.parse(data))
      } else {
        reject(new Error("Don't exists data"));
      }
    });
  }
  public setDataFromKey(key:string, value:any): void{
    let data:any = localStorage.getItem(key);
    if(data !== null){
      let object = JSON.parse(data);
      object.push(value);
      localStorage.setItem(key, JSON.stringify(object));
    } else {
      let dataStored = [value];
      localStorage.setItem(key, JSON.stringify(dataStored));
    }
  }

  public downloadFile(url:any): Observable<any>{		
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
		return this.http.get(url, {headers: headers,  responseType: 'blob' as 'json' });
  }

  public searchInDataFromKey(key: string, keyObjectSearch: string, valueObject:string) : any {
    return new Promise((resolve) => {
      let data: any = localStorage.getItem(key);
      if(data !== null){
        let objects:any[] = JSON.parse(data);
        let object_findit: any = null;
        objects.forEach((x:any) => {
          if(x[keyObjectSearch] == valueObject){
            object_findit = x;
          }
        })
        resolve(object_findit);
      } else{
        resolve(null);
      }
    })
  }
}
