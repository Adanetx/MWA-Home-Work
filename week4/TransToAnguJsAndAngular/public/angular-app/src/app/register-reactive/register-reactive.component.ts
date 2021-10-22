import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {

  registerationForm!: FormGroup
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerationForm = this._formBuilder.group({
      name: ["Jack", Validators.required],
      username: ["Jack2021", [Validators.required, Validators.minLength(6)]],
      password: ["123", Validators.required],
      passwordRepeat: ["123", Validators.required]
    })
    // this.registerationForm= new FormGroup({
    //   name: new FormControl("Jack"),
    //   username: new FormControl("Jack2021"),
    //   password: new FormControl("123"),
    //   passwordRepeat: new FormControl("123")
    // })
  }

  onSubmit(): void{
    console.log("form Submitted");
    console.log("from username", this.registerationForm.value.username);
    console.log("form values", this.registerationForm.value);
    
    
    
  }

}
