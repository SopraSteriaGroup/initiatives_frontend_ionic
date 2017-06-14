import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginComponent} from '../../security/login/login.component';

@Component({
  selector: 'page-prez',
  templateUrl: 'prez.page.html'
})
export class PrezPage {
  slides = [
    {
      title: 'Bienvenue sur SopraIdeas!',
      description: '<b>SopraIdeas</b> est une platforme pour partager des idées innovantes afin de concevoir des applications.',
      image: 'assets/image/workforceInitiative.jpg',
      background: 'assets/image/background.jpg'
    },
    {
      title: 'Votre rôle ?',
      description: 'Créateur ou Philosophe ?',
      image: 'assets/image/workforceInitiative.jpg',
      background: 'assets/image/background.jpg'
    },
    {
      title: 'Comment ça marche ?',
      description: 'Tu verras ...',
      image: 'assets/image/workforceInitiative.jpg',
      background: 'assets/image/background.jpg'
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  skip() {
    this.navCtrl.setRoot(LoginComponent);
  }

}
