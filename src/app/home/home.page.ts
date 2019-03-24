import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HelperService } from '../service/helper.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {




  watchLocationUpdates: any;
  isWatching: boolean = false;
  latitude: any;
  longitude: any;
  altitude: any;
  accuracy: any;
  altAccuracy: any;
  heading: any;
  speed: any;
  timestamp: any;
  gpsSync: boolean = true;
  location: any;


  constructor(public helperService: HelperService,  private geolocation: Geolocation) { }

  ngOnInit() {
    this.helperService.checkFirstTime();
    this.helperService.backButtonCustomHandler();

  }
getCurrentPosition() {

    this.geolocation.getCurrentPosition().then((resp) => {
    
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.altitude = resp.coords.altitude;
      this.accuracy = resp.coords.accuracy;
      this.altAccuracy = resp.coords.altitudeAccuracy;
      this.heading = resp.coords.heading;
      this.speed = resp.coords.speed;
      this.timestamp = new Date(resp.timestamp);
      this.helperService.hideLoading();



    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  onChange() {
    if (this.isWatching) {
      this.buttonOn();
    }
    else {
      this.buttonOff()
    }
  }

  buttonOn() {
    this.helperService.presentLoading()

    this.getCurrentPosition();
    this.gpsSync = false;
this.watchLocation();

  }

  buttonOff() {
    this.gpsSync = true;
    this.stopLocationWatch();
 }
  


  //Start location update watch
  watchLocation() {
    this.watchLocationUpdates = this.geolocation.watchPosition({ maximumAge: 60000, timeout: 25000, enableHighAccuracy: true })
      .subscribe(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.altitude = resp.coords.altitude;
        if (this.altitude > 0) {
          this.gpsSync = true;
        }
        else {
          this.gpsSync = false;
        }
        this.accuracy = resp.coords.accuracy;
        this.altAccuracy = resp.coords.altitudeAccuracy;
        this.heading = resp.coords.heading;
        this.speed = resp.coords.speed;
        this.timestamp = new Date(resp.timestamp);


      });


  }

  //Stop location update watch
  stopLocationWatch() {

    this.watchLocationUpdates.unsubscribe();
    this.latitude = "";
    this.longitude = "";
    this.altitude = "";
    this.accuracy = "";
    this.altAccuracy = "";
    this.heading = "";
    this.speed = "";
    this.timestamp = "";


  }

}
