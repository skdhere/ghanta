import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-user-forgotpassword',
  templateUrl: 'user-forgotpassword.html',
})
export class UserForgotpassword {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserForgotpassword');
  }

  loginPage(){ 
    this.navCtrl.push('UserLogin');
     }
  
  signupPage(){ 
    this.navCtrl.setRoot('UserLogin');
    // this.navCtrl.push('UserLogin'); 
  }

}
