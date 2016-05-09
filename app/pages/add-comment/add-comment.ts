import {Page, Modal, NavController, ViewController, Events, NavParams} from 'ionic-angular';
import {TopicData} from '../../providers/topic-data/topic-data';

@Page({
  templateUrl: 'build/pages/add-comment/add-comment.html',
})

export class AddComment {
  viewCtrl: any;
  comment: { body?: string } = {};
  submitted = false;
  commentData: {} = {};
  post: {} = {};

  constructor(
    viewCtrl: ViewController,
    private params: NavParams,
    private topicData: TopicData,
    private events: Events
  ) {
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  addComment() {
    this.post = this.params.get('post');

    // Create the data
    this.commentData = {
      datedata: null,
      iparentid: 0,
      ipostcommentid: 0,
      ipostid: this.post.ifeedtypeid,
      tcomment: this.comment.body,
      userId: 0,
      vote: 0
    }

    /**
     *  Post the comment and then add it
     */
    this.topicData.postComment(this.commentData).then( data => {
      data.subscribe(
        data => {
          this.events.publish('postComment:created', data);
          this.viewCtrl.dismiss();
        })
    });
  }
}