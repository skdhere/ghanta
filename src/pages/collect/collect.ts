import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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

  collect: FormGroup;
  submitAttempt: boolean = false;
  
  username:any;
  mobile:any;
  amount:any;
  comment:any;
  items:any;

  constructor(private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController,public toastCtrl: ToastController,  public formBuilder: FormBuilder,  public navParams: NavParams,private barcodeScanner: BarcodeScanner,public http:Http,public loadingCtrl: LoadingController,private datePicker: DatePicker) {
  	this.data = {mobile:'',name:'',amount:'',date:'',type111:''};
    this.today = new Date().toISOString();

      this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS usernameList(id INTEGER PRIMARY KEY AUTOINCREMENT,name,mobile_no,amount,comment,ukey,date)', {})
      .then(() => console.log('done'))
      .catch(e => console.log(e));

      //data insert section
      // db.executeSql('INSERT INTO usernameList(name) VALUES(\''+this.username+'\')', [])
      // .then(() => alert('Executed SQL'))
      // .catch(e => console.log(e));
      })
      .catch(e => alert(JSON.stringify(e)));
   

    this.collect = formBuilder.group({
      'fname' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'fcomment' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      'fmobile' : ['', Validators.compose([Validators.required, Validators.minLength(10) ,Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
      'fdate' : ['', Validators.required],
      'famount' : ['', Validators.compose([Validators.required, Validators.minLength(2) , Validators.pattern('^[0-9]+$')])]

    });

    let controls = this.collect.controls;
    controls['fdate'].setValue(this.today);
  }


 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');
  }

   ionViewWillLeave() {
     let loading = this.loadingCtrl;

    console.log("Looks like I'm about to leave :(");
  }

  scanBarcode()
  {

  	console.log('hi');
  	this.barcodeScanner.scan().then((barcodeData) => {
  	barcodeData['text'];
    let controls = this.collect.controls;
    controls['fmobile'].setValue(barcodeData['text']);
  	// this.data = {mobile:barcodeData['text']};
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
	      duration: 3000,
        dismissOnPageChange:true
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

    showMessage(message, style: string, dur?: number){
    const toast = this.toastCtrl.create({
        message: message,
        showCloseButton: true,
        duration: dur || 300,
        closeButtonText: 'Ok',
        cssClass: style,
        dismissOnPageChange: true
      });

      toast.present();
  }


    save(){

    this.submitAttempt = true;
    if (this.collect.valid) {

      let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange:true,
          duration: 3000
      });
      loading.present();

      let controls = this.collect.controls;
       
      this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
       db.executeSql('INSERT INTO usernameList(name,mobile_no,amount,comment,ukey,date) VALUES(\''+controls['fname'].value+'\',\''+controls['fmobile'].value+'\',\''+controls['famount'].value+'\',\''+controls['fcomment'].value+'\',\'jbdjhbdffdg\',\''+controls['fdate'].value+'\')', [])
      .then(() =>this.navCtrl.setRoot('Dashboard'))
      .catch(e => console.log(e));
       })
      .catch(e => alert(JSON.stringify(e)));


      loading.dismiss();
      

      
      // if(this.addNew){
      //   //do post request
      //   this.api.post('kyc_coll', this.coll.value)
      //   .map(res => res.json())
      //   .subscribe(data => {
          
      //     if(data.success){    
      //       this.showMessage("Saved successfully!", "success");
      //     }
      //       loading.dismiss();

      //   }, err => {
      //     console.log(err);
      //     this.showMessage("Data not updated, please try again!", "danger");
      //       loading.dismiss();
      //   });
      // }
      // else{
      //   //do put request
      //   this.api.put('kyc_coll', this.coll.value)
      //   .map(res => res.json())
      //   .subscribe(data => {
      //       this.showMessage("Saved successfully!", "success");
      //       loading.dismiss();
      //   }, err => {
      //     console.log(err);
      //     this.showMessage("Data not updated, please try again!", "danger");
      //       loading.dismiss();
      //   });
      // }

     
    }else{
      // console.log('Validation error', this.coll.controls);
      console.log('Validation error', this.collect.controls);
      this.showMessage("Please fill valid data!", "toastcontainer", 100000);


    }
  }

}
