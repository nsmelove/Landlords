var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var ShowCardArea = (function (_super) {
    __extends(ShowCardArea, _super);
    function ShowCardArea() {
        var _this = _super.call(this) || this;
        _this.cards = new Array();
        return _this;
    }
    ShowCardArea.prototype.addCards = function (cards, player) {
        this.clearCard();
        this.cardPlayer = player;
        for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
            var card = cards_1[_i];
            length = this.cards.push(card);
            this.addChild(card);
        }
        var totalSpaceHafl = ((this.cards.length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
        for (var i = 0; i < length; i++) {
            this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
            this.cards[i].showFace();
        }
        var values = new Array();
        for (var _a = 0, _b = this.cards; _a < _b.length; _a++) {
            var card = _b[_a];
            values.push(card.value);
        }
        console.log(this.cardPlayer.name, values);
    };
    ShowCardArea.prototype.addCard = function (card, player) {
        this.clearCard();
        this.cardPlayer = player;
        length = this.cards.push(card);
        this.addChild(card);
        var totalSpaceHafl = ((this.cards.length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
        for (var i = 0; i < length; i++) {
            this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
            this.cards[i].showFace();
        }
        var values = new Array();
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card_1 = _a[_i];
            values.push(card_1.value);
        }
        console.log(this.cardPlayer.name, values);
    };
    ShowCardArea.prototype.clearCard = function () {
        this.removeChildren(0, this.cards.length);
        this.cards.splice(0, this.cards.length);
    };
    return ShowCardArea;
}(Laya.Sprite));
//# sourceMappingURL=ShowCardArea.js.map