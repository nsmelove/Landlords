var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.cards = new Array();
        _this.landlord = false;
        _this.showCard = true;
        _this.autoplay = false;
        return _this;
    }
    Player.prototype.addCard = function (card) {
        this.cards.push(card);
        this.addChild(card);
        card.on(Laya.Event.CLICK, this, this.onCardClick);
        if (this.showCard) {
            this.showAll();
        }
        else {
            this.hideAll();
        }
    };
    Player.prototype.addCards = function (cards) {
        if (cards) {
            for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                var card = cards_1[_i];
                this.cards.push(card);
                this.addChild(card);
                card.on(Laya.Event.CLICK, this, this.onCardClick);
            }
        }
        if (this.showCard) {
            this.showAll();
        }
        else {
            this.hideAll();
        }
    };
    Player.prototype.onCardClick = function (event) {
        var card = event.target;
        if (card.choose) {
            event.target.y += 20;
            card.choose = false;
        }
        else {
            event.target.y -= 20;
            card.choose = true;
        }
    };
    Player.prototype.popCard = function (card) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].name == card.name) {
                var rmCards = this.cards.splice(i, 1);
                this.removeChild(rmCards[0]);
                if (this.showCard) {
                    this.showAll();
                }
                else {
                    this.hideAll();
                }
                return rmCards[0];
            }
        }
        if (this.showCard) {
            this.showAll();
        }
        else {
            this.hideAll();
        }
        return null;
    };
    Player.prototype.removeCards = function (cards) {
        for (var _i = 0, cards_2 = cards; _i < cards_2.length; _i++) {
            var card = cards_2[_i];
            for (var i = 0; i < this.cards.length; i++) {
                if (this.cards[i].name == card.name) {
                    var rmCards = this.cards.splice(i, 1);
                    this.removeChild(rmCards[0]);
                }
            }
        }
        if (this.showCard) {
            this.showAll();
        }
        else {
            this.hideAll();
        }
        return cards;
    };
    Player.prototype.popIndexCard = function (index) {
        if (index >= 0 && index < this.cards.length) {
            var rmCards = this.cards.splice(index, 1);
            this.removeChild(rmCards[0]);
            if (this.showCard) {
                this.showAll();
            }
            else {
                this.hideAll();
            }
            return rmCards[0];
        }
        return null;
    };
    Player.prototype.chooseCards = function () {
        var cards = new Array();
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.choose) {
                cards.push(card);
            }
        }
        return cards;
    };
    Player.prototype.resetChoose = function () {
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.choose) {
                card.choose = false;
                card.y += 20;
            }
        }
    };
    Player.prototype.hideAll = function () {
        this.showCard = false;
        var length = this.cards.length;
        if (length > 0) {
            var totalSpaceHafl = ((length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
            for (var i = 0; i < length; i++) {
                this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
                this.cards[i].zOrder = i;
                this.cards[i].showBack();
            }
        }
    };
    Player.prototype.showAll = function () {
        this.showCard = true;
        var length = this.cards.length;
        if (length > 0) {
            var totalSpaceHafl = ((length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
            for (var i = 0; i < length; i++) {
                this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
                this.cards[i].zOrder = i;
                this.cards[i].showFace();
            }
        }
    };
    Player.prototype.sort = function () {
        Card.sort(this.cards);
        if (this.showCard) {
            this.showAll();
        }
        else {
            this.hideAll();
        }
    };
    //设置为地主
    Player.prototype.setLandlord = function () {
        this.landlord = true;
        var label = new Laya.Label("地主");
        label.color = "#ff0000";
        label.width = 48;
        label.height = 24;
        label.y = -40;
        this.addChild(label);
    };
    Player.prototype.showLable = function (label, text) {
        label.text = text;
        this.addChild(label);
    };
    Player.prototype.sureCards = function (lastCards) {
        if (lastCards === void 0) { lastCards = null; }
        var cards = new Array();
        if (!this.singles) {
            this.classifyCards();
        }
        if (lastCards) {
            var role = this.checkRole(lastCards);
            switch (role) {
                case CardRole.Singe:
                    for (var i = this.singles.length - 1; i >= 0; i--) {
                        if (this.singles[i].value > lastCards[0].value) {
                            var rmCards = this.singles.splice(i, 1);
                            cards.push(rmCards[0]);
                            this.popCard(rmCards[0]);
                            break;
                        }
                    }
                    break;
                case CardRole.Pair:
                    for (var i = this.pairs.length - 1; i >= 0; i--) {
                        if (this.pairs[i][0].value > lastCards[0].value) {
                            var pairs = this.pairs[i];
                            for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                                var card = pairs_1[_i];
                                cards.push(card);
                                this.popCard(card);
                            }
                            this.pairs.splice(i, 1);
                            break;
                        }
                    }
                    break;
                case CardRole.Three:
                    for (var i = this.threes.length - 1; i >= 0; i--) {
                        if (this.threes[i][0].value > lastCards[0].value) {
                            var threes = this.threes[i];
                            for (var _a = 0, threes_1 = threes; _a < threes_1.length; _a++) {
                                var card = threes_1[_a];
                                cards.push(card);
                                this.popCard(card);
                            }
                            this.threes.splice(i, 1);
                            break;
                        }
                    }
                    break;
                case CardRole.ThreeOne:
                    if (this.singles.length > 0) {
                        for (var i = this.threes.length - 1; i >= 0; i--) {
                            if (this.threes[i][0].value > lastCards[1].value) {
                                var threes = this.threes[i];
                                for (var _b = 0, threes_2 = threes; _b < threes_2.length; _b++) {
                                    var card_1 = threes_2[_b];
                                    cards.push(card_1);
                                    this.popCard(card_1);
                                }
                                this.threes.splice(i, 1);
                                var card = this.singles.pop();
                                cards.push(card);
                                this.popCard(card);
                                break;
                            }
                        }
                    }
                    break;
                case CardRole.ThreePair:
                    if (this.pairs.length > 0) {
                        for (var i = this.threes.length - 1; i >= 0; i--) {
                            if (this.threes[i][0].value > lastCards[2].value) {
                                var threes = this.threes[i];
                                for (var _c = 0, threes_3 = threes; _c < threes_3.length; _c++) {
                                    var card = threes_3[_c];
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                this.threes.splice(i, 1);
                                var pairs = this.pairs.pop();
                                for (var _d = 0, pairs_2 = pairs; _d < pairs_2.length; _d++) {
                                    var card = pairs_2[_d];
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                break;
                            }
                        }
                    }
                    break;
                case CardRole.Bomb:
                    for (var i = this.bombs.length - 1; i >= 0; i--) {
                        if (this.bombs[i][0].value > lastCards[0].value) {
                            var bombs = this.bombs[i];
                            for (var _e = 0, bombs_1 = bombs; _e < bombs_1.length; _e++) {
                                var card = bombs_1[_e];
                                cards.push(card);
                                this.popCard(card);
                            }
                            this.bombs.splice(i, 1);
                            break;
                        }
                    }
                    break;
                case CardRole.Sequences:
                    var fitIndex = -1;
                    var minLength = 0;
                    for (var i = this.sequences.length - 1; i >= 0; i--) {
                        if (this.sequences[i].length > minLength && this.sequences[i].length >= lastCards.length && this.sequences[i][0].value > lastCards[0].value) {
                            fitIndex = i;
                            minLength = this.sequences[i].length;
                        }
                    }
                    minLength = lastCards.length;
                    if (fitIndex >= 0) {
                        var sequences = this.sequences.splice(fitIndex, 1);
                        for (var _f = 0, _g = sequences[0]; _f < _g.length; _f++) {
                            var card = _g[_f];
                            cards.push(card);
                            this.popCard(card);
                            minLength--;
                            if (minLength == 0) {
                                this.classifyCards();
                                break;
                            }
                        }
                    }
                    break;
                case CardRole.SequencesPair:
                    var seqNum = 0;
                    var endIndex = -1;
                    for (var i = this.pairs.length - 1; i >= 0; i--) {
                        if (this.pairs[i][0].value > lastCards[lastCards.length - 1].value) {
                            if (seqNum == 0) {
                                seqNum = 1;
                            }
                            else if (this.pairs[i][0].value - this.pairs[i + 1][0].value == 1) {
                                seqNum++;
                                if (seqNum * 2 >= lastCards.length) {
                                    endIndex = i;
                                    break;
                                }
                            }
                            else {
                                seqNum = 1;
                            }
                        }
                    }
                    if (endIndex > 0) {
                        var pairs = this.pairs.splice(endIndex, seqNum);
                        for (var _h = 0, pairs_3 = pairs; _h < pairs_3.length; _h++) {
                            var pair = pairs_3[_h];
                            for (var _j = 0, pair_1 = pair; _j < pair_1.length; _j++) {
                                var card = pair_1[_j];
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                    }
                    break;
                case CardRole.SequencesThree:
                    var threeNum = lastCards.length / 3;
                case CardRole.SequencesThreeSinge:
                    threeNum = lastCards.length / 4;
                    if (this.singles.length + this.pairs.length < threeNum) {
                        break;
                    }
                case CardRole.SequencesThreePair:
                    threeNum = lastCards.length / 5;
                    if (this.pairs.length < threeNum) {
                        break;
                    }
                    seqNum = 0;
                    endIndex = -1;
                    var minValue = -1;
                    for (var i = lastCards.length - 3; i >= 0; i--) {
                        if (lastCards[i].value == lastCards[i + 1].value && lastCards[i + 1].value == lastCards[i + 2].value) {
                            minValue = lastCards[i].value;
                        }
                    }
                    for (var i = this.threes.length - 1; i >= 0; i--) {
                        if (this.threes[i][0].value > minValue) {
                            if (seqNum == 0) {
                                seqNum = 1;
                            }
                            else if (this.threes[i][0].value - this.threes[i - 1][0].value == 1) {
                                seqNum++;
                                if (seqNum >= threeNum) {
                                    endIndex = i;
                                    break;
                                }
                            }
                            else {
                                seqNum = 1;
                            }
                        }
                    }
                    if (endIndex > 0) {
                        var pairs = this.pairs.splice(endIndex, seqNum);
                        for (var _k = 0, pairs_4 = pairs; _k < pairs_4.length; _k++) {
                            var pair = pairs_4[_k];
                            for (var _l = 0, pair_2 = pair; _l < pair_2.length; _l++) {
                                var card = pair_2[_l];
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                        if (role == CardRole.SequencesThreeSinge) {
                            while (seqNum > 0 && this.singles.length > 0) {
                                var card = this.singles.pop();
                                cards.push(card);
                                this.popCard(card);
                                seqNum--;
                            }
                            while (seqNum > 0 && this.pairs.length > 0) {
                                var pairs_5 = this.pairs.pop();
                                for (var _m = 0, pairs_6 = pairs_5; _m < pairs_6.length; _m++) {
                                    var card = pairs_6[_m];
                                    if (seqNum > 0) {
                                        cards.push(card);
                                        this.popCard(card);
                                        seqNum--;
                                    }
                                    else {
                                        this.singles.push(card);
                                        Card.sort(this.singles);
                                    }
                                }
                            }
                        }
                        else if (role == CardRole.SequencesThreePair) {
                            while (seqNum > 0 && this.pairs.length > 0) {
                                var pairs_7 = this.pairs.pop();
                                for (var _o = 0, pairs_8 = pairs_7; _o < pairs_8.length; _o++) {
                                    var card = pairs_8[_o];
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                seqNum--;
                            }
                        }
                    }
                    break;
            }
        }
        else {
            if (this.singles.length > this.threes.length && this.singles.length >= this.pairs.length) {
                var card = this.singles.pop();
                cards.push(card);
                this.popCard(card);
            }
            else if (this.pairs.length > this.threes.length && this.pairs.length > this.singles.length) {
                var pairs = this.pairs.pop();
                for (var _p = 0, pairs_9 = pairs; _p < pairs_9.length; _p++) {
                    var card = pairs_9[_p];
                    cards.push(card);
                    this.popCard(card);
                }
            }
            else if (this.threes.length > 0) {
                var threes = this.threes.pop();
                for (var _q = 0, threes_4 = threes; _q < threes_4.length; _q++) {
                    var card = threes_4[_q];
                    cards.push(card);
                    this.popCard(card);
                }
                if (this.singles.length > 0 || this.pairs.length > 0) {
                    if (this.singles.length >= this.pairs.length) {
                        if ((this.pairs.length == 0 && this.threes.length == 0) || this.singles[this.singles.length - 1].value < 16) {
                            var card = this.singles.pop();
                            cards.push(card);
                            this.popCard(card);
                        }
                        else if (this.pairs.length > 0) {
                            var pairs = this.pairs.pop();
                            for (var _r = 0, pairs_10 = pairs; _r < pairs_10.length; _r++) {
                                var card = pairs_10[_r];
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                    }
                    else {
                        if ((this.singles.length == 0 && this.threes.length == 0) || this.pairs[this.pairs.length - 1][0].value < 16) {
                            var pairs = this.pairs.pop();
                            for (var _s = 0, pairs_11 = pairs; _s < pairs_11.length; _s++) {
                                var card = pairs_11[_s];
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                    }
                }
            }
            else if (this.sequences.length > 0) {
                var sequences = this.sequences.pop();
                for (var _t = 0, sequences_1 = sequences; _t < sequences_1.length; _t++) {
                    var card = sequences_1[_t];
                    cards.push(card);
                    this.popCard(card);
                }
            }
            else if (this.bombs.length > 0) {
                var bombs = this.bombs.pop();
                for (var _u = 0, bombs_2 = bombs; _u < bombs_2.length; _u++) {
                    var card = bombs_2[_u];
                    cards.push(card);
                    this.popCard(card);
                }
            }
        }
        this.sort();
        Card.sort(cards);
        return cards;
    };
    Player.prototype.classifyCards = function () {
        this.singles = new Array();
        this.sequences = new Array();
        this.pairs = new Array();
        this.threes = new Array();
        this.bombs = new Array();
        if (this.cards.length == 0) {
            return;
        }
        if (this.cards.length == 1) {
            this.singles.push(this.cards[0]);
            return;
        }
        var beginSeq = 0;
        if (this.cards[1].name == Card.BLACK_JOKER) {
            this.bombs.push([this.cards[0], this.cards[1]]);
            beginSeq = 2;
        }
        else if (this.cards[0].name == Card.COLOR_JOKER || this.cards[0].name == Card.BLACK_JOKER) {
            this.singles.push(this.cards[0]);
            beginSeq = 1;
        }
        if (beginSeq == this.cards.length - 1) {
            this.singles.push(this.cards[beginSeq]);
            return;
        }
        else if (beginSeq > this.cards.length - 1) {
            return;
        }
        var seqIndexs = new Array();
        seqIndexs.push(beginSeq);
        var difValue;
        for (var i = beginSeq + 1; i <= this.cards.length; i++) {
            if (i < this.cards.length) {
                difValue = this.cards[i - 1].value - this.cards[i].value;
            }
            else {
                difValue = this.cards[i - 1].value;
            }
            if (difValue == 1) {
                seqIndexs.push(i);
            }
            else if (difValue != 0) {
                //console.log(seqIndexs);
                if (i - seqIndexs[0] <= 1) {
                    this.singles.push(this.cards[seqIndexs[0]]);
                }
                else {
                    for (var j = seqIndexs[0] + 1, sameNum = 0; j <= i; j++) {
                        if (j < i) {
                            difValue = this.cards[j - 1].value - this.cards[j].value;
                        }
                        else {
                            difValue = this.cards[j - 1].value;
                        }
                        if (difValue == 0) {
                            sameNum++;
                        }
                        else {
                            if (sameNum == 0) {
                                if (seqIndexs.length < 5) {
                                    this.singles.push(this.cards[j - 1]);
                                    seqIndexs.splice(seqIndexs.indexOf(j - 1), 1);
                                }
                                else {
                                }
                            }
                            else if (sameNum == 1) {
                                if (seqIndexs.length < 5) {
                                    this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                    seqIndexs.splice(seqIndexs.indexOf(j - 2), 1);
                                }
                                else {
                                    var index = seqIndexs.indexOf(j - 2);
                                    if (index == 0 && seqIndexs.length > 5) {
                                        this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    }
                                    else if (index == seqIndexs.length - 1 && seqIndexs.length > 5) {
                                        this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    }
                                    else {
                                        this.singles.push(this.cards[j - 1]);
                                    }
                                }
                            }
                            else if (sameNum == 2) {
                                var index = seqIndexs.indexOf(j - 3);
                                if (seqIndexs.length < 5) {
                                    this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                    seqIndexs.splice(index, 1);
                                }
                                else {
                                    if (index == 0 && seqIndexs.length > 5) {
                                        this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    }
                                    else if (index == seqIndexs.length - 1 && seqIndexs.length > 5) {
                                        this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    }
                                    else {
                                        this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                    }
                                }
                            }
                            else if (sameNum == 3) {
                                var index = seqIndexs.indexOf(j - 4);
                                if (seqIndexs.length < 5) {
                                    this.bombs.push([this.cards[j - 4], this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                    seqIndexs.splice(seqIndexs.indexOf(j - 4), 1);
                                }
                                else {
                                    var singleNum = 0;
                                    if (index > 2 && index < 5 && seqIndexs.length - 1 - index > 2 && seqIndexs.length - 1 - index < 5) {
                                        this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                    }
                                    else {
                                        this.bombs.push([this.cards[j - 4], this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                        var rms = seqIndexs.splice(0, index);
                                        if (rms.length >= 5) {
                                            var seq = new Array();
                                            for (var index_1 = 0; index_1 < rms.length; index_1++) {
                                                seq.push(this.cards[rms[index_1]]);
                                            }
                                            this.sequences.push(seq);
                                        }
                                        else {
                                            for (var index_2 = 0; index_2 < rms.length; index_2++) {
                                                this.singles.push(this.cards[rms[index_2]]);
                                            }
                                        }
                                        seqIndexs.splice(0, 1);
                                        rms = seqIndexs.splice(0, seqIndexs.length);
                                        if (rms.length >= 5) {
                                            var seq = new Array();
                                            for (var index_3 = 0; index_3 < rms.length; index_3++) {
                                                seq.push(this.cards[rms[index_3]]);
                                            }
                                            this.sequences.push(seq);
                                        }
                                        else {
                                            for (var index_4 = 0; index_4 < rms.length; index_4++) {
                                                this.singles.push(this.cards[rms[index_4]]);
                                            }
                                        }
                                    }
                                }
                            }
                            sameNum = 0;
                        }
                    }
                }
                if (seqIndexs.length >= 5) {
                    var seq = new Array();
                    for (var index = 0; index < seqIndexs.length; index++) {
                        seq.push(this.cards[seqIndexs[index]]);
                    }
                    this.sequences.push(seq);
                }
                seqIndexs.length = 0;
                seqIndexs.push(i);
            }
        }
    };
    Player.prototype.greaterThan = function (myCards, lastCards) {
        var myRole = this.checkRole(myCards);
        if (!myRole) {
            return false;
        }
        var lastRole = this.checkRole(lastCards);
        if (!lastRole) {
            return false;
        }
        if (myRole == CardRole.Bomb && lastRole != CardRole.Bomb) {
            return true;
        }
        if (myRole != lastRole) {
            return false;
        }
        switch (myRole) {
            case CardRole.Singe:
                if (myCards[0].value > lastCards[0].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.Pair:
                if (myCards[0].value > lastCards[0].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.Three:
            case CardRole.ThreeOne:
            case CardRole.ThreePair:
                if (myCards[2].value > lastCards[2].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.Bomb:
                if (myCards[0].value > lastCards[0].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.Sequences:
                if (myCards.length == lastCards.length && myCards[0].value > lastCards[0].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.SequencesPair:
                if (myCards.length == lastCards.length && myCards[0].value > lastCards[0].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.SequencesThree:
                if (myCards.length == lastCards.length && myCards[0].value > lastCards[0].value) {
                    return true;
                }
                else {
                    return false;
                }
            case CardRole.SequencesThreeSinge:
            case CardRole.SequencesThreePair:
                if (myCards.length == lastCards.length) {
                    var myFirtValue = -1;
                    for (var i = myCards.length - 3; i >= 0; i--) {
                        if (myCards[i].value == myCards[i + 1].value && myCards[i].value == myCards[i + 2].value) {
                            myFirtValue = myCards[i].value;
                        }
                    }
                    var lastFirtValue = -1;
                    for (var i = lastCards.length - 3; i >= 0; i--) {
                        if (lastCards[i].value == lastCards[i + 1].value && lastCards[i].value == lastCards[i + 2].value) {
                            lastFirtValue = lastCards[i].value;
                        }
                    }
                    if (myFirtValue > lastFirtValue) {
                        return true;
                    }
                }
                return false;
        }
    };
    //检测出牌对应的规则
    Player.prototype.checkRole = function (cards) {
        if (!cards) {
            return null;
        }
        Card.sort(cards);
        if (cards.length == 1) {
            return CardRole.Singe;
        }
        else if (cards.length == 2) {
            if (cards[0].value == cards[1].value) {
                return CardRole.Pair;
            }
            else if (cards[1].name == Card.BLACK_JOKER && cards[0].name == Card.COLOR_JOKER) {
                return CardRole.Bomb;
            }
        }
        else if (cards.length == 3) {
            if (cards[0].value == cards[1].value && cards[0].value == cards[2].value) {
                return CardRole.Three;
            }
        }
        else if (cards.length == 4) {
            if (cards[0].value == cards[1].value && cards[0].value == cards[2].value && cards[0].value == cards[3].value) {
                return CardRole.Bomb;
            }
            else if (cards[1].value == cards[2].value && (cards[0].value == cards[1].value || cards[2].value == cards[3].value)) {
                return CardRole.ThreeOne;
            }
        }
        else if (cards.length == 5) {
            if (cards[0].value - cards[1].value == 1 && cards[1].value - cards[2].value == 1
                && cards[2].value - cards[3].value == 1 && cards[3].value - cards[4].value == 1) {
                return CardRole.Sequences;
            }
            else if (cards[0].value == cards[1].value && cards[3].value == cards[4].value
                && (cards[1].value == cards[2].value || cards[2].value == cards[3].value)) {
                return CardRole.ThreePair;
            }
        }
        else if (cards.length >= 6) {
            var seq = true;
            var pairNum = 0, lastPairValue = -1, seqPair = true;
            var threeNum = 0, lastThreeValue = -1, seqThree = true;
            for (var i = cards.length - 2; i >= 0; i--) {
                if (cards[i].value - cards[i + 1].value != 1) {
                    seq = false;
                    if (cards[i].value == cards[i + 1].value) {
                        if (i + 2 < cards.length && cards[i].value == cards[i + 2].value) {
                            threeNum++;
                            if (lastThreeValue > 0 && cards[i].value - lastThreeValue != 1) {
                                seqThree = false;
                            }
                            lastThreeValue = cards[i].value;
                        }
                        else if (i - 1 <= 0 || cards.length && cards[i].value != cards[i - 1].value) {
                            pairNum++;
                            if (lastPairValue > 0 && cards[i].value - lastPairValue != 1) {
                                seqThree = false;
                            }
                            lastPairValue = cards[i].value;
                        }
                    }
                }
            }
            if (seq) {
                return CardRole.Sequences;
            }
            else if (seqPair && pairNum * 2 == cards.length) {
                return CardRole.SequencesPair;
            }
            else if (seqThree) {
                if (threeNum == pairNum && threeNum * 5 == cards.length) {
                    return CardRole.SequencesThreePair;
                }
                else if (threeNum * 4 == cards.length) {
                    return CardRole.SequencesThreeSinge;
                }
            }
        }
        return null;
    };
    //返回从此卡牌开始对应规则的出牌
    Player.prototype.roleCards = function (index, role) {
        if (index < 0 || index >= this.cards.length) {
            return null;
        }
        var cards = new Array();
        cards.push(this.cards[index]);
        switch (role) {
            case CardRole.Singe:
                return cards;
            case CardRole.Pair:
                if (index - 1 >= 0 && this.cards[index - 1].value == this.cards[index].value) {
                    cards.push(this.cards[index - 1]);
                    return cards;
                }
                break;
            case CardRole.Three:
                if (index - 2 >= 0 && this.cards[index - 1].value == this.cards[index].value && this.cards[index - 2].value == this.cards[index].value) {
                    cards.push(this.cards[index - 1]);
                    cards.push(this.cards[index - 2]);
                    return cards;
                }
                break;
            case CardRole.ThreeOne:
                if (index - 2 >= 0 && this.cards[index - 1].value == this.cards[index].value && this.cards[index - 2].value == this.cards[index].value) {
                    cards.push(this.cards[index - 1]);
                    cards.push(this.cards[index - 2]);
                    for (var i = this.cards.length; i >= 0; i--) {
                        var roles = this.cardRoles(i);
                        if (roles.length == 1) {
                            cards.push(this.cards[i]);
                            return cards;
                        }
                    }
                }
                break;
            case CardRole.ThreePair:
                if (index - 2 >= 0 && this.cards[index - 1].value == this.cards[index].value && this.cards[index - 2].value == this.cards[index].value) {
                    cards.push(this.cards[index - 1]);
                    cards.push(this.cards[index - 2]);
                    for (var i = this.cards.length; i >= 0; i--) {
                        var roles = this.cardRoles(i);
                        if (roles.length == 2 && roles[1] == CardRole.Pair) {
                            cards.push(this.cards[i]);
                            cards.push(this.cards[i - 1]);
                            return cards;
                        }
                    }
                }
                break;
            case CardRole.Bomb:
                if (index - 1 >= 0 && this.cards[index].name == Card.BLACK_JOKER && this.cards[index - 1].name == Card.COLOR_JOKER) {
                    cards.push(this.cards[index - 1]);
                    return cards;
                }
                else if (index - 3 >= 0 && this.cards[index - 1].value == this.cards[index].value
                    && this.cards[index - 2].value == this.cards[index].value && this.cards[index - 3].value == this.cards[index].value) {
                    cards.push(this.cards[index - 1]);
                    cards.push(this.cards[index - 2]);
                    cards.push(this.cards[index - 3]);
                    return cards;
                }
                break;
            case CardRole.Sequences:
                var currentValue = this.cards[index].value;
                for (var i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == 1) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                    }
                }
                if (cards.length >= 5) {
                    return cards;
                }
                break;
            case CardRole.SequencesPair:
                currentValue = this.cards[index].value;
                var currentDiffer = 0;
                for (var i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        currentDiffer = 1 - currentDiffer;
                    }
                }
                if (cards.length >= 6 && cards.length % 2 == 0) {
                    return cards;
                }
                break;
            case CardRole.SequencesThree:
                currentValue = this.cards[index].value;
                currentDiffer = 0;
                for (var i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        if ((i - index) % 3 == 0) {
                            currentDiffer = 1;
                        }
                        else {
                            currentDiffer = 0;
                        }
                    }
                }
                if (cards.length >= 6 && cards.length % 3 == 0) {
                    return cards;
                }
                break;
            case CardRole.SequencesThreeSinge:
                currentValue = this.cards[index].value;
                currentDiffer = 0;
                for (var i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        if ((i - index) % 3 == 0) {
                            currentDiffer = 1;
                        }
                        else {
                            currentDiffer = 0;
                        }
                    }
                }
                if (cards.length >= 6 && cards.length % 3 == 0) {
                    //TODO
                    return cards;
                }
                break;
            case CardRole.SequencesThreePair:
                currentValue = this.cards[index].value;
                currentDiffer = 0;
                for (var i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        if ((i - index) % 3 == 0) {
                            currentDiffer = 1;
                        }
                        else {
                            currentDiffer = 0;
                        }
                    }
                }
                if (cards.length >= 6 && cards.length % 3 == 0) {
                    //TODO
                    return cards;
                }
                break;
        }
        return null;
    };
    //此卡牌能能出的所有规则(单双三顺炸)
    Player.prototype.cardRoles = function (index) {
        var roles = new Array();
        roles.push(CardRole.Singe);
        if ((index - 1 == 0 && this.cards[index].name == Card.BLACK_JOKER) || (index == 0 && this.cards[index + 1].name == Card.BLACK_JOKER)) {
            roles.push(CardRole.Bomb);
        }
        var sameNum = 1;
        var seqNum = 1;
        var lastValue = this.cards[index].value;
        for (var i = index - 1; i >= 0; i--) {
            if (this.cards[i].value == this.cards[index].value) {
                sameNum++;
            }
            else if (this.cards[i].value - lastValue == 1) {
                seqNum++;
                lastValue = this.cards[i].value;
            }
        }
        for (var i = index + 1; i < this.cards.length; i++) {
            if (this.cards[i].value == this.cards[index].value) {
                sameNum++;
            }
            else if (this.cards[i].value - lastValue == -1) {
                seqNum++;
                lastValue = this.cards[i].value;
            }
        }
        if (seqNum >= 5) {
            roles.push(CardRole.Sequences);
        }
        if (sameNum >= 4) {
            roles.push(CardRole.Bomb);
            roles.push(CardRole.Three);
            roles.push(CardRole.Pair);
        }
        else if (sameNum == 3) {
            roles.push(CardRole.Three);
            roles.push(CardRole.Pair);
        }
        else if (sameNum == 2) {
            roles.push(CardRole.Pair);
        }
        return roles;
    };
    return Player;
}(Laya.Sprite));
//卡牌之间的间距
Player.CARD_SPACE = 20;
//# sourceMappingURL=Player.js.map