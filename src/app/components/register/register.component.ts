import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendApiService } from 'src/app/services/backend-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public showSpinner = false;
  public profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  private table = 'users';
  constructor(private http: BackendApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  public registerProfile(){
    if(this.profileForm.valid){
      this.showSpinner = true;
      setTimeout(async() => {
      let data_username = await this.http.searchInDataFromKey(this.table, 'username', this.profileForm.value['username']);
      let data_email = await this.http.searchInDataFromKey(this.table, 'email', this.profileForm.value['email'])
      let message = '';
      if(data_username == null && data_email == null){
        this.http.setDataFromKey(this.table, this.profileForm.value);
        message = 'Successfully register';
      } else {
        if(data_username !== null){
          message = 'Username already taken';
        } else {
          message = 'Email already taken';
        }
      }
      this._snackBar.open(message, 'Close', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 3000
      });
      this.showSpinner = false;
        
      }, 500);
    }
  }

}
