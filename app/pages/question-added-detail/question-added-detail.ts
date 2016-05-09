import {Modal, Page, NavController, Events, NavParams} from 'ionic-angular';
import {AnswerAdded} from '../../components/answer-added/answer-added';
import {TopicData} from '../../providers/topic-data/topic-data';
import {AddAnswer} from '../add-answer/add-answer';

@Page({
  templateUrl: 'build/pages/question-added-detail/question-added-detail.html',
})
export class QuestionAddedDetailPage {
  post: any;
  title: string = '';
  topicDetail: any = {};
  topicName: string = '';
  answers: any = [];
  answerCount: number = 0;
  answerGrammar: string = '';

  constructor(
    private navParams  : NavParams,
    private events     : Events,
    public nav         : NavController,
    private topicData  : TopicData
  ) {

    this.post = navParams.data;

    // Pull the topic name out
    this.topicDetail = JSON.parse(this.post.details);
    this.topicName = this.topicDetail.topic.topicName;

    /**
      * Subscribe to the answer event created
      */
    this.events.subscribe('answer:created', (answers) => {

      // Push the comment onto the array
      this.answers.push(answers[0]);

      // Determine the grammar of the words
      if (this.answers.length === 1) {
        this.answerGrammar = `${this.answers.length} Answer`;
      } else {
        this.answerGrammar = `${this.answers.length} Answers`;
      }
    });

    // Grab the comments if there are any
    this.topicData.getQuestionAnswers(this.post.ifeedtypeid).then(data => {
      data.subscribe(
        data => {
          this.answers = data;

          // Determine the grammar of the words
          if (data.length === 1) {
            this.answerGrammar = `${this.answers.length} Answer`;
          } else {
            this.answerGrammar = `${this.answers.length} Answers`;
          }

          this.answerCount = data.length;
        }
      )
    });
  }

  showCommentModal() {
    let modal = Modal.create(AddAnswer, { post: this.post });
    this.nav.present(modal)
  }

  ngOnInit() {
    this.title = this.post.title.replace(/(<([^>]+)>)/ig,"");
  }
}
