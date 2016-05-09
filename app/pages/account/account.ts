import {Page, NavController} from 'ionic-angular';
import {User} from '../../providers/user/user';

/*
  Generated class for the AccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {

  userData: any = [];

  constructor(
    public nav: NavController,
    private user: User
  ) {}

  ngOnInit() {
    // Get trending topics
    this.user.getAccount().then(data => {
      data.subscribe(data => {
        this.userData = data;
        console.log(data);
      })
    })
  }
}
