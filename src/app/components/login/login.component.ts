import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showSpinner = false;
  private table = 'users';
  public hide = true;

  public profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: BackendApiService, private _snackBar: MatSnackBar, public router: Router) { }

  ngOnInit(): void {
  }

  public loginProfile(){
    if(this.profileForm.valid){
      this.showSpinner = true;
      setTimeout(async() => {
        this.showSpinner = false;
        let data_username = await this.http.searchInDataFromKey(this.table, 'username', this.profileForm.value['username']);
        let success = false;
        if(data_username !== null){
          success = (data_username['password'] == this.profileForm.value['password']);
        }
        localStorage.setItem('token', `${success}`);
        if(success){
          this.router.navigate(['menu']);
        } else {
          let message = "Error in login";
          this._snackBar.open(message, 'Close', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      }, 500);
    }
  }
}
