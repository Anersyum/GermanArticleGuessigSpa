import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewWordComponent } from './add-new-word/add-new-word.component';
import { GuessClanComponent } from './guess-clan/guess-clan.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: 'create-word', component: AddNewWordComponent, canActivate: [AuthGuard] },
  { path: 'guess-articles', component: GuessClanComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
