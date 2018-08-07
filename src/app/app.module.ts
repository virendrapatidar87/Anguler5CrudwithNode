import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';  
import { FormsModule } from '@angular/forms';  
  
import { AppComponent } from './app.component';  
  
import {CommonService} from './common.service';
import { PersonComponent } from './person/person.component';
import { PersonService } from './person.service';
import { RouterModule, Routes } from '@angular/router';
// import {MatTableModule} from '@angular/material/table'
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from './common.components';
import { UserFormComponent } from './user/user-form/user-form.component';

import { UserListComponent } from './user/user-list/user-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { CommonDialogComponent } from './common/common-dialog/common-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'person', component: PersonComponent },{path: 'users', component: UserListComponent}];

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    UserFormComponent,
    UserListComponent,
    CommonDialogComponent,
  ],
  imports: [
    BrowserModule, HttpModule, CommonModule ,BrowserAnimationsModule, FormsModule ,ReactiveFormsModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  entryComponents: [PersonComponent,UserFormComponent,UserListComponent,CommonDialogComponent],
  providers: [CommonService,PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
