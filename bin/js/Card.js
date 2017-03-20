/*
* name;
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CardName;
(function (CardName) {
    CardName[CardName["diamond_3"] = 0] = "diamond_3";
    CardName[CardName["club_3"] = 1] = "club_3";
    CardName[CardName["heart_3"] = 2] = "heart_3";
    CardName[CardName["spade_3"] = 3] = "spade_3";
    CardName[CardName["diamond_4"] = 4] = "diamond_4";
    CardName[CardName["club_4"] = 5] = "club_4";
    CardName[CardName["heart_4"] = 6] = "heart_4";
    CardName[CardName["spade_4"] = 7] = "spade_4";
    CardName[CardName["diamond_5"] = 8] = "diamond_5";
    CardName[CardName["club_5"] = 9] = "club_5";
    CardName[CardName["heart_5"] = 10] = "heart_5";
    CardName[CardName["spade_5"] = 11] = "spade_5";
    CardName[CardName["diamond_6"] = 12] = "diamond_6";
    CardName[CardName["club_6"] = 13] = "club_6";
    CardName[CardName["heart_6"] = 14] = "heart_6";
    CardName[CardName["spade_6"] = 15] = "spade_6";
    CardName[CardName["diamond_7"] = 16] = "diamond_7";
    CardName[CardName["club_7"] = 17] = "club_7";
    CardName[CardName["heart_7"] = 18] = "heart_7";
    CardName[CardName["spade_7"] = 19] = "spade_7";
    CardName[CardName["diamond_8"] = 20] = "diamond_8";
    CardName[CardName["club_8"] = 21] = "club_8";
    CardName[CardName["heart_8"] = 22] = "heart_8";
    CardName[CardName["spade_8"] = 23] = "spade_8";
    CardName[CardName["diamond_9"] = 24] = "diamond_9";
    CardName[CardName["club_9"] = 25] = "club_9";
    CardName[CardName["heart_9"] = 26] = "heart_9";
    CardName[CardName["spade_9"] = 27] = "spade_9";
    CardName[CardName["diamond_10"] = 28] = "diamond_10";
    CardName[CardName["club_10"] = 29] = "club_10";
    CardName[CardName["heart_10"] = 30] = "heart_10";
    CardName[CardName["spade_10"] = 31] = "spade_10";
    CardName[CardName["diamond_J"] = 32] = "diamond_J";
    CardName[CardName["club_J"] = 33] = "club_J";
    CardName[CardName["heart_J"] = 34] = "heart_J";
    CardName[CardName["spade_J"] = 35] = "spade_J";
    CardName[CardName["diamond_Q"] = 36] = "diamond_Q";
    CardName[CardName["club_Q"] = 37] = "club_Q";
    CardName[CardName["heart_Q"] = 38] = "heart_Q";
    CardName[CardName["spade_Q"] = 39] = "spade_Q";
    CardName[CardName["diamond_K"] = 40] = "diamond_K";
    CardName[CardName["club_K"] = 41] = "club_K";
    CardName[CardName["heart_K"] = 42] = "heart_K";
    CardName[CardName["spade_K"] = 43] = "spade_K";
    CardName[CardName["diamond_A"] = 44] = "diamond_A";
    CardName[CardName["club_A"] = 45] = "club_A";
    CardName[CardName["heart_A"] = 46] = "heart_A";
    CardName[CardName["spade_A"] = 47] = "spade_A";
    CardName[CardName["diamond_2"] = 48] = "diamond_2";
    CardName[CardName["club_2"] = 49] = "club_2";
    CardName[CardName["heart_2"] = 50] = "heart_2";
    CardName[CardName["spade_2"] = 51] = "spade_2";
    CardName[CardName["black_joker"] = 52] = "black_joker";
    CardName[CardName["color_joker"] = 53] = "color_joker";
})(CardName || (CardName = {}));
var CardRole;
(function (CardRole) {
    CardRole[CardRole["Singe"] = 1] = "Singe";
    CardRole[CardRole["Pair"] = 2] = "Pair";
    CardRole[CardRole["Three"] = 3] = "Three";
    CardRole[CardRole["ThreeOne"] = 4] = "ThreeOne";
    CardRole[CardRole["ThreePair"] = 5] = "ThreePair";
    CardRole[CardRole["Bomb"] = 6] = "Bomb";
    CardRole[CardRole["Sequences"] = 7] = "Sequences";
    CardRole[CardRole["SequencesPair"] = 8] = "SequencesPair";
    CardRole[CardRole["SequencesThree"] = 9] = "SequencesThree";
    CardRole[CardRole["SequencesThreeSinge"] = 10] = "SequencesThreeSinge";
    CardRole[CardRole["SequencesThreePair"] = 11] = "SequencesThreePair";
})(CardRole || (CardRole = {}));
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.hue = Card.CARD_MAP[name].hue;
        _this.value = Card.CARD_MAP[name].value;
        _this.order = Card.CARD_MAP[name].order;
        _this.choose = false;
        _this.showFace();
        return _this;
    }
    Card.sort = function (cards) {
        if (cards) {
            cards.sort(function (a, b) {
                var num = CardName[b.name] - CardName[a.name];
                return num;
            });
        }
        return cards;
    };
    Card.prototype.showFace = function () {
        this.loadImage("poker/" + this.name + ".jpg");
        return this;
    };
    Card.prototype.showBack = function () {
        this.loadImage("poker/" + Card.BACK_CARD + ".jpg");
        return this;
    };
    return Card;
}(Laya.Sprite));
//黑
Card.SPADE_2 = "spade_2";
Card.SPADE_3 = "spade_3";
Card.SPADE_4 = "spade_4";
Card.SPADE_5 = "spade_5";
Card.SPADE_6 = "spade_6";
Card.SPADE_7 = "spade_7";
Card.SPADE_8 = "spade_8";
Card.SPADE_9 = "spade_9";
Card.SPADE_10 = "spade_10";
Card.SPADE_J = "spade_J";
Card.SPADE_Q = "spade_Q";
Card.SPADE_K = "spade_K";
Card.SPADE_A = "spade_A";
//红
Card.HEART_2 = "heart_2";
Card.HEART_3 = "heart_3";
Card.HEART_4 = "heart_4";
Card.HEART_5 = "heart_5";
Card.HEART_6 = "heart_6";
Card.HEART_7 = "heart_7";
Card.HEART_8 = "heart_8";
Card.HEART_9 = "heart_9";
Card.HEART_10 = "heart_10";
Card.HEART_J = "heart_J";
Card.HEART_Q = "heart_Q";
Card.HEART_K = "heart_K";
Card.HEART_A = "heart_A";
//梅
Card.CLUB_2 = "club_2";
Card.CLUB_3 = "club_3";
Card.CLUB_4 = "club_4";
Card.CLUB_5 = "club_5";
Card.CLUB_6 = "club_6";
Card.CLUB_7 = "club_7";
Card.CLUB_8 = "club_8";
Card.CLUB_9 = "club_9";
Card.CLUB_10 = "club_10";
Card.CLUB_J = "club_J";
Card.CLUB_Q = "club_Q";
Card.CLUB_K = "club_K";
Card.CLUB_A = "club_A";
//方
Card.DIAMOND_2 = "diamond_2";
Card.DIAMOND_3 = "diamond_3";
Card.DIAMOND_4 = "diamond_4";
Card.DIAMOND_5 = "diamond_5";
Card.DIAMOND_6 = "diamond_6";
Card.DIAMOND_7 = "diamond_7";
Card.DIAMOND_8 = "diamond_8";
Card.DIAMOND_9 = "diamond_9";
Card.DIAMOND_10 = "diamond_10";
Card.DIAMOND_J = "diamond_J";
Card.DIAMOND_Q = "diamond_Q";
Card.DIAMOND_K = "diamond_K";
Card.DIAMOND_A = "diamond_A";
//joker and back
Card.COLOR_JOKER = "color_joker";
Card.BLACK_JOKER = "black_joker";
Card.BACK_CARD = "back_card";
Card.CARD_MAP = {
    diamond_3: { hue: "diamond", order: 0, value: 3 },
    club_3: { hue: "club", order: 1, value: 3 },
    heart_3: { hue: "heart", order: 2, value: 3 },
    spade_3: { hue: "spade", order: 3, value: 3 },
    diamond_4: { hue: "diamond", order: 4, value: 4 },
    club_4: { hue: "club", order: 5, value: 4 },
    heart_4: { hue: "heart", order: 6, value: 4 },
    spade_4: { hue: "spade", order: 7, value: 4 },
    diamond_5: { hue: "diamond", order: 8, value: 5 },
    club_5: { hue: "club", order: 9, value: 5 },
    heart_5: { hue: "heart", order: 10, value: 5 },
    spade_5: { hue: "spade", order: 11, value: 5 },
    diamond_6: { hue: "diamond", order: 12, value: 6 },
    club_6: { hue: "club", order: 13, value: 6 },
    heart_6: { hue: "heart", order: 14, value: 6 },
    spade_6: { hue: "spade", order: 15, value: 6 },
    diamond_7: { hue: "diamond", order: 16, value: 7 },
    club_7: { hue: "club", order: 17, value: 7 },
    heart_7: { hue: "heart", order: 18, value: 7 },
    spade_7: { hue: "spade", order: 19, value: 7 },
    diamond_8: { hue: "diamond", order: 20, value: 8 },
    club_8: { hue: "club", order: 21, value: 8 },
    heart_8: { hue: "heart", order: 22, value: 8 },
    spade_8: { hue: "spade", order: 23, value: 8 },
    diamond_9: { hue: "diamond", order: 24, value: 9 },
    club_9: { hue: "club", order: 25, value: 9 },
    heart_9: { hue: "heart", order: 26, value: 9 },
    spade_9: { hue: "spade", order: 27, value: 9 },
    diamond_10: { hue: "diamond", order: 28, value: 10 },
    club_10: { hue: "club", order: 29, value: 10 },
    heart_10: { hue: "heart", order: 30, value: 10 },
    spade_10: { hue: "spade", order: 31, value: 10 },
    diamond_J: { hue: "diamond", order: 32, value: 11 },
    club_J: { hue: "club", order: 33, value: 11 },
    heart_J: { hue: "heart", order: 34, value: 11 },
    spade_J: { hue: "spade", order: 35, value: 11 },
    diamond_Q: { hue: "diamond", order: 36, value: 12 },
    club_Q: { hue: "club", order: 37, value: 12 },
    heart_Q: { hue: "heart", order: 38, value: 12 },
    spade_Q: { hue: "spade", order: 39, value: 12 },
    diamond_K: { hue: "diamond", order: 40, value: 13 },
    club_K: { hue: "club", order: 41, value: 13 },
    heart_K: { hue: "heart", order: 42, value: 13 },
    spade_K: { hue: "spade", order: 43, value: 13 },
    diamond_A: { hue: "diamond", order: 44, value: 14 },
    club_A: { hue: "club", order: 45, value: 14 },
    heart_A: { hue: "heart", order: 46, value: 14 },
    spade_A: { hue: "spade", order: 47, value: 14 },
    diamond_2: { hue: "diamond", order: 48, value: 16 },
    club_2: { hue: "club", order: 49, value: 16 },
    heart_2: { hue: "heart", order: 50, value: 16 },
    spade_2: { hue: "spade", order: 51, value: 16 },
    black_joker: { hue: "black", order: 52, value: 17 },
    color_joker: { hue: "color", order: 53, value: 18 }
};
//# sourceMappingURL=Card.js.map