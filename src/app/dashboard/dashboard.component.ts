import { Component, OnInit } from '@angular/core';
import{HttpClient,HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data:any;
  errorMessage: string;
  stationName: string;
  constructor(private http:HttpClient, private dataService: DataService) { }

  ngOnInit() {
    


}
  getData(station_name){
    
    this.errorMessage=''
    this.data=''
    this.stationName=station_name
    this.dataService.callService(station_name).subscribe((data: any) => {
      console.log('JSON : ' + JSON.stringify(data));
      this.data =  data;
    },(err)=>{
      console.log('ON error: ' + err);
      this.errorMessage=err});
  }
 
}
