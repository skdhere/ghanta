import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  constructor(private sqlite: SQLite,public menu:MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menu.enable(true);

    this.sqlite.create({
    name: 'data.db',
    location: 'default'
    })
    .then((db: SQLiteObject) => {

    //create table section
    db.executeSql('CREATE TABLE IF NOT EXISTS usernameList(id INTEGER PRIMARY KEY AUTOINCREMENT,name,mobile_no,amount,comment,ukey,date)', {})
    .then(() => console.log('done'))
    .catch(e => console.log(e));

    db.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name,mobile_no,server_id,added_date)', {})
      .then(() => console.log('done'))
      .catch(e => console.log(e));
    })
    .catch(e => alert(JSON.stringify(e)));

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  collect()
  {
  	this.navCtrl.push('UserlistPage');
  }

  report()
  {
    this.navCtrl.push('ReportPage');
  }

  members()
  {
    this.navCtrl.push('MembersPage');
  }
  
  upload()
  {
    this.navCtrl.push('UploadPage');
  }
}
