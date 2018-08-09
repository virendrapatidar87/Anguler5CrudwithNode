import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegistrationFormData } from '../registration-form'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm;
  constructor(private newService: LoginService,
    public dialogRef: MatDialogRef<RegistrationComponent>, @Inject(MAT_DIALOG_DATA) public data: RegistrationFormData) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      'username': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]),
      'email': new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      'password': new FormControl('',
        [
          Validators.required,
          //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
          Validators.minLength(8),
          Validators.maxLength(30)
        ]),
      'repeatpassword': new FormControl('',
        [
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegister = function (user, isValid: boolean) {
    console.log("=======================================User Register=====================================");
    //user.mode = this.valbutton;
    var result;
    this.newService.register(user).subscribe(data => { result = data; this.onNoClick();}
      , error => this.errorMessage = error);
    // console.log('result '+ result);

  }
}
