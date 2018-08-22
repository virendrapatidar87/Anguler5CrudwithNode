import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { PersonService } from './person.service';
import { Router } from '@angular/router';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  darkModeActive;
  showMenu;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.appService.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
    if (localStorage.getItem('currentUser') == null) {

      this.router.navigate(['/login']);
    }
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.appService.darkModeState.next(!this.darkModeActive);
  }
} 