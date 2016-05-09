import {Modal, Page, NavController, Events, NavParams} from 'ionic-angular';
import {TopicData} from '../../providers/topic-data/topic-data';
import {AddAnswerComment} from '../add-answer-comment/add-answer-comment';

@Page({
  templateUrl: 'build/pages/answer-added-detail/answer-added-detail.html',
})
export class AnswerAddedDetailPage {
  post: any;
  comments: any = [];
  topicDetail: any = {};
  topicName: string = '';
  title: string = '';
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
    this.events.subscribe('answerComment:created', (comments) => {

      // Push the comment onto the array
      this.comments.push(comments[0]);

      // Determine the grammar of the words
      if (this.comments.length === 1) {
        this.commentGrammar = `${this.comments.length} Comment`;
      } else {
        this.commentGrammar = `${this.comments.length} Comments`;
      }
    });

    // Grab the comments if there are any
    if(this.post.commentCount > 0) {
      this.topicFeed.getCommentsFromAnswer(this.post.ifeedtypeid).then(data => {
        data.subscribe(
          data => {
            this.comments = data;

            // Determine the grammar of the words
            if (data.length === 1) {
              this.commentGrammar = `${data.length} Comment`;
            } else {
              this.commentGrammar = `${data.length} Comments`;
            }
          }
        )
      });
    }
  }

  showCommentModal() {
    let modal = Modal.create(AddAnswerComment, {post: this.post});
    this.nav.present(modal)
  }

  ngOnInit() {
    this.title = JSON.parse(this.post.details).question.vquestion.replace(/(<([^>]+)>)/ig,"");
  }
}
