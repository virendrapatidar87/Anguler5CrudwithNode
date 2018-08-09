import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  @Input() public isUserLoggedIn: boolean;
  @Input() public title: string;
  constructor(private router: Router) { }

  ngOnInit() {

  }
  logout = function(operation: string){
  
    console.log('/////////////////////////////////////////App Component Log Out')
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  

  }

}
