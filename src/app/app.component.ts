import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import {PersonService} from './person.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  constructor(private router: Router) {}
  

  

  ngOnInit() {
        
    if(localStorage.getItem('currentUser')== null){
      
      this.router.navigate(['/login']);
    }
  

  }
  
} 