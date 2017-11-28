import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, MenuController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {

  loginflag:number=0;
  Credentials:any;
  isOnline:boolean=false;
  type:boolean=false;
  page_title:string;
  submitAttempt:boolean=false;
  collect:FormGroup;
  constructor(public menu :MenuController,
              public network:Network,
              private viewCtrl:ViewController,
              private alertCtrl: AlertController,
              private sqlite: SQLite,
              public navCtrl: NavController,
              public toastCtrl: ToastController, 
              public formBuilder: FormBuilder, 
              public navParams: NavParams,
              public http:Http,
              public loadingCtrl: LoadingController) {
    
    this.Credentials = {email:'dd',password:'dd'}

    this.menu.enable(false);

    //=======================To start network check===================//
      let type =this.network.type;
      if(type == "unknown" || type == "none" || type == undefined)
      {
        this.isOnline = false;
      }else{
        this.isOnline = true;
      }

      this.network.onDisconnect().subscribe( () => {
          this.isOnline = false;
      });

      this.network.onConnect().subscribe( () => {
          this.isOnline = true;
        });
    //======================end Network====================================//

      //=========================start form validation===============================//
        this.Credentials = {email:'dd',password:'dd'};
        this.collect = formBuilder.group({
        'pin' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('^[0-9]+$'), Validators.required])],
        'cpin' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('^[0-9]+$')])],
        });

      //================================End form validation==/////////////////////////

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
          this.loginflag=2;
          this.page_title="Login";
        }

        }, (err) => {
        alert('Unable to execute sql: '+JSON.stringify(err));
        });
      })
      .catch(e => alert(JSON.stringify(e)));
       
  }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }

  dashboardPage(){ this.navCtrl.push('Dashboard'); }
  signupPage(){ this.navCtrl.push('UserSignup'); }
  forgotPasswordPage(){ this.navCtrl.push('UserForgotpassword'); }

  login(credentials)
  {

    if(this.isOnline)
    {
      console.log(credentials);
      this.loginflag=1;
    }
    else{
        alert('Network error...');
    }
    
  }


  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

  setPin()
  {
    this.submitAttempt = true;
    
    
    if (this.collect.valid) 
    {
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
      .then(() =>this.loginflag=2)
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

  pincheck(pin)
  {
    let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange:true,
          duration: 3000
      });
      loading.present();

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
    if(data.rows.length > 0) {
        this.navCtrl.setRoot('Dashboard');
      }
      else{

        alert('Incorrect Pin...!');
        loading.dismiss();
      }

      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
      })
      .catch(e => alert(JSON.stringify(e)));
  }

}
