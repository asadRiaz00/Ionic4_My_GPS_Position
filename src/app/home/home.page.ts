import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  responseObj: any;
  watchLocationUpdates: any;
  isWatching: boolean;
  latitude: any;
  longitude: any;
  altitude: any;
  accuracy: any;
  altAccuracy: any;
  heading: any;
  speed: any;
  timestamp: any;

  constructor(private geolocation: Geolocation, private platform: Platform) { }


 

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
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
 
  //Start location update watch
  watchLocation() {


    this.isWatching = true;
    this.watchLocationUpdates = this.geolocation.watchPosition({ maximumAge: 60000, timeout: 25000, enableHighAccuracy: true})
                                 .subscribe(resp => {
                                  this.latitude = resp.coords.latitude;
                                  this.longitude = resp.coords.longitude;
                                  this.altitude = resp.coords.altitude;
                                  this.accuracy = resp.coords.accuracy;
                                  this.altAccuracy = resp.coords.altitudeAccuracy;
                                  this.heading = resp.coords.heading;
                                  this.speed = resp.coords.speed;
                                  this.timestamp = new Date(resp.timestamp);
     });


  }

  //Stop location update watch
  stopLocationWatch() {
    alert("hogayea");
    this.isWatching = false;
    this.watchLocationUpdates.unsubscribe();
   
  }


}
