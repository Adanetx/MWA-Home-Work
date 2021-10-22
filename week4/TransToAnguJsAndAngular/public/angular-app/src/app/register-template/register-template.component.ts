import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataServiceService } from '../user-data-service.service'


@Component({
  selector: 'app-register-template',
  templateUrl: './register-template.component.html',
  styleUrls: ['./register-template.component.css']
})
export class RegisterTemplateComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm!:NgForm;
  user!: User 

  message!:string
  err!:string

  constructor( private usersDataService:UserDataServiceService) { }

  ngOnInit(): void {
    this.user = {
      name: "Adane",
      username: "Adane123",
      password: "123",
      passwordRepeat:"123"
    }
    setTimeout(() =>{
      this.registrationForm.setValue(this.user)

    })
  }

  onSubmit(){
 
    console.log("submitter");
    console.log("Values are ", this.registrationForm.value);
    console.log("User", this.user);
    
  }

  
  onClear(){
    this.registrationForm.resetForm();
   
   
  }
  onRegisterUser(){
    console.log("Values are ", this.registrationForm.value);

    //this.usersDataService.addUser(this.registrationForm.value).then(response => this.user = response)
    console.log("User", this.user);

    var user = {username: this.registrationForm.value.username, password:this.registrationForm.value.password }
    console.log(user);
    if(!this.registrationForm.value.username || !this.registrationForm.value.password){
        this.err = "Please add a username and password"
    }else{
        if(this.registrationForm.value.password !== this.registrationForm.value.passwordRepeat){
            this.err = "Please make sure the password matches"
        }else{

          this.usersDataService.addUser(this.registrationForm.value).then(response => {
            this.user = response
            this.message = "Successful registration"
            this.err = ""
          })            
        }
    }
    
  }


}

export class User {
  name!: string
  username!: string
  password!: string
  passwordRepeat!: string
}
