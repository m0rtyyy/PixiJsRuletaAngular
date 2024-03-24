import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DATA';

  constructor(private translate:TranslateService,
              private primengConfig: PrimeNGConfig
              ) {}

ngOnInit() {
// Traductor
this.translate.setDefaultLang('es');
this.translate.use('es');
// ------------------

// PrimeNG
this.primengConfig.ripple = true;  

this.translate.stream('primeng').subscribe(data => {
this.primengConfig.setTranslation(data);      
});
// ------------------
}
}
