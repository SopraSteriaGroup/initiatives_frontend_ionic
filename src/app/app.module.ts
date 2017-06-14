import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {CloudModule, CloudSettings} from '@ionic/cloud-angular';
import {SecurityModule} from '../security/security.module';
import {MyApp} from './app.component';
import {PrezPage} from '../pages/prez/prez.page';
import {SecurityService} from '../security/security.service';
import {BrowserTab} from '@ionic-native/browser-tab';
import {AccountPage} from '../pages/account/account.page';
import {ContactPage} from '../pages/contact/contact.page';
import {TabsPage} from '../pages/tabs/tabs';
import {SettingsPage} from '../pages/settings/settings.page';
import {HomeModule} from '../pages/home/home.module';
import {IdeaDetailPage} from '../pages/idea-detail/idead-detail.page';
import {NewIdeaPage} from '../pages/new-idea/new-idea.page';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd65961c8'
  },
  'auth': {}
};

@NgModule({
  declarations: [
    MyApp,
    PrezPage,
    AccountPage,
    ContactPage,
    TabsPage,
    SettingsPage,
    IdeaDetailPage,
    NewIdeaPage
  ],
  imports: [
    BrowserModule,
    SecurityModule,
    HomeModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrezPage,
    AccountPage,
    ContactPage,
    TabsPage,
    SettingsPage,
    IdeaDetailPage,
    NewIdeaPage
  ],
  providers: [
    SecurityService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BrowserTab
  ]
})
export class AppModule {
}
