import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { QuestsPage } from '../quests/quests';
import { AuthService } from '../../providers/auth-service/auth-service';
import { QuestionnairePage } from '../questionnaire/questionnaire';
import { ImagePage } from '../image/image';

declare var cordova: any;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  public photos: any;
  public base64Image: string;
  lastImage: string = null;
  urlImage: string = null;

  loading: any;
  data: any;
  photo: any;

  userData = { temperatura:'', dolorPierna:'', dolorEspalda:'', emailUser:'', photo:'', score: 0};

  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, 
    private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, 
    public platform: Platform, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public authService: AuthService) { }

  ngOnInit() {
    this.photos = [];
  }

  takePhoto(){
    this.navCtrl.setRoot(ImagePage);
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
    this.userData.emailUser= localStorage.getItem("email");

    //this.uploadImage();

    this.authService.postInfo(this.userData).then((result) => {
      this.data = result;
      let obj = JSON.parse(this.data._body);
      console.log(this.data._body);
            
      this.navCtrl.setRoot(QuestsPage);
      this.presentToast("¡Actividad completada!");
    
    }, (err) => {
      this.navCtrl.setRoot(CameraPage);
      this.presentToastError("Error en la actividad. Introduzca todos los datos correctamente");
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

/*
  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: TransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.64.2:8080/upload.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  */
 

}
