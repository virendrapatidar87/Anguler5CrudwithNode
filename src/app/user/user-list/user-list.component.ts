import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {UserFormComponent} from '../user-form/user-form.component'
import { PersonService } from '../../person.service';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  constructor(private newService: PersonService,public dialog: MatDialog ) {}

  Repdata;
  valbutton = "Save";
  id : string;
  
  displayedColumns: string[] = ['position', 'name', 'note', 'operations'];
  ngOnInit() {
    this.newService.GetUser().subscribe(data => this.Repdata = new MatTableDataSource(data))
    console.log("=======================================Person======================================");
  }
  applyFilter(filterValue: string) {
    console.log("=======================================Person======================================" + filterValue);
    this.Repdata.filter = filterValue.trim().toLowerCase();
    console.log("=======================================Person======================================" + this.Repdata);
  }
  edit = function(id) {
    console.log("=======================================Person======================================" + id);
    this.id = id;
    this.openDialog();
  }

  delete = function(id) {
    /* this.newService.deleteUser(id)
      .subscribe(data => {
      //  alert(data.data);
        this.ngOnInit();
      },
      error => this.errorMessage = error
    ) */
    this.openOpDialog('delete',id);
  }
  confirmDelete = function(id) {
    this.newService.deleteUser(id)
      .subscribe(data => {
      //  alert(data.data);
        this.ngOnInit();
      },
      error => this.errorMessage = error
    )
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '350px' , 
       data: {id : this.id}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.id = null;
      
      this.ngOnInit();
    });
  }

  openOpDialog(operation,id): void {
    console.log(' --------------------------- '+ operation);
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '450px' , 
       data: {dialogOp : operation}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result && result=='ok'){
        this.confirmDelete(id);
        this.ngOnInit();
      }
      
    });
  }
}
