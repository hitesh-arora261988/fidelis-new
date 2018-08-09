import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../alert.services';
import { Subscription } from 'rxjs';
import { Alerts } from '../alert.model';

@Component({
  selector: 'app-alerts-filter',
  templateUrl: './alerts-filter.component.html',
  styleUrls: ['./alerts-filter.component.css']
})
export class AlertsFilterComponent implements OnInit, OnDestroy {
  alerts: Alerts[];
  subscription: Subscription;
  public protocols=[];
  public protocolCount =[];
  public severity=[];
  public severityCount =[];
  public clientIp=[];
  public clientIpCount =[];
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.alertsChanged
      .subscribe(
        (alerts: Alerts[]) => {
          this.alerts = alerts;
          this.showProtocols();
          this.showSeverity();
          this.showClientIp();
        }
      );

  }

  showProtocols(){
    this.protocolCount =[];
  	for(var i=0; i<this.alerts.length; i++){
       if(this.protocols.indexOf(this.alerts[i].Protocol)<0){
        this.protocols.push(this.alerts[i].Protocol)
       }
    }

   for(var i=0;i<this.protocols.length;i++){
      var count=0;
       for(var j=0;j<this.alerts.length;j++){        
          if(this.alerts[j].Protocol==this.protocols[i]){
              count=count+1;
           }
        }    
        this.protocolCount.push(count);
     }
   
  }

  showSeverity(){
    this.severityCount =[];
    for(var i=0; i<this.alerts.length; i++){
       if(this.severity.indexOf(this.alerts[i].Severity)<0){
        this.severity.push(this.alerts[i].Severity)
       }
    }

   for(var i=0;i<this.severity.length;i++){
      var count=0;
       for(var j=0;j<this.alerts.length;j++){        
          if(this.alerts[j].Severity==this.severity[i]){
              count=count+1;
           }
        }    
        this.severityCount.push(count);
     }
   
  }

  showClientIp(){
    this.clientIpCount =[];
    for(var i=0; i<this.alerts.length; i++){
       if(this.clientIp.indexOf(this.alerts[i].ClientIP)<0){
        this.clientIp.push(this.alerts[i].ClientIP)
       }
    }

   for(var i=0;i<this.clientIp.length;i++){
      var count=0;
       for(var j=0;j<this.alerts.length;j++){        
          if(this.alerts[j].ClientIP==this.clientIp[i]){
              count=count+1;
           }
        }    
        this.clientIpCount.push(count);
     }
   

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  	

}
