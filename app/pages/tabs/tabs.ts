import {Page, NavParams} from 'ionic-angular';
import {FeedPage} from '../feed/feed';
import {AccountPage} from '../account/account';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = FeedPage;
  tab2Root: any = AccountPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
