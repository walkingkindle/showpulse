import { Component, OnInit } from '@angular/core';
import { FindShowComponent } from '../../components/find-show/find-show.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../services/show/alert.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports:[FindShowComponent,HttpClientModule],
  standalone:true
})
export class SearchComponent implements OnInit {
  alerts:any[] = [];
  constructor(private alertService:AlertService) { }

  ngOnInit() {
    this.alertService.getAlerts().subscribe(alert => {
      if(alert) {
        this.showSweetAlert(alert);
      } else {
        // Clear existing alerts
        Swal.close();
      }
    });
  }

  showSweetAlert(alert: any) {
    Swal.fire({
      icon: alert.type === 'success' ? 'success' : 'error',
      title: alert.message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
}

