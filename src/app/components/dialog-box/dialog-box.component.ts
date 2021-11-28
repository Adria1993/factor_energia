import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../clientes/clientes.component';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action:string;
  local_data:any;
  public profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Client) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    if(this.profileForm.valid && this.action != 'Delete'){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }

    if(this.action == "Delete"){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}