import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgSwitch, NgSwitchCase, NgFor, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  taskName: string = '';
  taskPriority: string = 'High';
  taskDueDate: string = '';
  tasks: any[] = [];
  filter: string = 'all';

  addTask(
    nameRef: HTMLInputElement,
    priorityRef: HTMLSelectElement,
    dueDateRef: HTMLInputElement
  ) {
    if (this.taskName && this.taskPriority && this.taskDueDate) {
      this.tasks.push({
        name: this.taskName,
        priority: this.taskPriority,
        dueDate: this.taskDueDate,
        completed: false,
      });

      this.taskName = '';
      this.taskPriority = 'High';
      this.taskDueDate = '';

      nameRef.value = '';
      priorityRef.value = 'High';
      dueDateRef.value = '';
    }
  }

  toggleStatus(task: any) {
    task.completed = !task.completed;
  }

  isOverdue(task: any): boolean {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate < today && !task.completed;
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'high';
      case 'Medium':
        return 'medium';
      case 'Low':
        return 'low';
      default:
        return '';
    }
  }

  getFilteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter((t) => t.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter((t) => !t.completed);
    }
    return this.tasks;
  }

  getSummary() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }
}
