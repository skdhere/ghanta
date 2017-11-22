import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
   dummy_data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  	this.dummy_data =[{'amount':'50','mobile_no':'9405487216','server_id':'1','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9820828265','server_id':'2','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'8779281290','server_id':'3','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'1254789630','server_id':'4','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'5','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'6','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'7','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'8','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'9','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'10','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'11','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'12','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9820828265','server_id':'2','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'8779281290','server_id':'3','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'1254789630','server_id':'4','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'5','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'6','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'7','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'8','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'9','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'10','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'11','added_date':'11-12-2017'},
      {'amount':'50','mobile_no':'9405487216','server_id':'12','added_date':'11-12-2017'},

      					];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }

}
