import {Page, Modal, NavController, Events, NavParams, Alert, ViewController} from 'ionic-angular';
import {TopicData} from '../../providers/topic-data/topic-data';

@Page({
  templateUrl: 'build/pages/add-answer/add-answer.html',
})

export class AddAnswer {
  post: any = {};
  viewCtrl: any;
  answer: {body?: string} = {};
  submitted = false;
  answerData: {} = {};

  constructor(
    private events    : Events,
    private nav       : NavController,
    viewCtrl          : ViewController,
    private topicData : TopicData,
    private params    : NavParams
  ) {
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  addAnswer() {
    this.post = this.params.get('post');

    // Create the data
    this.answerData = {
      datedata: null,
      ianswerid: 0,
      iquestionid: this.post.ifeedtypeid,
      tanswer: this.answer.body,
      iuserid: 0,
      vote: 0
    }

    /**
     *  Post the comment and then add it
     */
    this.topicData.postAnswer(this.answerData).then(data => {
      data.subscribe(
        data => {
          this.events.publish('answer:created', data);
          this.viewCtrl.dismiss();
        },
        err => {
          console.log(err);
          console.log(err['Message']);
          if(err.status === 400) {

            let errBody = JSON.parse(err._body);
            if(errBody.Message = 'Already Answered') {
              this.nav.present(Alert.create({
                title: 'Already answered',
                subTitle: "It looks like you've answered this before. You might want to look at something else.",
                buttons: ['OK']
              }));
            }

          }
        })
    });
  }
}