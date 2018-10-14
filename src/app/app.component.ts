import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import {PersonService} from './person.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  constructor(private router: Router,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "user",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/user.svg")
    );
  }
  

  

  ngOnInit() {
        
    if(localStorage.getItem('currentUser')== null){
      
      this.router.navigate(['/login']);
    }
  

  }
  
} 