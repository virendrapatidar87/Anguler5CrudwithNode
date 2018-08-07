import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {
  dialogOp;
  constructor(public dialogRef: MatDialogRef<CommonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {dialogOp : string; }) {}
    

  ngOnInit() {
    console.log('operation   -----   '+this.data.dialogOp);
   this.dialogOp = this.data.dialogOp;
  }

  onOk(): void {
    this.dialogRef.close('ok');
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
