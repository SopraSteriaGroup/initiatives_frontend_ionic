import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {CloudModule, CloudSettings} from '@ionic/cloud-angular';
import {SecurityModule} from '../security/security.module';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {PrezPage} from '../pages/prez/prez';
import {SecurityService} from '../security/security.service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd65961c8'
  },
  'auth': {}
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrezPage
  ],
  imports: [
    BrowserModule,
    SecurityModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrezPage
  ],
  providers: [
    SecurityService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
