var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var GoCardArea = (function (_super) {
    __extends(GoCardArea, _super);
    function GoCardArea() {
        var _this = _super.call(this) || this;
        _this.cards = new Array();
        return _this;
    }
    GoCardArea.prototype.addCard = function (card) {
        var length = this.cards.push(card);
        this.addChild(card);
        var totalSpaceHafl = ((length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
        for (var i = 0; i < length; i++) {
            this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
        }
    };
    GoCardArea.prototype.clearCard = function () {
        this.removeChildren(0, this.cards.length);
        this.cards.slice(0, this.cards.length);
    };
    return GoCardArea;
}(Laya.Sprite));
//# sourceMappingURL=GoCardArea.js.map