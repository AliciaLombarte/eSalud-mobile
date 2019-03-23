import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { QuestionnairePage } from '../questionnaire/questionnaire';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-quests',
  templateUrl: 'quests.html',
})
export class QuestsPage {

  myDate: String = new Date().toISOString();
  finished: boolean = false;
  finishedW: boolean = false;
  data: any;
  userData = { email:''};
  seguimiento: String = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,  private toastCtrl: ToastController) {
    this.userData.email = localStorage.getItem('email');
  }

  ionViewDidLoad() {
    console.log(this.userData);
    this.authService.getIfTrack(this.userData).then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
      this.seguimiento = obj.result;
      console.log(this.seguimiento);
    });
  }

  ionViewDidEnter() {
    console.log(this.userData);
    this.authService.getIfTrack(this.userData).then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
      this.seguimiento = obj.result;
      console.log(this.seguimiento);
    });
  }

  goQuestionnaire(){

    this.authService.getQuestions().then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
      console.log(this.data._body);
      for (let i = 0; i < obj.length; i++) {
        console.log("Pregunta: " + obj[i][0]);
        for (let j = 1; j < 7; j++) {
          console.log("Respuesta: " + obj[i][j]);
        }
      }
      
      this.navCtrl.setRoot(QuestionnairePage, {
        questions: obj,
        emailUser: localStorage.getItem("email")
      });
    
    }, (err) => {
      this.navCtrl.setRoot(CameraPage);
    });
  }

  woundTracking() {
    this.navCtrl.push(CameraPage);
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      //dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  presentToastError(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      //dismissOnPageChange: true
    });
}
logout(){
  this.authService.logout()
  .then(data => {
    this.data = data;
    console.log(this.data._body);
    if(this.data._body=="{\"result\":200,\"listUsers\":null}"){
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
      this.presentToast("Sesión finalizada correctamente.");
    } else{
      this.presentToastError("Error al finalizar la sesión.");
      this.navCtrl.setRoot(QuestsPage);
    }
  },
  (error) => {
    console.log(error);
    this.presentToastError("Error en inicio de sesión. Sin conexión.");
  });
};

}
