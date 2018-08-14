import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { PersonComponent } from './person/person.component';
import { PersonService } from './person.service';
import { RouterModule, Routes } from '@angular/router';
// import {MatTableModule} from '@angular/material/table'
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from './common.components';
import { UserFormComponent } from './user/user-form/user-form.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommonDialogComponent } from './common/common-dialog/common-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { LoginService } from './login/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProjectComponent } from './project/project.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { ProjectService } from './project/project.service';
import { CategoryComponent } from './project/category/category.component';
import { CategoryFormComponent } from './project/category/category-form/category-form.component';
import { CategoryService } from './project/category/category.service';



const appRoutes: Routes = [
  { path: 'person', component: PersonComponent }, { path: 'users', component: UserListComponent }, { path: 'login', component: LoginComponent },
   { path: 'project', component: ProjectComponent }, { path: 'category', component: CategoryComponent }, { path: 'category/:pId', component: CategoryComponent }];


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    UserFormComponent,
    UserListComponent,
    CommonDialogComponent,
    LoginComponent,
    RegistrationComponent,
    AppHeaderComponent,
    ProjectComponent,
    ProjectFormComponent,
    CategoryComponent,
    CategoryFormComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule, CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(

      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  entryComponents: [PersonComponent, UserFormComponent, UserListComponent, 
    CommonDialogComponent, RegistrationComponent, LoginComponent,
    ProjectComponent, ProjectFormComponent, CategoryComponent,CategoryFormComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  }, PersonService, LoginService, ProjectService,CategoryService , ],

  bootstrap: [AppComponent]
})
export class AppModule { }
