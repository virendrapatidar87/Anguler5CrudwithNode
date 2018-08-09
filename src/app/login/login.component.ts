import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { RegistrationComponent } from './registration/registration.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(private newService: LoginService,public dialog: MatDialog,private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      
      'username': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]),
      
      'password': new FormControl('',
        [
          Validators.required,
          //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'),
          Validators.minLength(8),
          Validators.maxLength(30)
       ]),
      })
  }

  onLogin(user) : void {
    this.newService.login(user).subscribe(data => { console.log(data); localStorage.setItem('currentUser', data.token); console.log(' ****************************************'+localStorage.getItem('currentUser')); this.router.navigate(['/users']);}
      , error => error);
    
  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '350px' 
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.ngOnInit();
    });
  }
}
