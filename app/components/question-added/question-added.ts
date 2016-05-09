import {Component, Input} from 'angular2/core';
import {NavController, Modal} from 'ionic-angular';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';
import {QuestionAddedDetailPage} from '../../pages/question-added-detail/question-added-detail';
import {AddAnswer} from '../../pages/add-answer/add-answer';

@Component({
  selector: 'question-added',
  templateUrl: 'build/components/question-added/question-added.html'
})
export class QuestionAdded {
  @Input() post: any;

  title: string;
  topicDetail: any = {};
  topicName: string = '';

  constructor(private nav: NavController) {}

  goToFeedTopic() {
    this.nav.push(TopicFeedPage, this.post);
  }

  goToPost() {
    this.nav.push(QuestionAddedDetailPage, this.post);
  }

  showAnswerModal() {
    let modal = Modal.create(AddAnswer, {post: this.post});
    this.nav.present(modal)
  }

  pass() {

  }

  follow() {

  }

  ngOnInit() {
    this.title = this.post.title.replace(/(<([^>]+)>)/ig,"");
    // Pull the topic name out
    this.topicDetail = JSON.parse(this.post.details);
    this.topicName = this.topicDetail.topic.topicName;
  }
}
