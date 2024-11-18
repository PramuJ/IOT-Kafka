import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IotDataService {

  
  private tempUrl = "http://localhost:3000/iot/temperature";
  private humidityUrl = "http://localhost:3000/iot/humidity";
  private productCountUrl = "http://localhost:3000/iot/product";

  constructor(private http: HttpClient) { }

  
  getTempData(): Observable<any> {
    return this.http.get<any>(this.tempUrl);
  }

  getHumidityData(): Observable<any> {
    return this.http.get<any>(this.humidityUrl);
  }

  getProductCountData(): Observable<any> {
    return this.http.get<any>(this.productCountUrl);
  }
}
