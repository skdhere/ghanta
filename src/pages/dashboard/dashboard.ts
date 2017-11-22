import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  constructor(public menu:MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  collect()
  {
  	this.navCtrl.push('UserlistPage');
  }

  report()
  {
    this.navCtrl.push('ReportPage');
  }

  members()
  {
    this.navCtrl.push('MembersPage');
  }
  
  upload()
  {
    this.navCtrl.push('UploadPage');
  }
}
