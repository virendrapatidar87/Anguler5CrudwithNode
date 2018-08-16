import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from '../../project.service';
import { CategoryService } from '../category.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CategoryFormData } from '../category-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  valbutton = 'Save';
  categoryDetailsForm;
  selectedProject;
  projects;
  constructor(private categoryService: CategoryService, private projectService: ProjectService,
    public dialogRef: MatDialogRef<CategoryFormComponent>, @Inject(MAT_DIALOG_DATA) public data: CategoryFormData) { }

  ngOnInit() {
    console.log('=========Init User Form=======' + this.data.id)
    
    this.categoryDetailsForm = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      'projectId': new FormControl('0')
    })

    if(this.data.projectId){
      this.categoryDetailsForm.setValue({
        'id': null,
        'projectId': this.data.projectId,
        'name': null
      }) 
    }
    this.projectService.GetSelectList().subscribe(data => this.projects = data);
    //this.categoryDetailsForm.setValue({'_id':'0','Name':'None'}, {onlySelf: true});
    // this.selectedProject = '0'

    if (this.data.id) {
      this.valbutton = 'Update';
      this.categoryService.getDataById(this.data.id.trim()).subscribe(returndata => { console.log(JSON.stringify(returndata)); return this.assignValue(returndata) });
    } else {

      this.valbutton = 'Save';
    }

    

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  assignValue(data): void {
    this.valbutton = "Update";
    this.categoryDetailsForm.setValue({
      'id': data._id,
      'name': data.name,
      'projectId': data.projectId._id
    });
    //this.selectedProject  = data.projectId._id;

  }

  onSave = function (formData, isValid: boolean) {
    // console.log("=======================================Person Save======================================"+user.id +" "+this.valbutton);
    formData.mode = this.valbutton;

    console.log(JSON.stringify(formData));

    if (this.valbutton == "Save") {
      this.categoryService.saveData(formData)
        .subscribe(data => {
          // alert(data.data);

          //this.ngOnInit();
        }
          , error => this.errorMessage = error);
    } else {
      this.categoryService.updateData(formData)
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
