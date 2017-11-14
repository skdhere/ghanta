import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

// import { Dashboard } from '../dashboard/dashboard';
// import { UserSignup } from '../user-signup/user-signup';
// import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

    Credentials = {email:'',password:''}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }

  dashboardPage(){ this.navCtrl.push('Dashboard'); }
  signupPage(){ this.navCtrl.push('UserSignup'); }
  forgotPasswordPage(){ this.navCtrl.push('UserForgotpassword'); }

  login(credentials)
  {
    console.log(credentials);
    this.navCtrl.push('Dashboard');
  }

}
