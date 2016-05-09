import {IonicApp, Page, Modal, Alert, Loading, NavController} from 'ionic-angular';
import {User} from '../../providers/user/user';
import {TopicData} from '../../providers/topic-data/topic-data';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';
import {SearchPage} from '../../pages/search/search';

//import {FeedAgo} from '../../components/feed-ago/feed-ago';

@Page({
  templateUrl: 'build/pages/feed/feed.html',
})
export class FeedPage {

  posts          = null;
  chosenFilter   = null;
  disabled       = true;
  contentFilter  = 'all';
  hasSessions    = false;
  trendingTopics = null;
  loading: any   = null;

  constructor(
    private app:  IonicApp,
    private nav:  NavController,
    private user: User,
    private feed: TopicData
  ) {
    this.updateContentFilter();
    this.presentLoading();
  }

  ngOnInit() {
    // Get the feed data
    this.feed.getFeed().then(data => {
      data.subscribe(data => {
        this.posts = data;
        this.loading.dismiss();
      })
    })

    // Get trending topics
    this.feed.getTrendingTopics().then(data => {
      data.subscribe(data => {
        this.trendingTopics = data;
      })
    })
  }

  goToTopic(topic) {
    this.nav.push(TopicFeedPage, { topic: topic });
  }

  syncData() {
    setTimeout(function() {
      this.feed.getFeed().then(data => {
        data.subscribe(data => {
          this.posts = data;

        })
      });
      this.syncData();
    }.bind(this), 10000)
  }

  showSearchModal() {
    let modal = Modal.create(SearchPage);
    this.nav.present(modal)
  }

  /**
   *  Loading animation
   */
  presentLoading() {
    this.loading = Loading.create({
      content: "",
    });
    this.nav.present(this.loading);
  }

  onPageDidEnter() {
    this.app.setTitle('Feed');
  }

  updateContentFilter() {
    /*this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });*/
    this.chosenFilter = this.contentFilter;
  }
}
