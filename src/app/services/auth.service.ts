import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key: string = 'token';
  constructor() { }

  public isAuthenticated(): boolean{
    //Autentificacio del token simbolic
    let data:any = localStorage.getItem(this.key);
    if(data !== null){
      if(data === "false"){
        return false;
      } else {
        return true;
      }
    } else { 
      return false;
    }
  }
}
