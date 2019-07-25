import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {InteractionModel} from '../../../shared/interaction.model';
import {InteractionService} from '../../../shared/interaction.service';
import {AccountsService} from '../../../accounts/accounts.service';

@Component({
  selector: 'app-interaction-edit',
  templateUrl: './interaction-edit.component.html',
  styleUrls: ['./interaction-edit.component.css']
})
export class InteractionEditComponent implements OnInit {
  createMode = false;
  iaTypes: string[] = [];
  commMediums: string[] = [];
  @Input() contactId: number;
  iaTypeSelected: string;
  commSelected: string;

  constructor(private interactionService: InteractionService,
              private accountsService: AccountsService) { }

  ngOnInit() {
    this.interactionService.getIaTypes()
      .subscribe(data => {
        this.iaTypes = (data as string[]);
      });
    this.interactionService.getCommMediums()
      .subscribe(data => {
        this.commMediums = (data as string[]);
      });
  }

  onCreateMode() {
    this.createMode = true;
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newInteraction = new InteractionModel(0, this.contactId, value.commMedium,
      value.iaType, value.timestamp, value.iaStage, '', this.accountsService.currentAccountId);
    this.interactionService.addInteraction(newInteraction);
    this.createMode = false;
    this.iaTypeSelected = '';
    this.commSelected = '';
    this.refreshCommMediums();
    this.refreshIaTypes();
    f.reset();
  }

  onCancel() {
    this.createMode = false;
  }

  refreshCommMediums() {
    this.interactionService.getCommMediums(this.iaTypeSelected)
      .subscribe(data => {
        this.commMediums = (data as string[]);
      });
  }

  refreshIaTypes() {
    this.interactionService.getIaTypes(this.commSelected)
      .subscribe(data => {
        this.iaTypes = (data as string[]);
      });
  }


}
