import { Component, OnInit } from '@angular/core';
import { syllabus } from '../../model/syllabuscontent';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DocGeneratorService } from '../../services/docs-api.service';
import { ExcelGeneratorService } from '../../services/excel-generator.service';
import { ADC_FOUNDRY_SEM_1 } from '../../model/adc';
import { employeeList } from 'src/app/modules/leave-tracking/model/employee-list';

@Component({
  selector: 'app-timetable-home',
  templateUrl: './timetable-home.component.html',
  styleUrls: ['./timetable-home.component.scss']
})
export class TimetableHomeComponent implements OnInit {

  syllabusForm: FormGroup;
  names=employeeList;

  constructor(private fb: FormBuilder,private doc:DocGeneratorService, private excelGeneratorService: ExcelGeneratorService) {}

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
      facultyName: ['', Validators.required],
      facultyLoad: ['', Validators.required],
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

  removeInstructor(courseIndex: number, index: number): void {
   this.getFacultyControls(courseIndex).removeAt(index);
  }

  // Populate courses from syllabus data
  populateCourses(): void {
    const syllabusCourses = ADC_FOUNDRY_SEM_1

    syllabusCourses.forEach(course => {
      this.addCourse(course.courseCode, course.courseName, course.L, course.T, course.P, course.credits);
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    console.log('Form Submitted', this.syllabusForm.value);
    // Handle form submission (e.g., save data to the server)
  }

  // gen(){
  //  this.doc.generateDocument({name:"ll"})
  // }

  async gen() {
    try {
      await this.doc.generateAndSaveDocument();
    } catch (error) {
      console.error('Failed to generate or save document:', error);
    }
  }

  onGenerateExcel() {
    this.excelGeneratorService.generateAndSaveExcel();
  }

}
