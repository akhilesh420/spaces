import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { BenefitsComponent } from './home/benefits/benefits.component';
import { MissionStatementComponent } from './home/mission-statement/mission-statement.component';
import { CollectionComponent } from './home/how-it-works/collection/collection.component';
import { CreateComponent } from './home/how-it-works/create/create.component';
import { ShareComponent } from './home/how-it-works/share/share.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpBannerComponent } from './home/sign-up-banner/sign-up-banner.component';
import { IntroComponent } from './intro/intro.component';
import { MessageComponent } from './sign-up/message/message.component';
import { FormsModule } from '@angular/forms';
import { TitleCaseDirective } from './directives/title-case.directive';
import { LoadingComponent } from './loading/loading.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService  } from '@angular/fire/analytics';
import { ViewTraceDirective } from './directives/view-trace.directive';
import { BannerComponent } from './banners/banner/banner.component';
import { BannerBComponent } from './banners/banner-b/banner-b.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingBannerComponent } from './main/landing-banner/landing-banner.component';
import { HowItWorksBComponent } from './main/how-it-works-b/how-it-works-b.component';
import { CardOneComponent } from './main/how-it-works-b/card-one/card-one.component';
import { CardTwoComponent } from './main/how-it-works-b/card-two/card-two.component';
import { CardThreeComponent } from './main/how-it-works-b/card-three/card-three.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowItWorksComponent,
    BenefitsComponent,
    MissionStatementComponent,
    CollectionComponent,
    CreateComponent,
    ShareComponent,
    SignUpComponent,
    SignUpBannerComponent,
    IntroComponent,
    MessageComponent,
    TitleCaseDirective,
    LoadingComponent,
    ViewTraceDirective,
    BannerComponent,
    BannerBComponent,
    MainComponent,
    NavbarComponent,
    LandingBannerComponent,
    HowItWorksBComponent,
    CardOneComponent,
    CardTwoComponent,
    CardThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireAnalyticsModule, // analytics
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
