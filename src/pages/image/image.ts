import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
 
import { File } from '@ionic-native/file';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { CameraPage } from '../camera/camera';

 
declare var cordova: any;

@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {

  lastImage: string = null;
  loading: Loading;
  currentImage = null;
 
  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private emailComposer: EmailComposer) { }
 
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cámara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Atrás',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            this.currentImage=correctPath;
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        this.currentImage=correctPath;
      }
      
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  /*
  public uploadImage() {
    /*
    // Destination URL
    var url = "http://192.168.64.2/upload.php";
  
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
  
    // File name only
    var filename = this.lastImage;
  
    let options: FileUploadOptions = 
    {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params : {'fileName': filename},
    };

    options.chunkedMode = false;
    options.headers = {
      Connection: "close"
    };
  
    const fileTransfer: TransferObject = this.transfer.create();
  
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
  
    // Use the FileTransfer to upload the image

    /*
    console.log(targetPath);
    console.log(url);
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll();
      console.log(err);
      this.presentToast('Error while uploading file.');
    });
    

    var targetPath = this.pathForImage(this.lastImage);

     
  }*/


  sendEmail() {
    console.log(this.lastImage)
    console.log(this.currentImage)
    var targetPath = this.pathForImage(this.lastImage);
    console.log(targetPath)
    let email = {
      to: 'alexperez11000@gmail.com',
      cc: '',
      bcc: [''],
      attachments: [
        'com.android.providers.media.documents/document/image%' + targetPath
      ],
      subject: 'Imagen',
      body: 'Imagen adjunta',
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(email);
    

  }

  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
    }
 
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
      var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
      var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

    }, (err) => {
      console.log('Image error: ', err);
    });
  }
 
  sendEmail2() {
    
    let email = {
      to: 'alexperez11000@gmail.com',
      cc: '',
      bcc: [''],
      attachments: [
        this.currentImage
      ],
      subject: 'Imagen',
      body: 'Imagen adjunta',
      isHtml: true
    };
 
    this.emailComposer.open(email);

    this.navCtrl.setRoot(CameraPage);
  }

}
