import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { ProjectService } from '../project.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ScenarioService } from './scenario.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryFormComponent } from '../category/category-form/category-form.component';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';
import { ScenarioFormComponent } from './scenario-form/scenario-form.component';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {
  scenarioList;
  cId;
  searchScenarioForm;
  projects;
  categories;
  selectedProjectId;
  displayedColumns: string[] = ['position', 'name', 'categoryName', 'projectName', 'operations'];
  id : string;
  constructor(private scenarioService: ScenarioService,private categoryService: CategoryService , private projectService: ProjectService,public dialog: MatDialog , private router: Router,private route: ActivatedRoute) { }

  private paginator: MatPaginator;
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cId = params['cId']; // (+) converts string 'id' to a number
   var  disableCategorySelectBox;
      if(this.cId){
        disableCategorySelectBox = true;
      }else{
        disableCategorySelectBox = false;
      }
      
      this.searchScenarioForm =  new FormGroup({
        'categoryId': new FormControl({value: '',disabled: disableCategorySelectBox}),
        'projectId': new FormControl({value: '',disabled: disableCategorySelectBox})
    
       });
      if(localStorage.getItem('currentUser')){
        
        this.projectService.GetSelectList().subscribe(data =>  this.projects = data);
        this.categoryService.GetSelectList(this.selectedProjectId).subscribe(data =>  this.categories = data);
        
       // this.categoryService.GetList(this.pId).subscribe(data => { this.categoryList = new MatTableDataSource(data);this.categoryList.paginator = this.paginator;},error => 'error')
        this.reloadScenario(null,this.cId);
        
        if(this.cId){
         this.searchScenarioForm.setValue({
          'categoryId': this.cId,
          'projectId':'0'
         })
         }else{
          this.searchScenarioForm.setValue({
            'categoryId': '0',
            'projectId':'0'
           })
         }
       // console.log("=======================================Person======================================");
        }else{
          this.router.navigate(['/login']);
        }
      // In a real app: dispatch action to load the details here.
   });

   
}
reloadScenario(projectId,categoryId) : void{
  
  
  
  
  if((projectId==null ||projectId=='0') && (categoryId==null ||categoryId=='0')){
    this.scenarioService.GetList(null,null).subscribe(data => { console.log(JSON.stringify(data));this.scenarioList = new MatTableDataSource(data);this.scenarioList.paginator = this.paginator;},error => 'error')
  }else{
    this.scenarioService.GetList(projectId,categoryId).subscribe(data => { console.log(JSON.stringify(data));this.scenarioList = new MatTableDataSource(data);this.scenarioList.paginator = this.paginator;},error => 'error')
  }
  
}

applyFilter(filterValue: string) {
  //console.log("=======================================Person======================================" + filterValue);
  this.scenarioList.filter = filterValue.trim().toLowerCase();
  if (this.scenarioList.paginator) {
    this.scenarioList.paginator.firstPage();
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
  this.scenarioService.deleteData(id)
    .subscribe(data => {
    //  alert(data.data);
      this.ngOnInit();
    },
    error => this.errorMessage = error
  )
}
openDialog(): void {
  console.log('requested project'+this.cId)
  const dialogRef = this.dialog.open(ScenarioFormComponent, {
    width: '350px' , 
     data: {id : this.id,projectId: this.cId}
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
