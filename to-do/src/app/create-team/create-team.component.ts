import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from './create-team.service';
import { Team, User, Notification } from '../models';
import { UserService } from '../user.service';
import { NotificationService } from '../notifications/notifications.service';
@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent {
  teamForm = this.formBuilder.group({
    teamName: ['', Validators.required],
    teammates: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  })

  currentUser !: User;
  users !: User[];
  teamUsers: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users)

    const username = localStorage.getItem("username")
    if (username != null) {
      this.userService.getUser(username).subscribe(user => this.currentUser = user)
    }
  }

  // Return a teammates
  get teammates() {
    return this.teamForm.get('teammates') as FormArray;
  }

  checkIsInTeam() {

  }

  // Add a new <input>
  addTeammate() {
    if (this.teammates.length >= 5) alert("You reach maximum of team members")
    else this.teammates.push(this.formBuilder.control(''));
  }

  validateFields() {
    if (this.currentUser.isLeader) {
      alert("You already a leader")
      this.teamForm.reset()
      return false;
    }

    const teamName = this.teamForm.get("teamName")
    if (teamName?.invalid) {
      alert('Team name is required.');
      const teamNameField = document.getElementById('team-name');
      if (teamNameField) {
        teamNameField.focus();
      }
      return false;
    }

    const teammatesArray = this.teamForm.get('teammates') as FormArray;
    for (let i = 0; i < teammatesArray.length; i++) {
      const teammateControl = teammatesArray.at(i);
      if (!teammateControl.value || teammateControl.value.trim() === '') {
        alert('Teammate username is required.');
        return false;
      }
      const user = this.users.find(user => user.username === teammateControl.value);
      if (!user) {
        alert('User does not exist.');
        this.teamForm.reset()
        return false;
      }

      if (user.isLeader) {
          alert('User is a other team leader.');
          this.teamForm.reset()
          return false;
      }

      if (user.team) {
        alert('User is already assigned to a team.');
        this.teamForm.reset()
        return false;
      }

      this.teamUsers.push(user)
    }
    return true;
  }

  onSubmit() {
    console.log("Clicked")
    if (this.validateFields()) {
      const teamNameValue = this.teamForm.get('teamName')?.value ?? '';

      const newTeam: Team = {
        name: teamNameValue
      };

      let responseData: Team;
      this.teamService.createTeam(newTeam).subscribe(
        (response) => {
          responseData = response;

          const updatedUserData = {
            team: responseData.name,
          };

          console.log(updatedUserData)
          for (let i = 0; i < this.teamUsers.length; i++) {
            const teammateControl = this.teamUsers.at(i);

            if (teammateControl != undefined) {
              const notification: Notification = {
                message: 'You have been added to the team',
                user: teammateControl.id
              };

              this.userService
                .editUser2(String(teammateControl.username), updatedUserData)
                .subscribe((updatedUser: User) => {
                  console.log('User data updated successfully:', updatedUser);

                }, (error) => {
                  console.error('Error updating user data:', error);
                });
              
              this.notificationService.createNotification(notification).subscribe(
                (response) =>{
                  console.log(response)
                }
              )
            }
          }
          this.userService
            .editUser2(this.currentUser.username, { "isLeader": true, "team": responseData.name })
            .subscribe((updatedUser: User) => {
              localStorage.setItem('team_id', String(responseData.id))
              console.log('User data updated successfully:', updatedUser);

            }, (error) => {
              console.error('Error updating user data:', error);
            })
        }

      );

      alert('Team created successfully!');
      this.teamForm.reset();
    }
  }
}
