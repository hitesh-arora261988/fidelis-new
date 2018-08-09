import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { AlertService } from '../alert.services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alerts } from '../alert.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit, OnDestroy{
  alerts: Alerts[];
  subscription: Subscription;
  public searchString: string;
  page:number=1;
  itemsEachPage:number=10;
  constructor(private alertService: AlertService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit() { 
   this.subscription = this.alertService.alertsChanged
      .subscribe(
        (alerts: Alerts[]) => {
          this.alerts = alerts;
        }
      );

  }

  onAlertDetail(index:number){
     this.router.navigate(['/alerts', index], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pageChangeEvent($event){
    this.page = $event
  }

}
