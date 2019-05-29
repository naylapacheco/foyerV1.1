import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AlertController}  from '@ionic/angular';
//import { FCM, NotificationData} from '@ionic-native/fcm';
//o ultimo import foi um teste talvvez para gerenciar temos que usar isso 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    //o alert tambem
    private alertCtrl: AlertController,
    private firebase: Firebase
    //declare aqui o firebase tambem
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.solicitarTokenDoFirebase();
    });
  }
  solicitarTokenDoFirebase() {

    this.firebase.getToken()
        .then(token => {
            console.log("firebase token recebido", token);
            this.enviarTokenParaOservidor(token);
            this.iniciarListenerDeNotificacoes();
        }) // salva o token server-side e usa isso para push notifications tpara esse  device
        .catch(error => {
            console.error('Error ao pegar o token', error)
        });

}
iniciarListenerDeNotificacoes() {

  this.firebase.onNotificationOpen().subscribe((notification: any) => {

      console.log(notification);
      if (!notification.tap) {
          this.mostrarAlert(notification.title, notification.body);
      }

  });
}
enviarTokenParaOservidor(token) {


  // lógica para enviar o token para o seu servidor através da sua api
}

async mostrarAlert(titulo, texto) {
  const alert = await this.alertCtrl.create({
      header: titulo,
      message: texto,
      buttons: [
          {
              text: 'Entendi',
              handler: () => {
              }
          }
      ]
  });
  await alert.present();
}
}

//termina aqui a notificação