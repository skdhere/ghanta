import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the LoginpinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loginpin',
  templateUrl: 'loginpin.html',
})
export class LoginpinPage {
  Credentials:any;
  collect:FormGroup;
  submitAttempt:boolean=false;
  isSetPin:boolean=false;
  page_title:string="Set Login Pin";
   constructor(private viewCtrl:ViewController,private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController,public toastCtrl: ToastController,  public formBuilder: FormBuilder,  public navParams: NavParams,public http:Http,public loadingCtrl: LoadingController,private datePicker: DatePicker) {
  	this.Credentials = {email:'dd',password:'dd'};
  		this.collect = formBuilder.group({
      'pin' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('^[0-9]+$'), Validators.required])],
      'cpin' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('^[0-9]+$')])],
      });

  	  this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS loginPin(id INTEGER PRIMARY KEY AUTOINCREMENT,pin,mobile)', {})
      .then(() => console.log('done'))
      .catch(e => console.log(e));

       db.executeSql('select * from loginPin', {}).then((data) => {
		if(data.rows.length > 0) {
     	 this.isSetPin=true;
     	 this.page_title="Login";
      }

      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
      })
      .catch(e => alert(JSON.stringify(e)));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpinPage');
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

  setPin()
  {
  	this.submitAttempt = true;
  	this.isSetPin=true;
  	console.log(this.isSetPin);
    if (this.collect.valid) 
    {
    	this.isSetPin=true;

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
       db.executeSql('INSERT INTO loginPin(pin,mobile) VALUES(\''+controls['pin'].value+'\',\'9405487116\')', [])
      .then(() =>this.navCtrl.setRoot('LoginpinPage'))
      .catch(e => console.log(e));
       })
      .catch(e => alert(JSON.stringify(e)));


      loading.dismiss();
  
    }else
    {
      // console.log('Validation error', this.coll.controls);
      console.log('Validation error', this.collect.controls);
      this.showMessage("Please fill valid data!", "toastcontainer", 100000);
    }
  }

  login(pin)
  {

  	console.log(pin);
  	  this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS loginPin(id INTEGER PRIMARY KEY AUTOINCREMENT,pin,mobile)', {})
      .then(() => console.log('done'))
      .catch(e => console.log(e));

      db.executeSql('select * from loginPin WHERE pin=\''+pin+'\'', {}).then((data) => {
       	console.log(data.rows.length);
       	console.log(data);
		if(data.rows.length > 0) {
     	 console.log(data);
      }

      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
     
      
       db.executeSql('select * from loginPin WHERE pin=\''+pin+'\'', {}).then((data) => {
       	console.log(data.rows.length);
		if(data.rows.length > 0) {
     	 this.navCtrl.setRoot('Dashboard');
      }

      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
      })
      .catch(e => alert(JSON.stringify(e)));
  }
}
