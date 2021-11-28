import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public title = "Doble Electricidad"
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public LogOut(){
    localStorage.setItem('token', 'false');
    this.router.navigate(['']);
  }

}
