export class InteractionvoModel {
  constructor(public interactionId: number,
              public firstName: string,
              public lastName: string,
              public commMedium: string,
              public iaType: string,
              public timestamp: Date,
              public iaStage: number,
              public interestedProduct: string,
              public accountId: number) {}
}
