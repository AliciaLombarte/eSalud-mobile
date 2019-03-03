import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { QuestsPage } from '../quests/quests';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-questionnaire',
  templateUrl: 'questionnaire.html',
})
export class QuestionnairePage {

    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
 
    slideOptions: any;
    questions: any;

    public allQuestions;
    userData = { emailUser:'', score: 0};
    data: any;
 
    constructor(public navCtrl: NavController, public dataService: Data, public navParams: NavParams, public authService: AuthService, private toastCtrl: ToastController) {

        this.allQuestions = navParams.get("questions");
        this.userData.emailUser = navParams.get("emailUser");
        console.log(this.allQuestions[0][1]);
 
    }
 
    ionViewDidLoad() {
        this.slides.lockSwipes(true);
    }

    firstSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }
 
    nextSlide(){
        this.slides.slideNext();
        this.slides.lockSwipeToNext(true);
    }

    prevSlide(){
        this.slides.slidePrev();
        this.slides.lockSwipeToNext(false);
        this.slides.lockSwipeToPrev(false);
    }
 
    selectAnswer(result){
        this.score += result;
        this.slides.lockSwipeToNext(false);
        this.slides.lockSwipeToPrev(false);
    }
 
    restartQuiz() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
    }

    goToMenu(){

        this.userData.score = this.score*2;
        this.authService.postResultQuest(this.userData).then((result) => {
            this.data = result;
            if(this.data._body=="{\"result\":200,\"listUsers\":null}"){
                let data = {
                    finishedW: true
                }
                this.navCtrl.setRoot(QuestsPage, data);
                this.presentToast("Sus datos se han enviado correctamente, nos pondremos en contacto cuando los revisemos si hay algún problema. Ante cualquier duda, acuda a su médico.");
            } 
        });
        
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 5000,
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
    
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
    
        toast.present();
      }
 

}
