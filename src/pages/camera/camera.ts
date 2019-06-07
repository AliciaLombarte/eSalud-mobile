import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController, Platform, LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { QuestsPage } from '../quests/quests';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  public photos: any;
  public base64Image: string;

  image: string = null;

  lastImage: string = null;
  urlImage: string = null;

  loading: any;
  data: any;
  photo: any;

  userData = { temperatura:'', dolorPierna:'', dolorEspalda:'', emailUser:'', photo:'', fileName:'', score: 0};

  imageURI:any;
  imageFileName:string;
  
  constructor(public navCtrl: NavController, private camera: Camera,public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, 
    public platform: Platform, public loadingCtrl: LoadingController, private alertCtrl: AlertController, 
    public authService: AuthService, ) { }
 
  openGallery(){
    console.log("open gallery");

    const options : CameraOptions = {
      quality : 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((ImageData) => {
      this.imageFileName = localStorage.getItem("email");
      this.base64Image = `data:image/jpeg;base64,${ImageData}`;
    }, (err) => {
      this.presentToast('Error while selecting image.');
      console.log(err);
    });
  }

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: '¿Seguro que quieres borrar la foto?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }

  sendInfo(temperatura,dolorPierna,dolorEspalda){

    this.userData.dolorPierna = dolorPierna;
    this.userData.dolorEspalda = dolorEspalda;
    this.userData.temperatura = temperatura;
    this.userData.photo = this.base64Image;
    this.userData.fileName = this.imageFileName;
    this.userData.emailUser= localStorage.getItem("email");
    this.authService.postInfo(this.userData).then((result) => {
      this.data = result;
      let response = JSON.parse(this.data._body);
      if (response.result == 200) {
        this.navCtrl.setRoot(QuestsPage);
        this.presentToast("¡Actividad completada!");
      } else{
        this.presentToastError("Error en la actividad. Introduzca todos los datos correctamente");
        this.navCtrl.setRoot(CameraPage);
      }
    }, (err) => {
      this.navCtrl.setRoot(CameraPage);
      this.presentToastError("Error en la actividad");
    });
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

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
