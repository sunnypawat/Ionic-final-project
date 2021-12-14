import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppProviderService } from '../app-provider.service';
import { Observable } from 'rxjs';
import { info } from '../models/app.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('barCanvas', {static: true}) private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas', {static: true}) private doughnutCanvas: ElementRef;
  @ViewChild('dateBarCanvas', {static: true}) private dateBarCanvas: ElementRef;

  allBarChart: any;
  allDoughnutChart: any;
  allDOBBarChart: any;

  public info$: Observable<any>;

  firstName: string = '';
  lastName: string = '';
  sex: number;
  faculty: string;
  date: string;
  selector: string;

  searchFirstName: string;
  searchLastName: string;

  allBarChartInfo = [];
  allDoughnutChartInfo = [];
  dobDoughnutChartInfo = [];


  constructor(private myProvider: AppProviderService) {
    Chart.register(...registerables)
  }

  ionViewDidEnter() {
    this.selector = "All";
    this.allBarChartMethod();
    this.allDoughnutChartMethod();
    this.dobChartMethod();
    this.myProvider.getStudentInfo(this.allBarChartInfo, this.allBarChart)
    this.myProvider.getStudentInfoByFaculty('All',this.allDoughnutChartInfo, this.dobDoughnutChartInfo, this.allDoughnutChart, this.allDOBBarChart);
    this.allBarChart.update();
    this.allDoughnutChart.update();
    this.allDOBBarChart.update();
  }

  updateFaculty() {
    this.myProvider.getStudentInfoByFaculty(this.selector,this.allDoughnutChartInfo, this.dobDoughnutChartInfo, this.allDoughnutChart, this.allDOBBarChart);
    this.allBarChart.update();
    this.allDoughnutChart.update();
    this.allDOBBarChart.update();
  }

  insertData() {
    let day = new Date(this.date).getDate() + '';
    let month = new Date(this.date).getMonth() + '';
    let year = new Date(this.date).getFullYear() + '';
    this.myProvider.insertInfo(this.firstName, this.lastName, day, month, year, this.sex + '', this.faculty);
    this.myProvider.getStudentInfo(this.allBarChartInfo, this.allBarChart);
    this.myProvider.getStudentInfoByFaculty(this.selector,this.allDoughnutChartInfo, this.dobDoughnutChartInfo, this.allDoughnutChart, this.allDOBBarChart);
  }

  getStudent() {
    this.info$ = this.myProvider.getName(this.searchFirstName, this.searchLastName);
  }

  allBarChartMethod() {
    this.allBarChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Architecture","Business","Cyber Security","Dentistry","Economics","Engineering","Laws","Medicine","Psychology","Science","Social Science","Sport Science"],
        datasets:[{
          label: '',
          data: this.allBarChartInfo,
          backgroundColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(254, 99, 132, 1)',
            'rgba(53, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(251, 159, 64, 1)',
            'rgba(250, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(240, 206, 86, 1)',
            'rgba(70, 192, 192, 1)',
            'rgba(225, 159, 64, 1)',
            'rgba(230, 99, 132, 1)'

          ]
        }]
      }
    })
  }

  allDoughnutChartMethod() {
    this.allDoughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female', 'Others'],
        datasets:[{
          label: '',
          data: this.allDoughnutChartInfo,
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)'
          ],
           hoverBackgroundColor: [
            '#36A2EB',
            '#FF6384',
            '#FFCE56'
          ]
        }]
      }
    })
  }

  dobChartMethod() {
    this.allDOBBarChart = new Chart(this.dateBarCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['0-10', '11-20', '21-30', '31-40', '41-50','51-60', '60+'],
        datasets:[{
          label: '',
          data: this.dobDoughnutChartInfo,
          backgroundColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(254, 99, 132, 1)',
            'rgba(53, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(251, 159, 64, 1)',
            'rgba(250, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(240, 206, 86, 1)',
            'rgba(70, 192, 192, 1)',
            'rgba(225, 159, 64, 1)',
            'rgba(230, 99, 132, 1)'

          ]
        }]
      }
    })
  }
}