import {Component} from '@angular/core';

import {AccountPage, ContactPage, HomePage, SettingsPage} from '../pages';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeTab = HomePage;
  accountTab = AccountPage;
  contactTab = ContactPage;
  settingsTab = SettingsPage;


  constructor() {

  }
}
