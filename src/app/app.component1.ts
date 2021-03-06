import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';





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
  upages : Array<{title: string,icon:string, component: any}>;

   

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
      this.statusBar.backgroundColorByHexString('red');
      if ( this.platform.is('android') ) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // Splashscreen.hide();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#00FFFF');
        });
    }

    this.initializeApp();

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

  


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  
}
