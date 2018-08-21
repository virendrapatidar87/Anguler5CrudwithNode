import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ProjectService } from '../../project.service';
import { FeatureService } from '../feature.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect } from '../../../../../node_modules/@angular/material';
import { FeatureFormData } from '../feature-form';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})

export class FeatureFormComponent implements OnInit {
  valbutton = 'Save';
  featureDetailsForm;
  selectedProject;
  projectsList;
  projectMode = false;
  
  constructor(private featureService: FeatureService, private projectService: ProjectService,
    public dialogRef: MatDialogRef<FeatureFormComponent>, @Inject(MAT_DIALOG_DATA) public data: FeatureFormData) { }
  projectSelect;

  @ViewChild(MatSelect) set matSelect(mp: MatSelect) {
    this.projectSelect = mp;
    // this.setDataSourceAttributes();
  }
  ngOnInit() {
    console.log('=========Init User Form=======' + this.data.id)
    
    this.featureDetailsForm = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      'projects': new FormControl(null,[
        Validators.required
      ])
    })

    if(this.data.projects){
      this.projectMode=true;
      this.featureDetailsForm.setValue({
        'id': null,
        'projects': this.data.projects,
        'name': null
      }) 
    }
    this.projectService.GetSelectList().subscribe(data => this.projectsList = data);
    //this.categoryDetailsForm.setValue({'_id':'0','Name':'None'}, {onlySelf: true});
    // this.selectedProject = '0'

    if (this.data.id) {
      this.valbutton = 'Update';
      this.featureService.getDataById(this.data.id.trim()).subscribe(returndata => { console.log(JSON.stringify(returndata)); return this.assignValue(returndata) });
    } else {

      this.valbutton = 'Save';
    }

    

  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }

  assignValue(data): void {
    

    
  this.valbutton = "Update";
    this.featureDetailsForm.setValue({
      'id': data._id,
      'name': data.name,
      'projects': data.projects
    });
    //this.selectedProject  = data.projectId._id;
    this.projectSelect.matSelect = true;
   }
compState(val1: any, val2: any)  :boolean  {
    
    return val1 && val2 ? val1._id === val2._id : val1 === val2;
   }
 

  onSave = function (formData, isValid: boolean) {
    // console.log("=======================================Person Save======================================"+user.id +" "+this.valbutton);
    formData.mode = this.valbutton;

    console.log(JSON.stringify(formData));

    if (this.valbutton == "Save") {
      this.featureService.saveData(formData)
        .subscribe(data => {
          // alert(data.data);

          //this.ngOnInit();
        }
          , error => this.errorMessage = error);
    } else {
      this.featureService.updateData(formData)
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


}
