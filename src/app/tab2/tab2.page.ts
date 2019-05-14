import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {
  
  constructor(public _router: Router) { }

  enviarmsg(): void{
    this._router.navigate(['/enviarmsg'])

  }
  

}
  
