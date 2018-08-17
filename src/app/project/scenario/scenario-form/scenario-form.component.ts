import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../category/category.service';
import { ProjectService } from '../../project.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScenarioFormData } from '../scenario-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScenarioService } from '../scenario.service';

@Component({
  selector: 'app-scenario-form',
  templateUrl: './scenario-form.component.html',
  styleUrls: ['./scenario-form.component.css']
})
export class ScenarioFormComponent implements OnInit {

  valbutton = 'Save';
  scenarioDetailsForm;
  selectedProject;
  projects;
  selectedCategory;
  categories;
  constructor(private scenarioService: ScenarioService,private categoryService: CategoryService, private projectService: ProjectService,
    public dialogRef: MatDialogRef<ScenarioFormComponent>, @Inject(MAT_DIALOG_DATA) public data: ScenarioFormData) { }

    ngOnInit() {
      console.log('=========Init Scenario Form=======' + this.data.id)
      
      this.scenarioDetailsForm = new FormGroup({
        'id': new FormControl(''),
        'name': new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200)
        ]),
        'projectId': new FormControl('0'),
        'categoryId': new FormControl('0')
      })
  
      if(this.data.categoryId){
        this.scenarioDetailsForm.setValue({
          'id': null,
          'categoryId': this.data.categoryId,
          'name': null,
          'projectId' : this.data.projectId
        }) 
      }
      this.projectService.GetSelectList().subscribe(data => this.projects = data);
      
      //this.categoryDetailsForm.setValue({'_id':'0','Name':'None'}, {onlySelf: true});
      // this.selectedProject = '0'
  
      if (this.data.id) {
        
        this.valbutton = 'Update';
        this.scenarioService.getDataById(this.data.id.trim()).subscribe(returndata => { console.log(JSON.stringify(returndata)); return this.assignValue(returndata) });
      } else {
        this.reloadCategory(null);
        this.valbutton = 'Save';
      }
  
      
  
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    assignValue(data): void {
      this.reloadCategory(data.categoryId.projectId._id);
      this.valbutton = "Update";
      this.scenarioDetailsForm.setValue({
        'id': data._id,
        'name': data.name,
        'categoryId': data.categoryId._id,
        'projectId': data.categoryId.projectId._id
      });
      //this.selectedProject  = data.projectId._id;
  
    }
  
    onSave = function (formData, isValid: boolean) {
      // console.log("=======================================Person Save======================================"+user.id +" "+this.valbutton);
      formData.mode = this.valbutton;
  
      console.log(JSON.stringify(formData));
  
      if (this.valbutton == "Save") {
        this.scenarioService.saveData(formData)
          .subscribe(data => {
            // alert(data.data);
  
            //this.ngOnInit();
          }
            , error => this.errorMessage = error);
      } else {
        this.scenarioService.updateData(formData)
          .subscribe(data => {
            // alert(data.data);
  
            //this.ngOnInit();
          }
            , error => this.errorMessage = error);
      }
      this.name = "";
      this.note = "";
      this.valbutton = "Save";
      this.dialogRef.close();
    }
    reloadCategory(projectId) : void{
      this.categoryService.GetSelectList(projectId).subscribe(data => this.categories = data);
    }

}
