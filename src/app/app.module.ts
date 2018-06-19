import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { PAGES_COMPONENTS } from './pages';
import { SHARED_COMPONENTS, SHARED_SERVICES, SHARED_PIPES } from './shared';

@NgModule({
  declarations: [
    MyApp,
    PAGES_COMPONENTS,
    SHARED_COMPONENTS,
    SHARED_PIPES
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp/*,{tabsPlacement: 'bottom'}*/)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PAGES_COMPONENTS,
    SHARED_COMPONENTS
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SHARED_SERVICES,
  ]
})
export class AppModule {}
