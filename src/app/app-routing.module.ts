import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewWordComponent } from './add-new-word/add-new-word.component';
import { GuessClanComponent } from './guess-clan/guess-clan.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'create-word', component: AddNewWordComponent },
  { path: 'guess-articles', component: GuessClanComponent },
  { path: '', component: HomeComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
