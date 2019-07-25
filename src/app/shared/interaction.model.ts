export class InteractionModel {
  constructor(public interactionId: number,
              public contactId: number,
              public commMedium: string,
              public iaType: string,
              public timestamp: Date,
              public iaStage: number,
              public interestedProduct: string,
              public accountId: number) {}
}

