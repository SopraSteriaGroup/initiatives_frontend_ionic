import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Idea, IdeaDetail} from '../../shared/idea/idea.model';

@Component({
  templateUrl: 'idea-detail.page.html',
  styles: ['idea-detail.scss']
})
export class IdeaDetailPage implements OnInit {

  ideaDetail: IdeaDetail;
  idea: Idea;

  constructor(private navParams: NavParams) {
  }

  ngOnInit() {
    this.idea = this.navParams.data;
    this.ideaDetail = this.getDetail(this.idea.id);
  }

  getDetail(id: number): IdeaDetail {
    //TODO call REST with id
    //FIXME This is a mock to replace
    return {
      id: 1,
      name: this.idea.name,
      pitch: this.idea.pitch,
      category: this.idea.category,
      logo: this.idea.logo,
      progress: this.idea.progress,
      likes: this.idea.likes,
      founder: {
        username: 'jmadih',
        email: 'madih.jaafar@gmail.com',
        firstName: 'Jaafar',
        lastName: 'MADIH',
        avatar: 'assets/image/photo-profil-1.jpg'
      },
      members: [
        {
          username: 'cgiraud',
          email: 'charles.giraud@gmail.com',
          firstName: 'Charles',
          lastName: 'GIRAUD',
          avatar: 'assets/image/photo-profil-3.jpg'
        },
        {
          username: 'egiraud',
          email: 'eric.giraud@gmail.com',
          firstName: 'Eric',
          lastName: 'GIRAUD',
          avatar: 'assets/image/photo-profil-2.jpg'
        }
      ],
      contact: {
        website: 'http://google.com',
        slack: 'http://slack.com',
        github: 'http://github.com',
        trello: 'http://trello.com'
      }
    }
  }

}
