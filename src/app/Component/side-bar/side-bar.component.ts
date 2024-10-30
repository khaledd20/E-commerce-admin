import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChoosenDisplay } from 'src/app/ViewModels/choosenDisplay.enum';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  showItem: ChoosenDisplay = 1
  constructor() {
  }

  ngOnInit(): void {
  }

}
