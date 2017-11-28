import { Component } from '@angular/core';
import { IonicPage,Platform, NavController,Nav, NavParams,LoadingController,AlertController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the MembersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {

  dummy_data:any;
  constructor(public nav:Nav,public platform:Platform, private sqlite: SQLite,private alertCtrl: AlertController,public network: Network,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
      

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

  viewDatail(result)
  {
    this.loadingShow();
    console.log(result);
  	this.navCtrl.push('ViewPage',{"result":result});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
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

}
