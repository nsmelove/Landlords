/*
* name;
*/
class ShowCardArea extends Laya.Sprite {
    cardPlayer: Player;
    cards: Array<Card>;
    constructor() {
        super();
        this.cards = new Array<Card>()
    }

    public addCards(cards: Array<Card>, player: Player) {
        this.clearCard();
        this.cardPlayer = player;
        for (let card of cards) {
            length = this.cards.push(card);
            this.addChild(card);
        }

        let totalSpaceHafl = ((this.cards.length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
        for (let i = 0; i < length; i++) {
            this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
            this.cards[i].showFace();
        }
        let values = new Array();
        for(let card of this.cards) {
            values.push(card.value);
        }
        console.log(this.cardPlayer.name, values);
    }

    public addCard(card: Card, player: Player) {
        this.clearCard();
        this.cardPlayer = player;
        length = this.cards.push(card);
        this.addChild(card);
        let totalSpaceHafl = ((this.cards.length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
        for (let i = 0; i < length; i++) {
            this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
            this.cards[i].showFace();
        }
        let values = new Array();
        for(let card of this.cards) {
            values.push(card.value);
        }
        console.log(this.cardPlayer.name, values);
    }

    public clearCard() {
        this.removeChildren(0, this.cards.length);
        this.cards.splice(0, this.cards.length);
    }
}