import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
const status = ['OPEN', 'IN_PROGRESS', 'COMPLETED']

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  tasks = [];
  taskAction: boolean = false
  taskForm: any;
  editTaskIndex: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [{
      title: 'New Task',
      description: 'New Task is created for the first time',
      status: 'OPENED',
      date: new Date()
    }];
  }

  addTaskToggle(taskAction = true) {
    this.taskAction = taskAction;
    this.editTaskIndex = null
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      date: [new Date()],
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      this.tasks.push(this.taskForm.value);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.addTaskToggle(false);
      alert('Task Saved Successfully');
    }
  }

  editTaskToggle(task, index) {
    if (task && index) {
      this.taskAction = true;
      this.editTaskIndex = index;
      this.taskForm = this.formBuilder.group(task)
    }
  }

  saveEditTask() {
    if (this.taskForm.valid) {
      this.tasks[this.editTaskIndex] = this.taskForm.value;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.addTaskToggle(false);
      alert('Task Saved Successfully');
    }
  }
}
