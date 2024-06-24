import { Component } from '@angular/core';
declare var $: any;

@Component({
  // selector: 'app-root',
  selector: 'zainergy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zainergy';

  ngOnInit(): void {
    /* $(document).ready(function() {      
      $("body").removeClass("mat-typography");
    }); */
  }
}
