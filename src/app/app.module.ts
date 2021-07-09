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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { TitleCaseDirective } from './directives/title-case.directive';

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
    TitleCaseDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
