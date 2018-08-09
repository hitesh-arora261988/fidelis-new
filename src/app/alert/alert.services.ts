import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alerts } from './alert.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  alertsChanged = new Subject<Alerts[]>();
  private alerts: Alerts[];
  baseAPIUrl= 'http://localhost:4200/assets/alert.json';

  constructor(private http: HttpClient) {}

  getAlertsFromURL() {
    this.http.get<Alerts[]>(this.baseAPIUrl)
               .subscribe(
                  (alerts: Alerts[])=>{
                    this.setAlerts(alerts);
                  }
                );
  }

  setAlerts(alerts: Alerts[]) {
    this.alerts = alerts;
    this.alertsChanged.next(this.alerts.slice());
  }

  getAlert(index:number){
    for(var i=0;i< this.alerts.length; i++){
      if(this.alerts[i].AlertId == index){
        return this.alerts[i];
      }
    }
  }

}
