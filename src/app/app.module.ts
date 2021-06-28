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
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
