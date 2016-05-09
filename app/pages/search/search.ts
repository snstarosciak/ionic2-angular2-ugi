import {Page, NavController, ViewController} from 'ionic-angular';
import {TopicData} from '../../providers/topic-data/topic-data';
import {QuestionAddedDetailPage} from '../../pages/question-added-detail/question-added-detail';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';

@Page({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {
  queryText: string = '';
  feeds: any = [];
  constructor(
    public nav: NavController,
    private topicData: TopicData,
    private viewCtrl: ViewController
  ) {}

  close() {
    this.viewCtrl.dismiss();
  }

  searchFeeds() {
    console.log(this.queryText);
    // Get the feed data
    this.topicData.searchFeeds(this.queryText).then(data => {
      data.subscribe(data => {
        this.feeds = data;
      })
    })
  }

  goToFeed(feed) {
    let type = feed.Value.split('?')[1].split('=');
    let typeName = type[0];
    let typeId = type[1];

    if(typeName === "tid") {
      console.log(feed);
      this.nav.push(TopicFeedPage, { topic: feed });
    } else if(typeName === "id") {
      this.nav.push(QuestionAddedDetailPage, { post: feed });
    }
  }
}
