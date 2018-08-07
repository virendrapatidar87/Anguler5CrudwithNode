import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserFormData} from '../user.form'
import { PersonService } from '../../person.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  valbutton :string;
  name: string;
  note: string;
  id: string;
  Getdata;
  userDetailsForm;
  constructor(private newService: PersonService,
    public dialogRef: MatDialogRef<UserFormComponent>, @Inject(MAT_DIALOG_DATA) public data: UserFormData) {}
    
    ngOnInit(){
      console.log('=========Init User Form======='+this.data.id)
      this.userDetailsForm = new FormGroup({
        'id': new FormControl(this.id),
        'name': new FormControl(this.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
              ]),
        'note': new FormControl(this.note,[Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150)
        ])
      })
      if(this.data.id){
        this.valbutton = 'Update';
        this.newService.getUser(this.data.id.trim()).subscribe(returndata => this.assignValue(returndata));
        
        
      }else{
      
      this.valbutton = 'Save';
    }
    
     
      
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  assignValue(data): void {
  this.valbutton = "Update";
  this.userDetailsForm.setValue({
    'id' : data._id,
    'name': data.name,
    'note': data.note
  })
  /* this.name  = ;
  this.note = ; */
  
  }

  onSave = function(user, isValid: boolean) {
    console.log("=======================================Person Save======================================"+user.id +" "+this.valbutton);
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        // alert(data.data);

        //this.ngOnInit();
      }
      , error => this.errorMessage = error);
    this.name = "";
    this.note = "";
    this.valbutton = "Save";
    this.dialogRef.close();
  }
}
