import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from './project.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { CommonDialogComponent } from '../common/common-dialog/common-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectList;
  getData;
  //valbutton = "Save";
  id : string;
  displayedColumns: string[] = ['position', 'name', 'operations'];
  constructor(private newService: ProjectService,public dialog: MatDialog , private router: Router) { }

  private paginator: MatPaginator;
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }
  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      
    
      this.newService.GetList().subscribe(data => { this.projectList = new MatTableDataSource(data);this.projectList.paginator = this.paginator;},error => 'error')
   
     // console.log("=======================================Person======================================");
      }else{
        this.router.navigate(['/login']);
      }
  }

  applyFilter(filterValue: string) {
    //console.log("=======================================Person======================================" + filterValue);
    this.projectList.filter = filterValue.trim().toLowerCase();
    if (this.projectList.paginator) {
      this.projectList.paginator.firstPage();
    }
    //console.log("=======================================Person======================================" + this.Repdata);
  }
  edit = function(id) {
    console.log("=======================================Person======================================" + id);
    this.id = id;
    this.openDialog();
  }

  delete = function(id) {
   
    this.openOpDialog('delete',id);
  }
  confirmDelete = function(id) {
    this.newService.deleteData(id)
      .subscribe(data => {
      //  alert(data.data);
        this.ngOnInit();
      },
      error => this.errorMessage = error
    )
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
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
