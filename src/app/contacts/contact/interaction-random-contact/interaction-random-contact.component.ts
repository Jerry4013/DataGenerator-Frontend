import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IaparamsModel} from '../../../shared/iaparams.model';
import {InteractionService} from '../../../shared/interaction.service';
import {AccountsService} from '../../../accounts/accounts.service';

@Component({
  selector: 'app-interaction-random-contact',
  templateUrl: './interaction-random-contact.component.html',
  styleUrls: ['./interaction-random-contact.component.css']
})
export class InteractionRandomContactComponent implements OnInit {
  randomMode = false;
  @Input() contactId: number;

  constructor(private interactionService: InteractionService,
              private accountsService: AccountsService) { }

  ngOnInit() {

  }

  onRandomMode() {
    this.randomMode = true;
  }

  onsubmitRandom(fr: NgForm) {
    const value = fr.value;
    const newParams = new IaparamsModel(value.amount, this.contactId, value.d1, value.d2,
      value.iaStage, this.accountsService.currentAccountId);
    this.interactionService.addRandomInteractionsWithContact(newParams);
    this.randomMode = false;
  }

  onCancel() {
    this.randomMode = false;
  }
}
