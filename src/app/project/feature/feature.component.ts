import { Component, OnInit, ViewChild } from '@angular/core';
import { FeatureService } from './feature.service';
import { ProjectService } from '../project.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '../../../../node_modules/@angular/material';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';
import { FeatureFormComponent } from './feature-form/feature-form.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  pId : string ; 
  featureList;
  getData;
  //valbutton = "Save";
  id : string;
  
  constructor(private featureService: FeatureService, private projectService: ProjectService,public dialog: MatDialog , private router: Router,private route: ActivatedRoute) { }
  displayedColumns: string[] = ['position', 'name','projects', 'operations'];
  projects;
  searchFeatureForm;
  
  
  private paginator: MatPaginator;
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }
  
  ngOnInit() {
     this.route.params.subscribe(params => {
      this.pId = params['pId']; // (+) converts string 'id' to a number
   var  disableProjectSelectBox;
      if(this.pId){
        disableProjectSelectBox = true;
      }else{
        disableProjectSelectBox = false;
      }
       
      this.searchFeatureForm =  new FormGroup({
        'projectId': new FormControl({value: '',disabled: disableProjectSelectBox})
          
       });
      if(localStorage.getItem('currentUser')){
        
        this.projectService.GetSelectList().subscribe(data =>  this.projects = data);
        
        this.reloadFeature(this.pId);
         if(this.pId){
         this.searchFeatureForm.setValue({
          'projectId': this.pId,
         })
         }else{
          this.searchFeatureForm.setValue({
            'projectId': null
           })
         }
       // console.log("=======================================Person======================================");
        }else{
          this.router.navigate(['/login']);
        }
      // In a real app: dispatch action to load the details here.
   }
  );
  
}
  applyFilter(filterValue: string) {
    //console.log("=======================================Person======================================" + filterValue);
    this.featureList.filter = filterValue.trim().toLowerCase();
    if (this.featureList.paginator) {
      this.featureList.paginator.firstPage();
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
    this.featureService.deleteData(id)
      .subscribe(data => {
      //  alert(data.data);
        this.ngOnInit();
      },
      error => this.errorMessage = error
    )
  }
  openDialog(): void {
    console.log('requested project'+this.pId)
    const dialogRef = this.dialog.open(FeatureFormComponent, {
      width: '350px' , 
       data: {id : this.id,projectId: this.pId}
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

  reloadFeature(projectId) : void{
    console.log(projectId)
    if(projectId=='0'){
      projectId=null;
    }
    this.featureService.GetList(projectId).subscribe(data => { this.featureList = new MatTableDataSource(data);this.featureList.paginator = this.paginator;},error => 'error')
        
  }
}
