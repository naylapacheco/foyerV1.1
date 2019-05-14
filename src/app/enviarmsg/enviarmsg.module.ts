import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnviarmsgPage } from './enviarmsg.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarmsgPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnviarmsgPage]
})
export class EnviarmsgPageModule {}
