import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  changeData = { originalPass:'', newPass:'', newPass2:'' };
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  changePass(originalPass,newPass,newPass2){

    if(newPass==newPass2 && newPass!=null){
      this.changeData.originalPass = originalPass;
      this.changeData.newPass = newPass;
      this.changeData.newPass2 = newPass2;
      this.authService.changePass(this.changeData)
      .then(data => {
        this.data = data;
        console.log(this.data._body);
        if(this.data._body.result == 200){
          this.navCtrl.setRoot(LoginPage);
        } else{
          this.navCtrl.setRoot(ChangepassPage);
        }
      });
    } else {
      this.navCtrl.setRoot(ChangepassPage);
    }

  }

}
