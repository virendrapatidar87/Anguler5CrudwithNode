import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatTableDataSource,MatPaginator} from '@angular/material';
import {UserFormComponent} from '../user-form/user-form.component'
import { PersonService } from '../../person.service';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  Repdata;
  getData;
  valbutton = "Save";
  id : string;
  displayedColumns: string[] = ['position', 'name', 'note', 'operations'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor(private newService: PersonService,public dialog: MatDialog ) {
    
  }
  private paginator: MatPaginator;
  // private sort: MatSort;

  /* @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  } */

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }

  /* setDataSourceAttributes() {
    this.Repdata.paginator = this.paginator;
     this.dataSource.sort = this.sort; 

    if (this.paginator  && this.sort ) {
      this.applyFilter('');
    }
  } */
  
   ngOnInit() {
    this.newService.GetUser().subscribe(data => { this.Repdata = new MatTableDataSource(data);this.Repdata.paginator = this.paginator;},error => 'error')
    
    console.log("=======================================Person======================================");
  }
  

  applyFilter(filterValue: string) {
    console.log("=======================================Person======================================" + filterValue);
    this.Repdata.filter = filterValue.trim().toLowerCase();
    if (this.Repdata.paginator) {
      this.Repdata.paginator.firstPage();
    }
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
