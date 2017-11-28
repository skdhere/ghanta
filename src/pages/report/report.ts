import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  total_col:number=0;
  monthly_col:number=0;
  daily_col:number=0;
  constructor(private alertCtrl: AlertController,private sqlite: SQLite,public navCtrl: NavController,  public navParams: NavParams,public http:Http,public loadingCtrl: LoadingController) {
  
  		let today = new Date().toLocaleString();
  		let d     = new Date().getDate();
  		let m     = new Date().getMonth();
  		let y     = new Date().getFullYear();
  		today     = y+'-'+(m+1)+'-'+d;
  		let fdate = y+'-'+(m+1)+'-01';
  		//tdate   = new Date(tdate).toLocaleString();
  		//=======================================Start Database=========================================//
  		this.sqlite.create({
		      name: 'data.db',
		      location: 'default'
		      })
		      .then((db: SQLiteObject) => {

	  		    db.executeSql('select sum(amount) as amount from collection', {}).then((data) => {

	    		   if(data.rows.length > 0)
	     		   {
	      				for(var i = 0; i < data.rows.length; i++) 
	      				{
	      					this.total_col =this.total_col + data.rows.item(i).amount;
	     				}
		    		}

		     		 }, (err) => {
		     		 alert('Unable to execute sql: '+JSON.stringify(err));
		     		 });

	  		    	console.log('select sum(amount) as mamount from collection WHERE date >='+fdate+' ');
	  		    	 db.executeSql('select sum(amount) as mamount from collection WHERE date >='+fdate+' ', {}).then((data) => {

	    		   if(data.rows.length > 0)
	     		   {
	      				for(var i = 0; i < data.rows.length; i++) 
	      				{
	      					this.monthly_col =this.monthly_col + data.rows.item(i).mamount;
	     				}
		    		}

		     		 }, (err) => {
		     		 alert('Unable to execute sql: '+JSON.stringify(err));
		     		 });


 	
	  		       db.executeSql("select * from collection where date = '"+today+"' ", {}).then((data) => {
	  		       	console.log(today);
	  		      
	  		       	console.log(data);
	    		   if(data.rows.length > 0)
	     		   {
	      				for(var i = 0; i < data.rows.length; i++) 
	      				{
	      					this.daily_col =this.daily_col + +data.rows.item(i).amount;
	     				}
		    		}

		     		 }, (err) => {
		     		 alert('Unable to execute sql: '+JSON.stringify(err));
		     		 });

						///test
	  		       	db.executeSql("select * from collection ", {}).then((data) => {
	  		       	console.log(today);
	  		       	console.log(data);
	    		   if(data.rows.length > 0)
	     		   {
	      				for(var i = 0; i < data.rows.length; i++) 
	      				{
	      					console.log(data.rows.item(i));
	      					//this.daily_col =this.daily_col + +data.rows.item(i).amount;
	     				}
		    		}

		     		 }, (err) => {
		     		 alert('Unable to execute sql: '+JSON.stringify(err));
		     		 });

	  		       	//end test

      })
      .catch(e => alert(JSON.stringify(e)));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
