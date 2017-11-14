import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

/**
 * Generated class for the UploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadData()
  {
  	let loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 3000
	    });
	    loader.present();
  }

}
