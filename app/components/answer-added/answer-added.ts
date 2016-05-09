import {Component, Input} from 'angular2/core';
import {NavController} from 'ionic-angular';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';
import {AnswerAddedDetailPage} from '../../pages/answer-added-detail/answer-added-detail';

@Component({
  selector: 'answer-added',
  templateUrl: 'build/components/answer-added/answer-added.html'
})
export class AnswerAdded {
  @Input() post: any;
  title = null;
  topicDetail: any = {};
  topicName: string = '';

  constructor(private nav: NavController) {}

  ngOnInit() {
    this.title = JSON.parse(this.post.details).question.vquestion.replace(/(<([^>]+)>)/ig,"");
    // Pull the topic name out
    this.topicDetail = JSON.parse(this.post.details);
    this.topicName = this.topicDetail.topic.topicName;
  }

  goToFeedTopic() {
    this.nav.push(TopicFeedPage, this.post);
  }

  goToPost() {
    this.nav.push(AnswerAddedDetailPage, this.post);
  }
}
