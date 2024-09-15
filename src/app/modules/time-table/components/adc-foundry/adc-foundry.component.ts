import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-adc-foundry',
  templateUrl: './adc-foundry.component.html',
  styleUrls: ['./adc-foundry.component.scss']
})
export class AdcFoundryComponent implements OnInit {

  courseForm: FormGroup;

  ngOnInit(){
    
  }
  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      credits: [0, Validators.required],
      lectureHours: [0, Validators.required],
      tutorialHours: [0, Validators.required],
      practicalHours: [0, Validators.required],
      instructors: this.fb.array([this.createInstructor()])  // Initialize with one instructor
    });
  }

  // Create a new instructor form group
  createInstructor(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      load: [0, Validators.required]
    });
  }

  // Get the instructors as a FormArray
  get instructors(): FormArray {
    return this.courseForm.get('instructors') as FormArray;
  }

  // Add a new instructor
  addInstructor(): void {
    this.instructors.push(this.createInstructor());
  }

  // Remove an instructor
  removeInstructor(index: number): void {
    this.instructors.removeAt(index);
  }

  // Submit form
  onSubmit() {
    console.log(this.courseForm.value);
  }

}
