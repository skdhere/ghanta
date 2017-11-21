import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ModalPage } from '../modal/'

/**
 * Generated class for the UserlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {

	dummy_data:any;
	results:any;
  constructor(public modal:ModalController,private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController,public toastCtrl: ToastController,  public formBuilder: FormBuilder,  public navParams: NavParams,private barcodeScanner: BarcodeScanner,public http:Http,public loadingCtrl: LoadingController,private datePicker: DatePicker) {
  
     
  	  this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {

      //create table section
      db.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name,mobile_no,server_id,added_date)', {})
      .then(() => console.log('done'))
      .catch(e => console.log(e));

      db.executeSql('select * from usernameList', {}).then((data) => {

      
      if(data.rows.length == 0)
      {
     	 for(var i = 0; i < this.dummy_data.length; i++) 
     	 {
     	 	  db.executeSql('INSERT INTO users(name,mobile_no,server_id,added_date) VALUES(\''+this.dummy_data[i]['name']+'\',\''+this.dummy_data[i]['mobile_no']+'\',\''+this.dummy_data[i]['server_id']+'\',\''+this.dummy_data[i]['added_date']+'\')', [])
		      .then(() =>this.navCtrl.setRoot('Dashboard'))
		      .catch(e => console.log(e));
         }	
         
         console.log('hiiiiiiiiiii');
      }

      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });

      db.executeSql('CREATE TABLE IF NOT EXISTS usernameList(id INTEGER PRIMARY KEY AUTOINCREMENT,name,mobile_no,amount,comment,ukey,date)', {})
      .then(() => console.log('done'))
      .catch(e => console.log(e));



      })
      .catch(e => alert(JSON.stringify(e)));

      this.initializeItems();
      this.loadingShow();


  }
    initializeItems()
    {
    	 this.dummy_data =[{'name':'Satish','mobile_no':'9405487216','server_id':'1','added_date':'11-12-2017'},
      {'name':'Yash','mobile_no':'9820828265','server_id':'2','added_date':'11-12-2017'},
      {'name':'Pradnyesh','mobile_no':'8779281290','server_id':'3','added_date':'11-12-2017'},
      {'name':'Prathmesh','mobile_no':'1254789630','server_id':'4','added_date':'11-12-2017'},
      {'name':'Akash','mobile_no':'9405487216','server_id':'5','added_date':'11-12-2017'},
      {'name':'Amol','mobile_no':'9405487216','server_id':'6','added_date':'11-12-2017'},
      {'name':'Akshay','mobile_no':'9405487216','server_id':'7','added_date':'11-12-2017'},
      {'name':'Shubham','mobile_no':'9405487216','server_id':'8','added_date':'11-12-2017'},
      {'name':'Anil','mobile_no':'9405487216','server_id':'9','added_date':'11-12-2017'},
      {'name':'Aditya','mobile_no':'9405487216','server_id':'10','added_date':'11-12-2017'},
      {'name':'Meeran','mobile_no':'9405487216','server_id':'11','added_date':'11-12-2017'},
      {'name':'Ejaz','mobile_no':'9405487216','server_id':'12','added_date':'11-12-2017'},

      					];
    }


      getItems(ev: any) {
    // Reset items back to all of the items
   // this.initializeItems();
   	this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    console.log(val);
    if (val && val.trim() != '') {
      this.dummy_data = this.dummy_data.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.mobile_no.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserlistPage');
  }


  collect(data)
  {
  	this.loadingShow();
  	let modal = this.modal.create('ModalPage',{'data':data});
    modal.present();
    this.initializeItems();
  }

  loadingShow()
  {
  	let loading = this.loadingCtrl.create({
              content: 'Please wait...',
              dismissOnPageChange:true,
              duration: 3000
          });
          loading.present();
  }

}
