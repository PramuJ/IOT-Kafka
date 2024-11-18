import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetComponent {
  @Input() title!: string;
  @Input() minAvg!: number;  
  @Input() hrAvg!: number;   
  @Input() max!: number;     
  @Input() unit: string = ''; 
}
