import {Page, NavController, NavParams, Events, Modal} from 'ionic-angular';
import {TopicData} from '../../providers/topic-data/topic-data';
import {AddComment} from '../add-comment/add-comment';

@Page({
  templateUrl: 'build/pages/post-added-detail/post-added-detail.html',
})
export class PostAddedDetailPage {
  post: any;
  comments: any = [];
  topicDetail: any = {};
  topicName: string = '';
  commentGrammar: string = '';

  constructor(
    private events: Events,
    private navParams: NavParams,
    public nav: NavController,
    private topicFeed: TopicData
  )
  {
    this.post = navParams.data;

    // Pull the topic name out
    this.topicDetail = JSON.parse(this.post.details);
    this.topicName = this.topicDetail.topic.topicName;

    /**
      * Subscribe to the comment event created
      */
    this.events.subscribe('postComment:created', (comments) => {

      // Push the comment onto the array
      this.comments.push(comments[0]);

      // Determine the grammar of the words
      if (this.comments.length === 1) {
        this.commentGrammar = `${this.comments.length} Comment`;
      } else {
        this.commentGrammar = `${this.comments.length} Comments`;
      }
    });


    /**
     * Grab the comments if there are any
     */
    if(this.post.commentCount > 0) {
      this.topicFeed.getCommentsFromPost(this.post.ifeedtypeid).then(data => {
        data.subscribe(
          data => {
            this.comments = data;

            // Determine the grammar of the words
            if (this.comments.length === 1) {
              this.commentGrammar = `${this.comments.length} Comment`;
            } else {
              this.commentGrammar = `${this.comments.length} Comments`;
            }
          }
        )
      });
    }
  }

  showCommentModal() {
    let modal = Modal.create(AddComment, {post: this.post});
    this.nav.present(modal)
  }
}
