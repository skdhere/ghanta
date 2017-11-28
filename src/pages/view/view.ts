import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, MenuController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
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
   mobile_number:any;
   results:any;
   total_amount:number=0;
   this_month:number=0;
   result:any;

   name:string="";
  

  constructor(public menu :MenuController,public network:Network,private viewCtrl:ViewController,private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadingCtrl: LoadingController) {
    this.result = this.navParams.get('result');
   
    this.mobile_number = this.result.mobile_no;
    this.name          = this.result.name;
    let today = new Date().toLocaleString();
    let d     = new Date().getDate();
    let m     = new Date().getMonth();
    let y     = new Date().getFullYear();
    today     = y+'-'+(m+1)+'-'+d;
    let fdate = y+'-'+(m+1)+'-01';

     this.sqlite.create({
          name: 'data.db',
          location: 'default'
          })
          .then((db: SQLiteObject) => {

            db.executeSql('select sum(amount) as amount from collection WHERE mobile_no=\''+this.mobile_number+'\'', {}).then((data) => {

             if(data.rows.length > 0)
              {
                for(var i = 0; i < data.rows.length; i++) 
                {
                  this.total_amount =this.total_amount + data.rows.item(i).amount;
               }
            }

              }, (err) => {
              alert('Unable to execute sql: '+JSON.stringify(err));
              });

              console.log('select sum(amount) as mamount from collection WHERE date >='+fdate+' AND mobile_no=\''+this.mobile_number+'\' ');
               db.executeSql('select sum(amount) as mamount from collection WHERE date >='+fdate+' AND mobile_no=\''+this.mobile_number+'\' ', {}).then((data) => {

              if(data.rows.length > 0)
               {
                for(var i = 0; i < data.rows.length; i++) 
                {
                  this.this_month =this.this_month + data.rows.item(i).mamount;
               }
            }

              }, (err) => {
              alert('Unable to execute sql: '+JSON.stringify(err));
              });

              


             db.executeSql("select * from collection WHERE mobile_no='"+this.mobile_number+"'", {}).then((data) => {
                 console.log(today);
                 console.log(data);
             this.results = [];
             if(data.rows.length > 0)
              {
                for(var i = 0; i < data.rows.length; i++) 
                {
                  console.log(data.rows.item(i));
                  this.results.push(data.rows.item(i));
                  //this.daily_col =this.daily_col + +data.rows.item(i).amount;
               }
            }

              }, (err) => {
              alert('Unable to execute sql: '+JSON.stringify(err));
              });

                 //end test

      })
      .catch(e => alert(JSON.stringify(e)));

  	let results1 =[{'amount':'50','mobile_no':'9405487216','server_id':'1','added_date':'11-12-2017'},
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
