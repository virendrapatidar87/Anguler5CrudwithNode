import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { ProjectService } from '../project.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ScenarioService } from './scenario.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {
  scanrioList;
  cId;
  searchCategoryForm;
  projects;
  categories;
  selectedProjectId;
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
      
      this.searchCategoryForm =  new FormGroup({
        'categoryId': new FormControl({value: '',disabled: disableCategorySelectBox}),
        'projectId': new FormControl({value: '',disabled: disableCategorySelectBox})
    
       });
      if(localStorage.getItem('currentUser')){
        
        this.projectService.GetSelectList().subscribe(data =>  this.projects = data);
        this.categoryService.GetSelectList(this.selectedProjectId).subscribe(data =>  this.categories = data);
        
       // this.categoryService.GetList(this.pId).subscribe(data => { this.categoryList = new MatTableDataSource(data);this.categoryList.paginator = this.paginator;},error => 'error')
        this.reloadScenario(null,this.cId);
         if(this.cId){
         this.searchCategoryForm.setValue({
          'projectId': this.cId,
         })
         }else{
          this.searchCategoryForm.setValue({
            'projectId': '0'
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
  
  
  if(projectId=='0'){
    projectId=null;
  }
  if(categoryId=='0'){
    categoryId=null;
  }
  if(projectId==null && categoryId){
  this.scenarioService.GetList('0',categoryId).subscribe(data => { this.scanrioList = new MatTableDataSource(data);this.scanrioList.paginator = this.paginator;},error => 'error')
  }else{
    this.scenarioService.GetList(projectId,categoryId).subscribe(data => { this.scanrioList = new MatTableDataSource(data);this.scanrioList.paginator = this.paginator;},error => 'error')
  }
}
}
