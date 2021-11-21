import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TitleCaseDirective } from './directives/title-case.directive';
import { LoadingComponent } from './loading/loading.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService  } from '@angular/fire/analytics';
import { ViewTraceDirective } from './directives/view-trace.directive';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CollectContentComponent } from './collect-content/collect-content.component';
import { AnimationGroupComponent } from './animation-group/animation-group.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { NoBurnoutComponent } from './no-burnout/no-burnout.component';
import { FooterComponent } from './footer/footer.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web/build/player/lottie_svg');
}

@NgModule({
  declarations: [
    AppComponent,
    TitleCaseDirective,
    LoadingComponent,
    ViewTraceDirective,
    HomeComponent,
    NavbarComponent,
    CollectContentComponent,
    AnimationGroupComponent,
    SignUpComponent,
    HowItWorksComponent,
    NoBurnoutComponent,
    FooterComponent,
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory }), //Lottie player
    LottieCacheModule.forRoot(), //Lottie cache
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireAnalyticsModule, // analytics
    NgImageSliderModule, //Image Carousel
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
