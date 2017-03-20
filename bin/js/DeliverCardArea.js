var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var DeliverCardArea = (function (_super) {
    __extends(DeliverCardArea, _super);
    function DeliverCardArea() {
        var _this = _super.call(this) || this;
        _this.cards = new Array();
        return _this;
    }
    DeliverCardArea.prototype.popCard = function () {
        var card = this.cards.pop();
        this.removeChild(card);
        this.hideAll();
        return card;
    };
    DeliverCardArea.prototype.clearCard = function () {
        this.removeChildren(0, this.cards.length);
        this.cards.slice(0, this.cards.length);
    };
    DeliverCardArea.prototype.initCard = function () {
        this.clearCard();
        var card;
        for (var _i = 0, _a = DeliverCardArea.ALL_CARD_NAME; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            card = new Card(name_1);
            this.cards.push(card);
            this.addChild(card);
        }
        this.shuffle();
        this.hideAll();
    };
    DeliverCardArea.prototype.shuffle = function () {
        for (var i = 0; i < this.cards.length; i++) {
            var index = Math.floor(Math.random() * this.cards.length);
            var card = this.cards[i];
            this.cards[i] = this.cards[index];
            this.cards[index] = card;
        }
    };
    DeliverCardArea.prototype.hideAll = function () {
        var length = this.cards.length;
        if (length > 0) {
            var totalSpaceHafl = ((length - 1) * 1 + this.cards[0].width) / 2;
            for (var i = 0; i < length; i++) {
                this.cards[i].x = i * 1 - totalSpaceHafl;
                this.cards[i].zOrder = i;
                this.cards[i].showBack();
            }
        }
    };
    DeliverCardArea.prototype.displayRest = function () {
        if (this.cards.length > 0) {
            var totalSpaceHafl = (this.cards.length * this.cards[0].width) / 2;
            var card = void 0;
            for (var i = 0; i < this.cards.length; i++) {
                card = new Card(this.cards[i].name);
                card.x = i * this.cards[0].width - totalSpaceHafl;
                card.zOrder = i;
                card.showFace();
                this.removeChild(this.cards[i]);
                this.addChild(card);
            }
        }
    };
    return DeliverCardArea;
}(Laya.Sprite));
DeliverCardArea.ALL_CARD_NAME = [
    //黑
    Card.SPADE_2, Card.SPADE_3, Card.SPADE_4, Card.SPADE_5, Card.SPADE_6, Card.SPADE_7, Card.SPADE_8, Card.SPADE_9, Card.SPADE_10, Card.SPADE_J, Card.SPADE_Q, Card.SPADE_K, Card.SPADE_A,
    //红
    Card.HEART_2, Card.HEART_3, Card.HEART_4, Card.HEART_5, Card.HEART_6, Card.HEART_7, Card.HEART_8, Card.HEART_9, Card.HEART_10, Card.HEART_J, Card.HEART_Q, Card.HEART_K, Card.HEART_A,
    //梅
    Card.CLUB_2, Card.CLUB_3, Card.CLUB_4, Card.CLUB_5, Card.CLUB_6, Card.CLUB_7, Card.CLUB_8, Card.CLUB_9, Card.CLUB_10, Card.CLUB_J, Card.CLUB_Q, Card.CLUB_K, Card.CLUB_A,
    //方
    Card.DIAMOND_2, Card.DIAMOND_3, Card.DIAMOND_4, Card.DIAMOND_5, Card.DIAMOND_6, Card.DIAMOND_7, Card.DIAMOND_8, Card.DIAMOND_9, Card.DIAMOND_10, Card.DIAMOND_J, Card.DIAMOND_Q, Card.DIAMOND_K, Card.DIAMOND_A,
    //joker and back
    Card.COLOR_JOKER, Card.BLACK_JOKER
];
//# sourceMappingURL=DeliverCardArea.js.map