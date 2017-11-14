import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController  } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the CollectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
})
export class CollectPage {

  data:any;
  today:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner,public http:Http,public loadingCtrl: LoadingController,private datePicker: DatePicker) {
  	this.data = {mobile:'',name:'',amount:'',date:'',type111:''};
    this.today = new Date().toISOString();
  }


 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');
  }



  scanBarcode()
  {

  	console.log('hi');
  	this.barcodeScanner.scan().then((barcodeData) => {
  	barcodeData['text'];
  	 this.data = {mobile:barcodeData['text']};
  	console.log(barcodeData['text']);
	 console.log(barcodeData);
	}, (err) => {
	    // An error occurred
	});
  }

  getDate()
  {

  	console.log(111111);	
  	this.datePicker.show({
		  date: new Date(),
		  mode: 'date',
		  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
		}).then(
		  date => console.log('Got date: ', date),

		  err => console.log('Error occurred while getting date: ', err)
		);
    
  }
  
  submit(data) {

    console.log(this.today);
    this.data = {date:this.today};
    console.log(data);
  		let loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 3000
	    });
	    loader.present();
        var link = 'https://planeteducate.com/camera.php';
        data = JSON.stringify({mobile: this.data.mobile});
        
        this.http.post(link, data)
        .subscribe(data => {
            this.data.response = data;
             this.navCtrl.setRoot('Dashboard');
        }, error => {
            console.log("Oooops!");

            this.navCtrl.setRoot('Dashboard');
        });
    }

}
