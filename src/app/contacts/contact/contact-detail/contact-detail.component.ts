import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactModel} from '../../../shared/contact.model';
import {ContactsService} from '../../contacts.service';
import {ActivatedRoute, Data, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  contact: ContactModel;
  routeSub: Subscription;

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.data
      .subscribe(
        (data: Data) => {
          this.contact = data.contact;
        }
      );
    this.contactsService.currentContactId = this.contact.contactId;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
