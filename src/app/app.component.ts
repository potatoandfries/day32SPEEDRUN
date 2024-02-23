import { Component } from '@angular/core';
import { todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'd32workshop';
  //special case cause of date;
  task: todo[] = [    { text: 'clean', priority: 'High', due: new Date() }];

  pressed(event:any){
    //confusing but yeah inside a task> is a property called list >task[]
    console.log(event);
    this.task.push(event);
  }    

}
