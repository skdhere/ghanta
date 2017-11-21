import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { Network } from '@ionic-native/network';

// import { Dashboard } from '../dashboard/dashboard';
// import { UserSignup } from '../user-signup/user-signup';
// import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {


  constructor(public navCtrl: NavController, public network: Network, public navParams: NavParams) {


        // watch network for a disconnect
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
          console.log('network was disconnected :-(');

          alert('offline');
        });

        // stop disconnect watch
        disconnectSubscription.unsubscribe();
  }

    Credentials = {email:'dd',password:'dd'}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }

  dashboardPage(){ this.navCtrl.push('Dashboard'); }
  signupPage(){ this.navCtrl.push('UserSignup'); }
  forgotPasswordPage(){ this.navCtrl.push('UserForgotpassword'); }

  login(credentials)
  {

     // watch network for a connection
        let connectSubscription = this.network.onConnect().subscribe(() => {
          console.log('network connected!');
           alert('online');
          // We just got a connection but we need to wait briefly
           // before we determine the connection type. Might need to wait.
          // prior to doing any api requests as well.
          setTimeout(() => {
            if (this.network.type === 'wifi') {
              console.log('we got a wifi connection, woohoo!');
            }
          }, 3000);
        });

        // stop connect watch
        connectSubscription.unsubscribe();
    console.log(credentials);
    this.navCtrl.push('LoginpinPage');
  }


  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

}
