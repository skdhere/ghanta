import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginpinPage } from './loginpin';

@NgModule({
  declarations: [
    LoginpinPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginpinPage),
  ],
  exports: [
    LoginpinPage
  ]
})
export class LoginpinPageModule {}
