import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ContactsComponent } from './contacts/contacts.component';
import {FormsModule} from '@angular/forms';
import {DropdownDirective} from './shared/dropdown.directive';
import { AccountComponent } from './account/account.component';
import {AppRoutingModule} from './app-routing.module';
import {AccountsService} from './accounts/accounts.service';
import { JourneyComponent } from './journey/journey.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { InteractionComponent } from './interaction/interaction.component';
import { IndividualComponent } from './individual/individual.component';
import { AccountsEditComponent } from './accounts/accounts-edit/accounts-edit.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import {AccountResolverService} from './accounts/account-resolver.service';
import {HttpClientModule} from '@angular/common/http';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { PagingComponent } from './paging/paging.component';
import {ContactsService} from './contacts/contacts.service';
import { ContactRandomComponent } from './contacts/contact-random/contact-random.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactDetailComponent } from './contacts/contact/contact-detail/contact-detail.component';
import {ContactResolverService} from './contacts/contact-resolver.service';
import { InteractionListComponent } from './contacts/contact/interaction-list/interaction-list.component';
import { InteractionEditComponent } from './contacts/contact/interaction-edit/interaction-edit.component';
import {InteractionService} from './shared/interaction.service';
import { InteractionRandomContactComponent } from './contacts/contact/interaction-random-contact/interaction-random-contact.component';
import {PagingService} from './shared/paging.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountsComponent,
    ContactsComponent,
    DropdownDirective,
    AccountComponent,
    JourneyComponent,
    AccountDetailComponent,
    SignupComponent,
    LoginComponent,
    InteractionComponent,
    IndividualComponent,
    AccountsEditComponent,
    AccountListComponent,
    ContactListComponent,
    ContactEditComponent,
    PagingComponent,
    ContactRandomComponent,
    ContactComponent,
    ContactDetailComponent,
    InteractionListComponent,
    InteractionEditComponent,
    InteractionRandomContactComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AccountsService,
    AccountResolverService,
    ContactResolverService,
    ContactsService,
    InteractionService,
    PagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
