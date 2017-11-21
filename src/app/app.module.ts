import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatePicker } from '@ionic-native/date-picker';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// import { UserLogin } from '../pages/user-login/user-login';
// import { UserSignup } from '../pages/user-signup/user-signup';
// import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
// import { Dashboard } from '../pages/dashboard/dashboard';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,​{
          platforms: {
            ios: {
              statusbarPadding: true
            },
            android: {
              statusbarPadding: true
            }
          }
          }​),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    DatePicker,
    Network,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

  
  constructor(private statusBar: StatusBar) {
           this.statusBar.overlaysWebView(true);

      this.statusBar.backgroundColorByHexString('#ffffff');

   }

 
}
