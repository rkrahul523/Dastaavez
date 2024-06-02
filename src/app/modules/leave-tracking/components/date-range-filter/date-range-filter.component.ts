import { Component, OnInit } from '@angular/core';
import { IFilterAngularComp } from '@ag-grid-community/angular';
import { IFilterParams, IDoesFilterPassParams } from '@ag-grid-community/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss']
})
export class DateRangeFilterDakComponent implements IFilterAngularComp {
  params!: IFilterParams;
  keyName: string;
  hoveredDate: NgbDate | null = null;
  private hideFilter: Function;

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  agInit(params: IFilterParams | any): void {
    this.params = params;
    this.keyName = params.key;
  }

  isFilterActive(): boolean {
    return this.fromDate != null && this.toDate != null;
  }

  doesFilterPass(params: IDoesFilterPassParams | any): boolean {
    const keyValue = params.data[this.keyName];
    const testDate = new Date(this.getOnlyDate(keyValue));
    const fromDate = new Date(this.convertDateToString(this.fromDate));
    const toDate = new Date(this.convertDateToString(this.toDate));
    // const toDate=new Date('1/29/2023');
    // const testDate=new Date('1/29/2023');
    // if(testDate >= fromDate && testDate<=toDate){
    //   console.log("matched")
    // }
    return testDate >= fromDate && testDate <= toDate;
  }



  convertDateToString(date: NgbDate | any): string {
    const convertedString = `${date.month}/${date.day}/${date.year}`
    return convertedString;
  }

  showStringValue(date: NgbDate | any): string {
    const convertedString = `${date.month}/${date.day}/${date.year}`
    return convertedString;
  }

  getModel() {
    return 'filterText';
  }

  setModel(model: any) { }

  updateFilter() {
    this.params.filterChangedCallback();
  }

  getModelAsString() {
    return this.isFilterActive() ? `${this.showStringValue(this.fromDate)}-${this.showStringValue(this.toDate)}` : '----------'
  }


  getOnlyDate(field: any): string {
    const splittedField = field.split(',')[0];
    return splittedField;
  }





  constructor(calendar: NgbCalendar) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    // this.updateFilter();
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }



  afterGuiAttached(params: any) {
    this.hideFilter = params.hidePopup;
  }

  apply(): void {
    this.hideFilter();
    this.updateFilter();
  }
  clear(): void {
    this.fromDate= null;
    this.toDate= null;
    this.updateFilter();
  }


}