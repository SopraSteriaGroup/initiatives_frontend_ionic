import {Component, Input} from '@angular/core';
import {Idea} from './idea.model';

@Component({
  selector: 'component-idea',
  templateUrl: 'idea.html',
  styles: ['ideas.scss']
})
export class IdeaComponent {

  @Input()
  idea: Idea;

  constructor() {
  }

}
