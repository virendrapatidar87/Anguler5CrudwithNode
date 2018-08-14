import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from './category.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  pId : string ; 
  categoryList;
  getData;
  //valbutton = "Save";
  id : string;
  displayedColumns: string[] = ['position', 'name','projectName', 'operations'];
  constructor(private newService: CategoryService,public dialog: MatDialog , private router: Router,private route: ActivatedRoute) { }

  private paginator: MatPaginator;
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pId = params['pId']; // (+) converts string 'id' to a number
      if(localStorage.getItem('currentUser')){
      
        this.newService.GetList(this.pId).subscribe(data => { this.categoryList = new MatTableDataSource(data);this.categoryList.paginator = this.paginator;},error => 'error')
     
       // console.log("=======================================Person======================================");
        }else{
          this.router.navigate(['/login']);
        }
      // In a real app: dispatch action to load the details here.
   });
}

  applyFilter(filterValue: string) {
    //console.log("=======================================Person======================================" + filterValue);
    this.categoryList.filter = filterValue.trim().toLowerCase();
    if (this.categoryList.paginator) {
      this.categoryList.paginator.firstPage();
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
    const dialogRef = this.dialog.open(CategoryFormComponent, {
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
