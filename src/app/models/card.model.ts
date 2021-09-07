export class Card {

  constructor(
    public cardNumber: number,
    public tile: string,
    public subtitle: string,
    public subCard_1: SubCard
  ) {}
}

export class SubCard {

  constructor(
    public animation: string,
    public title: string,
    public information: string,
  ){}
}
