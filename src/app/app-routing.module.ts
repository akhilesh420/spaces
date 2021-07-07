import { MessageComponent } from './sign-up/message/message.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {path: '', component: IntroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'message', component: MessageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
