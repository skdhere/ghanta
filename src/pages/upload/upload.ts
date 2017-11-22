import { Component } from '@angular/core';
import { IonicPage,Platform, NavController,Nav, NavParams,LoadingController,AlertController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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
 // @ViewChild(Nav) nav: Nav;
  items:any;
  results:any;
  isOnline:boolean=false;
  alert:any;
  constructor(public nav:Nav,public platform:Platform, private sqlite: SQLite,private alertCtrl: AlertController,public network: Network,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
 
    let type = this.network.type;

     this.platform.registerBackButtonAction(() => {
       this.alert.dismiss();
       if(this.nav.canGoBack())
                {
                  this.nav.pop();
                }
                else{
                  if(this.alert())
                  {
                    this.alert.dismiss();
                  }
                }
     });
    
    
    this.results =[];
   // this.results=[{id: 1, name: "Satish", mobile_no: "9405487216", amount: "34", comment: "Fbh"},{id: 2, name: "amol", mobile_no: "1548547852", amount: "10", comment: "Fbh"}];
      
     if(type == "unknown" || type == "none" || type == undefined){
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

      this.loadData();

  }

  loadData()
  {
      this.results =[];
      this.loadingShow();

      this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {

      db.executeSql('select * from collection', {}).then((data) => {

      
      this.items = [];
      if(data.rows.length > 0) {
      for(var i = 0; i < data.rows.length; i++) {
      
      this.items.push({name: data.rows.item(i).name});
      this.results.push(data.rows.item(i));
      
      }

      console.log(this.results);
      }

      }, (err) => {
      alert('Unable to execute sql: '+JSON.stringify(err));
      });
      })
      .catch(e => alert(JSON.stringify(e)));
  }


  viewRecord(id)
  {
    this.navCtrl.push('UserDetailPage',{id:id});
  }

  deleteRecord(id)
  {
      this.alert = this.alertCtrl.create({
        title: 'Confirm...!',
        subTitle: 'Are you sure want to delete.', 
        enableBackdropDismiss:false,
        buttons: [{
          text:'Cancel',
          role:'cancel',
          handler:()=>
          {
            
          }
        },{
          text:'Delete',
          handler:()=>
          {
            this.delete(id);
          }
        }
        ],

      });
      this.alert.present();
  }


 delete(id)
 {
   this.loadingShow();

    this.sqlite.create({
    name: 'data.db',
    location: 'default'
    })
    .then((db: SQLiteObject) => {

    db.executeSql('DELETE  from usernameList WHERE id="'+id+'"', {}).then((data) => {}
    , (err) => {
    alert('Unable to execute sql: '+JSON.stringify(err));
    });
    })
    .catch(e => alert(JSON.stringify(e)));

    this.loadData();
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
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

   

  uploadData()
  {

    if(this.isOnline)
     {
       this.loadingShow();
     }
     else{

       let alert = this.alertCtrl.create({
        title: 'Network Error...!',
        subTitle: 'Please enable data connection.', 
        enableBackdropDismiss:false,
        buttons: ['Dismiss'],

      });
      alert.present();
    }
  }

}
