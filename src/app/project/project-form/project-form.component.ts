import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ProjectService} from '../project.service'
import { ProjectFormData } from '../project-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectDetailsForm;
  valbutton;
  constructor(private newService: ProjectService,
    public dialogRef: MatDialogRef<ProjectFormComponent>, @Inject(MAT_DIALOG_DATA) public data: ProjectFormData) { }

    ngOnInit(){
      console.log('=========Init User Form======='+this.data.id)
      this.projectDetailsForm = new FormGroup({
        'id': new FormControl(''),
        'name': new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
              ])
      })
      if(this.data.id){
        this.valbutton = 'Update';
        this.newService.getDataById(this.data.id.trim()).subscribe(returndata => this.assignValue(returndata));
      }else{
      
      this.valbutton = 'Save';
    }
    
     
      
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  assignValue(data): void {
  this.valbutton = "Update";
  this.projectDetailsForm.setValue({
    'id' : data._id,
    'name': data.name
  })
    
  }

  onSave = function(formData, isValid: boolean) {
   // console.log("=======================================Person Save======================================"+user.id +" "+this.valbutton);
   formData.mode = this.valbutton;
    if(this.valbutton == "Save"){
    this.newService.saveData(formData)
      .subscribe(data => {
        // alert(data.data);

        //this.ngOnInit();
      }
      , error => this.errorMessage = error);
    }else{
      this.newService.updateData(formData)
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
