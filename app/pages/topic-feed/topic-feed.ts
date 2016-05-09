import {Page, NavParams} from 'ionic-angular';
import {Component, Inject} from 'angular2/core';
import {TopicData} from '../../providers/topic-data/topic-data';
import {AnswerAdded} from '../../components/answer-added/answer-added';

@Page({
  templateUrl: 'build/pages/topic-feed/topic-feed.html'
})
export class TopicFeedPage {

  topic: any;
  topicData: any;
  topicDetail: any;
  topicName: any;
  posts: any;
  topicInfo: any;

  constructor(
    private navParams: NavParams,
    private topicFeed: TopicData
  ) {
    this.topic = navParams.data;

    this.topicDetail = JSON.parse(this.topic.details);

    // Pull the topic name out
    this.topicName = this.topicDetail.topic.topicName;

    // Get the Topic data
    this.topicFeed.getSingleTopicFeed(this.topicDetail.topic.topicId).then(data => {
      data.subscribe(
        data => {
          this.topic['feed'] = data[0];
          this.topic['topic'] = data[1];
        }
      )
    });
  }
}
