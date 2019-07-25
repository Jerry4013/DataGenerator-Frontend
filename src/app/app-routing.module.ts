import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AccountComponent} from './account/account.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {JourneyComponent} from './journey/journey.component';
import {IndividualComponent} from './individual/individual.component';
import {AccountResolverService} from './accounts/account-resolver.service';
import {ContactComponent} from './contacts/contact/contact.component';
import {ContactResolverService} from './contacts/contact-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountsComponent},
  { path: 'accounts/:id', component: AccountComponent,
    resolve: {account: AccountResolverService},
    children: [
      { path: '', redirectTo: 'journey', pathMatch: 'full'},
      { path: 'journey', component: JourneyComponent },
      { path: 'contact', component: ContactsComponent}
    ] },
  { path: 'contacts', component: ContactsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'individual', component: IndividualComponent },
  { path: 'accounts/:id/contact/:contactid', component: ContactComponent,
    resolve: {contact: ContactResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
