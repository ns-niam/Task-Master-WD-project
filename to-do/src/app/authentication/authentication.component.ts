import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./authentication.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService } from "../user.service";
import { TeamService } from "../create-team/create-team.service";
import {Team} from "../models";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit  {
  containerActive: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private teamService: TeamService
    ) {
  }

  ngOnInit() {

  }

  toggleContainer(): void {
    this.containerActive = !this.containerActive;
  }

  login() {
    this.authenticationService
      .signIn(this.username, this.password)
      .subscribe((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("logged", 'zzz');
      })
    this.userService
      .getUser(this.username)
      .subscribe((data) => {
        localStorage.setItem("id", String(data.id));
        localStorage.setItem("username", data.username);
        localStorage.setItem("team_id", data.team)
      })


    console.log( `${this.username} ${this.password}` )
    this.password = ''
  }


  logout() {
    localStorage.setItem("logged", '');
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("currId");
    localStorage.removeItem("team_id");

  }

  signUp(){
    console.log(`${this.password} ${this.email} ${this.password}`)
  }

  protected readonly Boolean = Boolean;
  protected readonly localStorage = localStorage;
}
