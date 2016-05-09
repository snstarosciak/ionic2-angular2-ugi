import {Component, Input} from 'angular2/core';
import {NavController} from 'ionic-angular';
import {PostAddedDetailPage} from '../../pages/post-added-detail/post-added-detail';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';
//import {MomentPipe} from '../../pipes/moment';

@Component({
  selector: 'post-added',
  templateUrl: 'build/components/post-added/post-added.html',
})
export class PostAdded {
  @Input() post: any;
  title: string = '';
  topicDetail: any = {};
  topicName: string = '';

  constructor(private nav: NavController) {}

  goToFeedTopic() {
    this.nav.push(TopicFeedPage, this.post);
  }

  goToPost() {
    this.nav.push(PostAddedDetailPage, this.post);
  }

  ngOnInit() {
    this.title = this.post.title.replace(/(<([^>]+)>)/ig,"");
    // Pull the topic name out
    this.topicDetail = JSON.parse(this.post.details);
    this.topicName = this.topicDetail.topic.topicName;
    console.log(this.post);
  }
}
