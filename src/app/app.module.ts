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

@NgModule({
  declarations: [
    AppComponent,
    TitleCaseDirective,
    LoadingComponent,
    ViewTraceDirective,
    HomeComponent,
    NavbarComponent,
    CollectContentComponent,
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
