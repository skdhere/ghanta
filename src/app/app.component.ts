import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage = 'UserLogin';
    pages: Array<{title: string,icon:string, component: any}>;
    upages: Array<{title: string,icon:string, component: any}>;


    alert: any = null;
    tprice:any;
    constructor(
                public alertCtrl: AlertController,
                public platform: Platform,
                public menu: MenuController,
                public statusBar: StatusBar,
                private network: Network,
                private sqlite: SQLite,
                public splashScreen: SplashScreen){

       



       this.tprice =6;
       console.log(this.tprice);
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need

            statusBar.styleDefault();
            statusBar.overlaysWebView(true);
            statusBar.backgroundColorByHexString("#33000000");
            statusBar.styleBlackOpaque();

            this.platform.registerBackButtonAction(() => {
                //====================== start :to create poopup for exit confirmation====//
                let currentView = this.nav.getActive();
                if(menu.isOpen()){
                    menu.close();
                }
                else{

                    if(currentView.component.name == 'Dashboard' || currentView.component.name == 'UserLogin' || currentView.component.name == 'LoginpinPage'){
                        if(this.alert == null){
                            this.alert = this.alertCtrl.create({
                                title: 'Confirm',
                                message: 'are you sure want to exit?',
                                enableBackdropDismiss:false,
                                buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: () => {
                                        console.log('Cancel clicked');
                                        this.alert = null;
                                    }
                                },
                                {
                                    text: 'Exit',
                                    handler: () => {
                                        this.platform.exitApp();
                                    }
                                }
                                ]
                            });

                            this.alert.present();
                            console.log(1212122);
                        }
                        else{
                            this.alert.dismiss();
                            this.alert = null;
                        }

                    }
                    else{
                        this.nav.pop();
                    }
                }
            });
        });


       

       // set inside pages
    this.upages =[{ title: 'Member List',icon:'person', component: 'MembersPage' },
      { title: 'Report',icon:'book', component: 'ReportPage' },
      { title: 'Upload Data',icon:'arrow-up', component: 'UploadPage' },
      { title: 'Logut',icon:'lock', component: 'UserLogin' }];

    // set our app's pages
    this.pages = [
      { title: 'Dashbaord',icon:'home', component: 'Dashboard' }
    ];


    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }

    openuPage(upage) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(upage.component!="UserLogin")
    {
      this.nav.push(upage.component);
    }
    else{
      this.nav.setRoot(upage.component);
    }
    
  }
}
