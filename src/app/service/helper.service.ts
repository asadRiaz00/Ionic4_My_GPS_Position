import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public unsubscribeBackEvent: any;
  loading: any;


  constructor(private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public alertController: AlertController, private platform: Platform) { }



  checkFirstTime() {
    this.nativeStorage.getItem('firstTime')
      .then(
        data => console.log('dosri dafa'),
        error =>
          this.nativeStorage.setItem('firstTime', { property: 'true' })
            .then(
              () => this.presentAlert(),
              error => console.error('Error storing item', error)
            )

      );


  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Welcome!',
      message: 'This app is just to show your coordinates',
      subHeader: 'Will use your GPS',
      buttons: ['Agree']
    });
    await alert.present();
  }
  // ....................present Loading service...............//

  backButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999, () => {
      this.presentAlertConfirm();
    });
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }

  // ....................alert  service...............//

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'pakki baat hai! nhi dekhna yeh sab ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }


  // ....................present Loading service...............//

  async presentLoading() {


    this.loading = await this.loadingCtrl.create({
      message: 'Waiting for GPS data ',
    });


    this.loading.present();
  }

  // ....................hide loading...............//

  hideLoading() {

    this.loading.dismiss();
    console.log('khali');
  }

  // ....................sleep service...............//
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}
