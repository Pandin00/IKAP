import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { GoogleMap } from '@capacitor/google-maps';
import { isPlatform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  constructor() {
    this.initializeAdds();
  }

  ngOnInit() {

  }

  async ionViewDidEnter(){

    const mapRef = document.getElementById('map');

    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googlemapsKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
  
  async initializeAdds(){
    AdMob.initialize({
      requestTrackingAuthorization: true
    })
    this.showBanner();
  }

  showBanner(){
    console.log('daje');
    const adId = isPlatform('ios') ? 'ios-ad-id' : 'android-id';

    const option: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting:true,
      margin: 0
    }
  }

  showMenu(){
    
  }
}
