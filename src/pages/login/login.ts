import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
//import { CameraPage } from '../camera/camera';
import { QuestsPage } from '../quests/quests';
import { ChangepassPage } from '../changepass/changepass';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { email:'', pass:'' };
  data: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  doLogin(email,pass) {
    this.showLoader();
    this.loginData.email = email;
    this.loginData.pass = pass;
    setTimeout(() => {
    this.authService.login(this.loginData)
    .then(data => {
      this.data = data;
      this.loading.dismiss();
      if(this.data._body=="{\"result\":200,\"listUsers\":null}"){
        localStorage.setItem('email', email);
        this.navCtrl.setRoot(QuestsPage);
        this.presentToast("¡Inicio de sesión correcto!");
      } else{
        this.presentToastError("Error en inicio de sesión. Usuario y/o contraseña no válido(s).");
        this.navCtrl.setRoot(LoginPage);
      }
    });
    }, 2000);
    this.loading.dismiss();
    this.presentToastError("Error en inicio de sesión. Sin conexión.");
    this.navCtrl.setRoot(LoginPage);
  }

  changePass(){
    this.navCtrl.setRoot(ChangepassPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Iniciando...',
        duration: 2000,
    });

    this.loading.present();
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

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}