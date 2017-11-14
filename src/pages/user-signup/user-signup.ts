import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignup {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  dashboardPage(){ this.navCtrl.push('Dashboard'); }
  loginPage(){

    this.navCtrl.setRoot('UserLogin');

 }
  forgotPasswordPage(){ this.navCtrl.push('UserForgotpassword');}

}
