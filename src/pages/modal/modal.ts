import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

collect:FormGroup;
today:any;
data:any
submitAttempt: boolean = false;


 constructor(private viewCtrl:ViewController,private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController,public toastCtrl: ToastController,  public formBuilder: FormBuilder,  public navParams: NavParams,private barcodeScanner: BarcodeScanner,public http:Http,public loadingCtrl: LoadingController,private datePicker: DatePicker) {

  	this.data = this.navParams.get('data');
  	console.log(this.navParams.get('data'));
  	this.today = new Date().toISOString();


  	this.collect = formBuilder.group({
      'fname' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'fcomment' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      'fmobile' : ['', Validators.compose([Validators.required, Validators.minLength(10) ,Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
      'fdate' : ['', Validators.required],
      'famount' : ['', Validators.compose([Validators.required, Validators.minLength(2) , Validators.pattern('^[0-9]+$')])]

    });

    let controls = this.collect.controls;
    controls['fdate'].setValue(this.today);
    controls['fname'].setValue(this.data.name);
    controls['fmobile'].setValue(this.data.mobile_no);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal()
  {
  	console.log('hiiiiiiiiiiiiii');
  	this.viewCtrl.dismiss();
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
   save()
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
           
          let tdate =controls['fdate'].value;
          tdate   = new Date(tdate).toLocaleString();
            let d     = new Date(tdate).getDate();
            let m     = new Date(tdate).getMonth();
            let y     = new Date(tdate).getFullYear();
            tdate     = y+'-'+m+'-'+d;
          console.log(tdate);
          this.sqlite.create({
          name: 'data.db',
          location: 'default'
          })
          .then((db: SQLiteObject) => {
           db.executeSql('INSERT INTO collection(name,mobile_no,amount,comment,ukey,date) VALUES(\''+controls['fname'].value+'\',\''+controls['fmobile'].value+'\',\''+controls['famount'].value+'\',\''+controls['fcomment'].value+'\',\'jbdjhbdffdg\',\''+tdate+'\')', [])
          .then(() =>this.savenexit())
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

    savenexit()
    {
    	this.showMessage('Record added successfully...!', 'toastcontainer',50000);
    	this.navCtrl.pop();
    }

}
