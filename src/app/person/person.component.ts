import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import {PersonService} from '../person.service';
//import {MatTableModule} from '@angular/material/table'

import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private newService: PersonService, ) {}

  Repdata;
  valbutton = "Save";
  displayedColumns: string[] = ['position', 'name', 'note', 'operations'];
  ngOnInit() {
    this.newService.GetUser().subscribe(data => this.Repdata = data)
    console.log("=======================================Person======================================")
  }

  onSave = function(user, isValid: boolean) {
    console.log("=======================================Person Save======================================"+user);
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
