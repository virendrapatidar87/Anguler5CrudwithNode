import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import {PersonService} from './person.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private newService: PersonService, ) {}
  Repdata;
  valbutton = "Save";

  

  ngOnInit() {
    //this.newService.GetUser().subscribe(data => this.Repdata = data)
  }

  onSave = function(user, isValid: boolean) {
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        // alert(data.data);

        this.ngOnInit();
      }
      , error => this.errorMessage = error);
    this.name = "";
    this.note = "";
    this.valbutton = "Save";

  }
  edit = function(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.note = kk.note;
    this.valbutton = "Update";
  }

  delete = function(id) {
    this.newService.deleteUser(id)
      .subscribe(data => {
      //  alert(data.data);
        this.ngOnInit();
      },
      error => this.errorMessage = error
    )
  }

} 