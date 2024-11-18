import { ApplicationRef, ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { WidgetComponent } from '../widgets/widgets.component';
import { IotDataService } from '../services/iot-data.service';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  
})
export class DashboardComponent {

  constructor(private iotDataService: IotDataService, private applicationRef: ApplicationRef, private ngZone : NgZone) {}
 
  temperature: any = {};
  humidity: any = {};
  productCount: any = {};
  isLoading: boolean = true;

  private intervalId?: any;

  ngOnInit(): void {
    console.log("on init")
    this.fetchTemperature();
    this.fetchHumidity();
    this.fetchProductCount();

    // this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
    //   setInterval(() => {
    //       this.fetchTemperature();
    //       this.fetchHumidity();
    //     this.fetchProductCount();
    //     }, 15000);
    // });

    // this.ngZone.runOutsideAngular(() => {
    //   this.intervalId = setInterval(() => {
    //     this.fetchTemperature();
    //     this.fetchHumidity();
    //     this.fetchProductCount();
    //   }, 15000);
    // })

    //https://angular.dev/errors/NG0506#running-code-after-an-application-becomes-stable

    this.intervalId = setInterval(() => {
      this.fetchTemperature();
      this.fetchHumidity();
      this.fetchProductCount();
    }, 15000); // 15000 ms = 15 seconds
  
    
  }

  ngOnDestroy(): void {
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchTemperature(): void {
    this.iotDataService.getTempData().subscribe(
      (data) => {
        this.temperature = data; 
        this.isLoading = false;
      },
      (error) => console.error('Error fetching temperature data', error)
    );
  }

  fetchHumidity(): void {
    this.iotDataService.getHumidityData().subscribe(
      (data) => {
        this.humidity = data
        this.isLoading = false;
      },
      (error) => console.error('Error fetching humidity data', error)
    );
  }

  fetchProductCount(): void {
    this.iotDataService.getProductCountData().subscribe(
      (data) => {
        this.productCount = data 
        this.isLoading = false;
      },
      (error) => console.error('Error fetching product count data', error)
    );
  }

}


