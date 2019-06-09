import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginPage } from '../pages/login/login';
import { CameraPage } from '../pages/camera/camera';
import { QuestsPage } from '../pages/quests/quests';
import { QuestionnairePage } from '../pages/questionnaire/questionnaire';
import { ChangepassPage } from '../pages/changepass/changepass';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Data } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CameraPage,
    QuestsPage,
    QuestionnairePage,
    ChangepassPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CameraPage,
    QuestsPage,
    QuestionnairePage,
    ChangepassPage
 ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    File,
    FilePath,
    Camera,
    Data,
    EmailComposer
  ]
})
export class AppModule {}
