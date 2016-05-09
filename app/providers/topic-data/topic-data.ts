import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Globals} from '../globals/globals';
import {User} from '../../providers/user/user';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TopicData {

  data              = null;
  storage           = new Storage(LocalStorage);
  queryText: string = '';

  constructor(
    private http: Http,
    private globals: Globals,
    private user: User
  ) {}

  /**
   *  Get a homepage feed
   */
  getFeed() {

    return this.user.createAuthHeaders().then(headers => {
      //let feedUrl = this.globals.getApiUrl() + 'feeds?lastIndex=0&topics=10';
      let feedUrl = `${this.globals.getApiUrl()}topics/feed?topicId=216`;

        // Make the call
      return this.http.get(feedUrl, { headers: headers })
        .map(res => res.json());
    });
  }

  /**
 *  Get trending topic list
 */
  getTrendingTopics() {

    return this.user.createAuthHeaders().then(headers => {
      let url = `${this.globals.getApiUrl()}topics/Trending`;

      // Make the call
      return this.http.get(url, { headers: headers })
        .map(res => res.json());
    });
  }

  /**
   *  Get a single topic
   */
  getSingleTopicFeed(topicId) {
    return this.user.createAuthHeaders().then(headers => {
    let feedUrl = `${this.globals.getApiUrl()}topics/feed?topicId=${topicId}`;
    let topicUrl = `${this.globals.getApiUrl()}topics/?topicid=${topicId}`;

    return Observable.forkJoin(
      this.http.get(feedUrl, {headers}).map(res => res.json()),
      this.http.get(topicUrl, {headers}).map(res => res.json())
      )
    });
  }

  /**
   *  Get comments for post
   */
  getCommentsFromPost(postId) {
    console.log('does this run');
    return this.user.createAuthHeaders().then(headers => {
      let url = `${this.globals.getApiUrl()}posts/comments?postId=${postId}`;

      // Make the call
      return this.http.get(url, { headers: headers })
        .map(res => res.json());
    });
  }

  /**
   *  Get comments for answer
   */
  getCommentsFromAnswer(answerId) {
    return this.user.createAuthHeaders().then(headers => {
      let url = `${this.globals.getApiUrl()}answers/comments?answerId=${answerId}`;

      // Make the call
      return this.http.get(url, { headers: headers })
        .map(res => res.json());
    });
  }

  /**
   *  Get answers for a question
   */
  getQuestionAnswers(questionId) {

    return this.user.createAuthHeaders().then(headers => {
      let questionAnswersUrl = `${this.globals.getApiUrl()}answers?questionId=${questionId}`;

      // Make the call
      return this.http.get(questionAnswersUrl, { headers: headers })
        .map(res => res.json())
    });

  }

  /**
   *  Post a comment for a post
   */
  postComment(comment) {
    return this.user.createAuthHeaders().then(headers => {

      // Create the post data
      let body = JSON.stringify(comment);

      let url = `${this.globals.getApiUrl()}postcomments`;

      // Make the call
      return this.http.put(url, body, { headers })
        .map(res => res.json())
      });
  }

  /**
   *  Post a comment for an answer
   */
  postAnswerComment(comment) {
    return this.user.createAuthHeaders().then(headers => {

      // Create the post data
      let body = JSON.stringify(comment);

      let url = `${this.globals.getApiUrl()}answercomments`;

      // Make the call
      return this.http.put(url, body, { headers })
        .map(res => res.json())
    });
  }


  /**
   *  Post answer to question
   */
  postAnswer(answer) {
    return this.user.createAuthHeaders().then(headers => {

      // Create the post data
      let body = JSON.stringify(answer);

      let url = `${this.globals.getApiUrl()}answers`;

      // Make the call
      return this.http.put(url, body, { headers })
        .map(res => res.json())
    });
  }

  /**
   *  Search feed
   */
   searchFeeds(term) {
     return this.user.createAuthHeaders().then(headers => {


       let url = `${this.globals.getApiUrl()}feeds/find?search=${term}`;

       // Make the call
       return this.http.get(url, { headers })
         .map(res => res.json())
     });
   }
}

