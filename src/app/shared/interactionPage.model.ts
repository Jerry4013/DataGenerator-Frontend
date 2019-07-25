import {InteractionvoModel} from './interactionvo.model';

export class InteractionPageModel {
  constructor(public totalPages: number,
              public totalElements: number,
              public currentPage: number,
              public interactionVOS: InteractionvoModel[]) {}
}
