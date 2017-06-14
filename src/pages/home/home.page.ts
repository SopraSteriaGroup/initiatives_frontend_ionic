import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../security/security.service';
import {User} from '../../security/user.model';
import {NavController} from 'ionic-angular';
import {Idea} from '../../shared/idea/idea.model';
import {IdeaDetailPage} from '../idea-detail/idead-detail.page';
import * as _ from 'lodash';
import {NewIdeaPage} from '../new-idea/new-idea.page';

@Component({

  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {

  currentLinkedinUser: User;

  ideas: Idea[] = [];

  constructor(private _securityService: SecurityService, public navCtrl: NavController) {
    this.currentLinkedinUser = this._securityService.getCurrentUser();
  }

  ngOnInit() {
    this.initItems();
  }

  initItems() {
    this.ideas = [{
      id: 1,
      name: 'Idée de fou',
      pitch: 'Vous allez pas me croire mais j\'ai trouvé un moyen pour créer de l\'eau en poudre',
      category: 'Incroyable mais vrai',
      logo: 'assets/image/idea.gif',
      progress: 'Initié',
      likes: 150,
    },
      {
        id: 2,
        name: 'Idée simple',
        pitch: 'Vous allez pas me croire mais j\'ai trouvé un moyer pour créer une douche sans fil',
        category: 'Incroyable mais vrai',
        logo: 'assets/image/idea.gif',
        progress: 'Initié',
        likes: 50,
      },
      {
        id: 3,
        name: 'Idée nulle',
        pitch: 'Vous allez pas me croire mais j\'ai trouvé un moyer pour créer une idée',
        category: 'Incroyable mais vrai',
        logo: 'assets/image/idea.gif',
        progress: 'Initié',
        likes: -543,
      }
    ]
  }

  getItems(ev: any) {
    this.initItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.ideas = this.ideas.filter((item) => {
        return _.includes(item.name.toLowerCase(), val.toLowerCase());
      })
    }
  }

  detail(idea: Idea) {
    this.navCtrl.push(IdeaDetailPage, idea);
  }

  add() {
    this.navCtrl.push(NewIdeaPage);
  }

}
