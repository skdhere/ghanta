import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the UserDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  id:any;
  collect: FormGroup;
  submitAttempt: boolean = false;
  constructor(private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController,public toastCtrl: ToastController,  public formBuilder: FormBuilder,  public navParams: NavParams,public loadingCtrl: LoadingController,private datePicker: DatePicker) {
  
  	this.id =this.navParams.get('id');
     

  	this.collect = formBuilder.group({
      'fname' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'fcomment' : ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      'fmobile' : ['', Validators.compose([Validators.required, Validators.minLength(10) ,Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
      'fdate' : ['', Validators.required],
      'famount' : ['', Validators.compose([Validators.required, Validators.minLength(2) , Validators.pattern('^[0-9]+$')])]

    });

    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }


  loadingShow()
  {
    let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000,
    dismissOnPageChange:true
    });
    loader.present();
  }

   loadData()
  {
      
      this.loadingShow();
      let controls = this.collect.controls;

      this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {

      db.executeSql("select * from collection where id='"+this.id+"'", {}).then((data) => {

      
      if(data.rows.length)
      {
      	controls['fname'].setValue(data.rows.item(0).name);
	      controls['fcomment'].setValue(data.rows.item(0).comment);
	      controls['fmobile'].setValue(data.rows.item(0).mobile_no);
	      controls['famount'].setValue(data.rows.item(0).amount);
	      controls['fdate'].setValue(data.rows.item(0).date);
      }
      
	  }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
      })
      .catch(e => alert(JSON.stringify(e)));
  }

  update()
  {
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
       db.executeSql('UPDATE collection SET name=\''+controls['fname'].value+'\',mobile_no=\''+controls['fmobile'].value+'\',amount=\''+controls['famount'].value+'\',comment=\''+controls['fcomment'].value+'\',ukey=\'jbdjhbdffdg\',date=\''+controls['fdate'].value+'\' WHERE id='+this.id+'', [])
      .then(() =>this.navCtrl.pop())
      .catch(e => console.log(e));
       })
      .catch(e => alert(JSON.stringify(e)));


      loading.dismiss();
      }else{
      // console.log('Validation error', this.coll.controls);
      console.log('Validation error', this.collect.controls);
      this.showMessage("Please fill valid data!", "toastcontainer", 100000);


    }
  }


  showMessage(message, style: string, dur?: number)
  {
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
}
