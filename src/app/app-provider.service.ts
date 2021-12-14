import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { info } from '../app/models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppProviderService {
  private url = 'http://ea77-34-75-235-213.ngrok.io';
  constructor(private http: HttpClient) {
    console.log('Create Data Provider');
  }
  //important
  insertInfo(firstName:string, lastName:string, day:string, month:string, year:string, sex:string, faculty:string) {
    console.log(this.url + '/insert?firstname=' + firstName + '&lastname=' + lastName + '&day=' + day + '&month=' + month + '&year=' + year + '&sex=' + sex + '&faculty=' + faculty)
    this.http.get(this.url + '/insert?firstname=' + firstName + '&lastname=' + lastName + '&day=' + day + '&month=' + month + '&year=' + year + '&sex=' + sex + '&faculty=' + faculty).subscribe(data => {
      console.log(data)
    });
  }

  //important
  getName(firstName, lastName) {
    if (firstName == undefined) {
      firstName = '';
    }
    if (lastName == undefined) {
      lastName = '';
    }
    console.log(this.url + '/getstudentbyname?firstname=' + firstName + '&lastname=' + lastName);
    return this.http.get(this.url + '/getstudentbyname?firstname=' + firstName + '&lastname=' + lastName);
  }

  getData(dataList, chart) {
    this.http.get(this.url + '/getall').subscribe(data =>
    {
      for(let i=0; i<data['data'].length; i++) {
        console.log(data['data'][i])
        dataList.push(data['data'][i])
      }
    }
    )
    chart.update(0);
  }

  getFaculty(faculty, dataList, event, chart) {
    this.http.get(this.url + '/getfaculty?faculty=' + faculty).subscribe(data =>
      {
        for(let i=0; i<data['data'].length; i++) {
          console.log(data['data'][i])
          dataList.push(data['data'][i])
        }
      }
      )
    if(faculty != 0) {
        event.target.complete();
    }
    chart.update(0);
  }

  getSex(sex, dataList, event, chart){
    this.http.get(this.url + '/getsex?sex=' + sex).subscribe(data =>
      {
        for(let i=0; i<data['data'].length; i++) {
          console.log(data['data'][i])
          dataList.push(data['data'][i])
        }
      }
      )
    if(sex != 0) {
        event.target.complete();
    }
    chart.update(0);
  }

  getage(minage, maxage, dataList, event, chart){
    this.http.get(this.url + '/getage?minage=' + minage + '&maxage=' + maxage).subscribe(data =>
      {
        for(let i=0; i<data['data'].length; i++) {
          console.log(data['data'][i])
          dataList.push(data['data'][i])
        }
      }
      )
    if(minage != 0 && maxage != 0) {
        event.target.complete();
    }
    chart.update(0);
  }
  //important
  getStudentInfo(dataList, chart) {
    let labels = ["Architecture","Business","Cyber Security","Dentistry","Economics","Engineering","Laws","Medicine","Psychology","Science","Social Science","Sport Science"]
    this.http.get(this.url + '/getinfo').subscribe(data =>{
      for(let i=0; i<labels.length; i++) {
        dataList[i] = data['data'][0]['faculty'][labels[i]];
      }
      chart.update(); 
    }
    )
  }
  // important
  getStudentInfoByFaculty(faculty, sexdataList, agedataList, sexchart, agechart) {
    let labels = ['0', '1', '2']
    let ageLabels = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '60+']
    if (faculty == 'All') {
      this.http.get(this.url + '/getinfo').subscribe(data => {
        for(let i=0; i<ageLabels.length; i++) {
          agedataList[i] = data['data'][0]['age'][ageLabels[i]]
        }
        for(let i=0; i<labels.length; i++) {
          sexdataList[i] = data['data'][0]['sex'][labels[i]];
        }
        sexchart.update();
        agechart.update();
      })
    } else {
      this.http.get(this.url + '/getinfobyfaculty?faculty=' + faculty).subscribe(data => {
        for(let i=0; i<ageLabels.length; i++) {
          agedataList[i] = data['data'][0]['age'][ageLabels[i]]
        }
        for(let i=0; i<labels.length; i++) {
          sexdataList[i] = data['data'][0]['sex'][labels[i]]
        }
        sexchart.update();
        agechart.update();
      })
    } 
    
  }

}
