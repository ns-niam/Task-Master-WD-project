import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {Folder, User} from "../models";
import {Observable} from "rxjs";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  photoUrl: string = '';
  newUrl: string = '';
  isDisabled = true;
  inputValue = '';
  name: string = '';
  surname: string = '';
  team: string = '';
  email: string = '';
  password: string = '';
  user!: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser()
  }

  username = localStorage.getItem("username")



  updateUrl(){
    if (this.newUrl==''){
      alert("field is empty");
    }
    else{
      this.photoUrl = this.newUrl;

    }
  }

  edit() {
    this.isDisabled = false; // Изменяем состояние disabled при нажатии кнопки
  }


  sendChanges(){
    if (this.name == '' || this.surname == '' || this.team == '' || this.email == ''){
      alert("Fill in all fields");
    }
    this.isDisabled = true;
    const updatedUserData = {
      id: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
      name: this.name,
      lastname: this.surname,
      team: this.team,
      email: this.email,
      photoUrl: this.photoUrl
    };
    this.userService
      .editUser2(String(this.username), updatedUserData)
      .subscribe((updatedUser: User) => {
        console.log('User data updated successfully:', updatedUser);

      }, (error) => {
        console.error('Error updating user data:', error);
      });



  }


  getUser(){
    this.userService
      .getUser2(String(this.username))
      .subscribe((data: User) => {
        this.name = data.name
        this.surname = data.lastname
        this.team =  data.team
        this.email = data.email
        this.photoUrl = data.photoUrl

        console.log(`${this.name}, ${this.surname}, ${this.email}, ${this.team}`)
      })
  }


}
