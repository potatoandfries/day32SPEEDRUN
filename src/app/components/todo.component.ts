import { Component, Input, OnInit, Output } from '@angular/core';
import { todo } from '../models';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  //use either 1.this or 2.Lower case inject or 3.use constructor(private fb:Formbuilder){}
  constructor(private fb:FormBuilder){}

  todoForm! : FormGroup

   // make form available
  ngOnInit(): void {
    //this.formgroup = this.creationmethod(this.input)
    this.todoForm = this.createForm();
  }
  

  @Output()
  Addtodo = new Subject<todo>();
  
  //difference between semantic vs synthetic validation
  private createForm(): FormGroup {
    return this.fb.group({
      text: this.fb.control('',[ Validators.minLength(5), Validators.required]),
      priority: this.fb.control('Low', Validators.required),
      due: this.fb.control('',[ Validators.required,this.futureDateValidator()])
    });
  }
  
  //                             IMPORTANT!!!!
  pressed() {
    // when clicked assign the form's value to an object
    const t  : todo = this.todoForm.value
    // when triggered> event is t
    this.Addtodo.next(t);
    // basically make a new form/needed for forms>>
    this.todoForm = this.createForm();
}

  // Custom Validation*** <<this is for the dates to not be in the future>>
    futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = new Date(control.value);
      const now = new Date();
      if (date < now) {
        return { 'futureDate': true };
      }
      return null;
  };
}
}

