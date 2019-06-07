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
  seguimientoWountrack: String = null;
  seguimientoQuestionaires: String = null;

  userQuestionnaire: Array<String>;
  userProtocols: Array<String>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,  private toastCtrl: ToastController) {
    this.userData.email = localStorage.getItem('email');
  }

  ionViewDidLoad() {
    this.authService.getIfTrack(this.userData).then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
      this.seguimientoWountrack = obj.content;
    });
  }

  ionViewDidEnter() {
    this.authService.getIfTrack(this.userData).then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
      this.seguimientoWountrack = obj.content;
    });
  }
  ionViewWillEnter(){
    this.authService.getQuestionnaire(this.userData.email).then((result) => {
      this.data = result;
      if(JSON.parse(this.data._body).length === 0){
        this.seguimientoQuestionaires = "noAction";
      }else{
        this.seguimientoQuestionaires = "action";
      }
      this.userQuestionnaire = JSON.parse(this.data._body);
    });
  }
  
  goQuestionnaire(questionnaire){
    let questionAndAnswers : any [] = [];
    this.authService.getQuestions(questionnaire).then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
     obj.forEach(function(tupla,index){
      let object : any = {};
      object.answers = [];
      object.question = tupla.pregunta;
      var size = Object.keys(tupla).length;
        for (let i = 0; i < size -1 ; i++) {
          object.answers[i] = tupla[i];
        }
      questionAndAnswers.push(object);
     });
      this.navCtrl.setRoot(QuestionnairePage, {
        questions: obj,
        emailUser: localStorage.getItem("email"),
        questionnaireName: questionnaire,
        questionAndAnswers: questionAndAnswers,
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
    this.toastCtrl.create({
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
    if(this.data._body.result == 200){
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
