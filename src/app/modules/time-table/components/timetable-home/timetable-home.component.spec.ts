import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  syllabusForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the form group with a FormArray for courses
    this.syllabusForm = this.fb.group({
      courses: this.fb.array([])
    });

    // Populate the form array with courses based on the syllabus data
    this.populateCourses();
  }

  // Getter for FormArray of courses
  get courses(): FormArray {
    return this.syllabusForm.get('courses') as FormArray;
  }

  // Method to add a new course with a faculty FormArray
  addCourse(courseCode: string, courseName: string, L: number, T: number, P: number, credits: number): void {
    const courseForm = this.fb.group({
      courseCode: [courseCode, Validators.required],
      courseName: [courseName, Validators.required],
      L: [L, Validators.required],
      T: [T, Validators.required],
      P: [P, Validators.required],
      credits: [credits, Validators.required],
      facultyNames: this.fb.array([this.createFaculty()])  // Initialize with one faculty
    });
    this.courses.push(courseForm);
  }

  // Create a new faculty FormControl
  createFaculty(): FormGroup {
    return this.fb.group({
      facultyName: ['', Validators.required]
    });
  }

  // Method to add a new faculty to a specific course
  addFaculty(courseIndex: number): void {
    const faculties = this.courses.at(courseIndex).get('facultyNames') as FormArray;
    faculties.push(this.createFaculty());
  }

  // Getter for FormArray of faculty for a particular course
  getFacultyControls(courseIndex: number): FormArray {
    return this.courses.at(courseIndex).get('facultyNames') as FormArray;
  }

  // Populate courses from syllabus data
  populateCourses(): void {
    const syllabusCourses = [
      { courseCode: 'BSC101', courseName: 'Mathematics I', L: 3, T: 0, P: 0, credits: 3 },
      { courseCode: 'BSC102', courseName: 'Physics I', L: 3, T: 0, P: 0, credits: 3 },
      { courseCode: 'ESC101', courseName: 'Basic Electrical Engineering', L: 3, T: 0, P: 0, credits: 3 },
      { courseCode: 'ESC102', courseName: 'Engineering Mechanics', L: 3, T: 0, P: 0, credits: 3 },
      { courseCode: 'ESC103', courseName: 'Engineering Graphics and Computer Aided Engineering Graphics', L: 1, T: 0, P: 4, credits: 3 },
      { courseCode: 'HSC101', courseName: 'Professional Communication', L: 1, T: 1, P: 0, credits: 2 }
    ];

    syllabusCourses.forEach(course => {
      this.addCourse(course.courseCode, course.courseName, course.L, course.T, course.P, course.credits);
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    console.log('Form Submitted', this.syllabusForm.value);
    // Handle form submission (e.g., save data to the server)
  }
}
