/*
* name;
*/
class Player extends Laya.Sprite {
    //卡牌之间的间距
    static CARD_SPACE: number = 20;
    name:string
    cards: Array<Card>;
    showCard: boolean;
    landlord: boolean;
    autoplay: boolean;
    

    singles: Array<Card>;
    sequences: Array<Array<Card>>;
    pairs: Array<Array<Card>>;
    threes: Array<Array<Card>>;
    bombs: Array<Array<Card>>;

    constructor(name:string) {
        super();
        this.name= name;
        this.cards = new Array<Card>();
        this.landlord = false;
        this.showCard = true;
        this.autoplay = false;
    }

    public addCard(card: Card) {
        this.cards.push(card);
        this.addChild(card);
        card.on(Laya.Event.CLICK, this, this.onCardClick);
        if (this.showCard) {
            this.showAll();
        } else {
            this.hideAll();
        }
    }

    public addCards(cards: Array<Card>) {
        if (cards) {
            for (let card of cards) {
                this.cards.push(card);
                this.addChild(card);
                card.on(Laya.Event.CLICK, this, this.onCardClick);
            }
        }
        if (this.showCard) {
            this.showAll();
        } else {
            this.hideAll();
        }
    }

    public onCardClick(event: Laya.Event) {
        let card = event.target as Card;
        if (card.choose) {
            event.target.y += 20;
            card.choose = false;
        } else {
            event.target.y -= 20;
            card.choose = true;
        }

    }

    public popCard(card: Card): Card {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].name == card.name) {
                let rmCards = this.cards.splice(i, 1);
                this.removeChild(rmCards[0]);
                if (this.showCard) {
                    this.showAll();
                } else {
                    this.hideAll();
                }
                return rmCards[0];
            }
        }
        if (this.showCard) {
            this.showAll();
        } else {
            this.hideAll();
        }
        return null;
    }

    public removeCards(cards: Array<Card>): Array<Card> {
        for (let card of cards) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].name == card.name) {
                    let rmCards = this.cards.splice(i, 1);
                    this.removeChild(rmCards[0]);
                }
            }
        }
        if (this.showCard) {
            this.showAll();
        } else {
            this.hideAll();
        }
        return cards;
    }

    public popIndexCard(index: number): Card {
        if (index >= 0 && index < this.cards.length) {
            let rmCards = this.cards.splice(index, 1);
            this.removeChild(rmCards[0]);
            if (this.showCard) {
                this.showAll();
            } else {
                this.hideAll();
            }
            return rmCards[0];
        }
        return null;

    }

    public chooseCards(): Array<Card> {
        let cards = new Array<Card>();
        for (let card of this.cards) {
            if (card.choose) {
                cards.push(card);
            }
        }
        return cards;
    }

    public resetChoose() {
        for (let card of this.cards) {
            if (card.choose) {
                card.choose = false;
                card.y += 20;
            }
        }
    }
    public hideAll() {
        this.showCard = false;
        let length = this.cards.length;
        if (length > 0) {
            let totalSpaceHafl = ((length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
            for (let i = 0; i < length; i++) {
                this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
                this.cards[i].zOrder = i;
                this.cards[i].showBack();
            }
        }

    }

    public showAll() {
        this.showCard = true;
        let length = this.cards.length;
        if (length > 0) {
            let totalSpaceHafl = ((length - 1) * Player.CARD_SPACE + this.cards[0].width) / 2;
            for (let i = 0; i < length; i++) {
                this.cards[i].x = i * Player.CARD_SPACE - totalSpaceHafl;
                this.cards[i].zOrder = i;
                this.cards[i].showFace();
            }
        }
    }

    public sort() {
        Card.sort(this.cards);
        if (this.showCard) {
            this.showAll();
        } else {
            this.hideAll();
        }
    }

    //设置为地主
    public setLandlord() {
        this.landlord = true;
        let label = new Laya.Label("地主");
        label.color = "#ff0000";
        label.width = 48;
        label.height = 24;
        label.y = -40;
        this.addChild(label);
    }

    public showLable(label: Laya.Label, text: string) {
        label.text = text;
        this.addChild(label);
    }

    public sureCards(lastCards: Array<Card> = null): Array<Card> {
        let cards: Array<Card> = new Array();
        if (!this.singles) {
            this.classifyCards();
            // for (let sequence of this.sequences) {
            //     for (let card of sequence) {
            //         card.y -= 20;
            //     }
            // }
            // for (let pairs of this.pairs) {
            //     for (let card of pairs) {
            //         card.y -= 40;
            //     }
            // }
            // for (let threes of this.threes) {
            //     for (let card of threes) {
            //         card.y -= 60;
            //     }
            // }
            // for (let bombs of this.bombs) {
            //     for (let card of bombs) {
            //         card.y -= 80;
            //     }
            // }
        }
        if (lastCards) {
            let role: CardRole = this.checkRole(lastCards);
            switch (role) {
                case CardRole.Singe:
                    for (let i = this.singles.length - 1; i >= 0; i--) {
                        if (this.singles[i].value > lastCards[0].value) {
                            let rmCards = this.singles.splice(i, 1);
                            cards.push(rmCards[0]);
                            this.popCard(rmCards[0]);
                            break;
                        }
                    }
                    break;
                case CardRole.Pair:
                    for (let i = this.pairs.length - 1; i >= 0; i--) {
                        if (this.pairs[i][0].value > lastCards[0].value) {
                            let pairs = this.pairs[i];
                            for (let card of pairs) {
                                cards.push(card);
                                this.popCard(card);
                            }
                            this.pairs.splice(i, 1);
                            break;
                        }
                    }
                    break;
                case CardRole.Three:
                    for (let i = this.threes.length - 1; i >= 0; i--) {
                        if (this.threes[i][0].value > lastCards[0].value) {
                            let threes = this.threes[i];
                            for (let card of threes) {
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
                        for (let i = this.threes.length - 1; i >= 0; i--) {
                            if (this.threes[i][0].value > lastCards[1].value) {
                                let threes = this.threes[i];
                                for (let card of threes) {
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                this.threes.splice(i, 1);
                                let card = this.singles.pop();
                                cards.push(card);
                                this.popCard(card);
                                break;
                            }
                        }
                    }
                    break;
                case CardRole.ThreePair:
                    if (this.pairs.length > 0) {
                        for (let i = this.threes.length - 1; i >= 0; i--) {
                            if (this.threes[i][0].value > lastCards[2].value) {
                                let threes = this.threes[i];
                                for (let card of threes) {
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                this.threes.splice(i, 1);
                                let pairs = this.pairs.pop();
                                for (let card of pairs) {
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                break;
                            }
                        }
                    }
                    break;
                case CardRole.Bomb:
                    for (let i = this.bombs.length - 1; i >= 0; i--) {
                        if (this.bombs[i][0].value > lastCards[0].value) {
                            let bombs = this.bombs[i];
                            for (let card of bombs) {
                                cards.push(card);
                                this.popCard(card);
                            }
                            this.bombs.splice(i, 1);
                            break;
                        }
                    }
                    break;
                case CardRole.Sequences:
                    let fitIndex = -1;
                    let minLength = 0;
                    for (let i = this.sequences.length - 1; i >= 0; i--) {
                        if (this.sequences[i].length > minLength && this.sequences[i].length >= lastCards.length && this.sequences[i][0].value > lastCards[0].value) {
                            fitIndex = i;
                            minLength = this.sequences[i].length;
                        }
                    }
                    minLength = lastCards.length;
                    if (fitIndex >= 0) {
                        let sequences = this.sequences.splice(fitIndex, 1);
                        for (let card of sequences[0]) {
                            cards.push(card);
                            this.popCard(card);
                            minLength --;
                            if(minLength == 0) {
                                this.classifyCards();
                                break;
                            }
                        }
                    }
                    break;
                case CardRole.SequencesPair:
                    let seqNum = 0;
                    let endIndex = -1;
                    for (let i = this.pairs.length - 1; i >= 0; i--) {
                        if (this.pairs[i][0].value > lastCards[lastCards.length - 1].value) {
                            if (seqNum == 0) {//第一个数
                                seqNum = 1;
                            } else if (this.pairs[i][0].value - this.pairs[i + 1][0].value == 1) {
                                seqNum++;
                                if (seqNum * 2 >= lastCards.length) {
                                    endIndex = i;
                                    break;
                                }
                            } else {//下个序列
                                seqNum = 1;
                            }
                        }
                    }
                    if (endIndex > 0) {
                        let pairs = this.pairs.splice(endIndex, seqNum);
                        for (let pair of pairs) {
                            for (let card of pair) {
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                    }
                    break;
                case CardRole.SequencesThree:
                    let threeNum = lastCards.length / 3;
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
                    let minValue = -1;
                    for (let i = lastCards.length - 3; i >= 0; i--) {
                        if (lastCards[i].value == lastCards[i + 1].value && lastCards[i + 1].value == lastCards[i + 2].value) {
                            minValue = lastCards[i].value;
                        }
                    }
                    for (let i = this.threes.length - 1; i >= 0; i--) {
                        if (this.threes[i][0].value > minValue) {
                            if (seqNum == 0) {//第一个数
                                seqNum = 1;
                            } else if (this.threes[i][0].value - this.threes[i - 1][0].value == 1) {
                                seqNum++;
                                if (seqNum >= threeNum) {
                                    endIndex = i;
                                    break;
                                }
                            } else {//下个序列
                                seqNum = 1;
                            }
                        }
                    }
                    if (endIndex > 0) {
                        let pairs = this.pairs.splice(endIndex, seqNum);
                        for (let pair of pairs) {
                            for (let card of pair) {
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                        if (role == CardRole.SequencesThreeSinge) {
                            while (seqNum > 0 && this.singles.length > 0) {
                                let card = this.singles.pop();
                                cards.push(card);
                                this.popCard(card);
                                seqNum--;
                            }
                            while (seqNum > 0 && this.pairs.length > 0) {
                                let pairs = this.pairs.pop();
                                for (let card of pairs) {
                                    if (seqNum > 0) {
                                        cards.push(card);
                                        this.popCard(card);
                                        seqNum--;
                                    } else {//双拆成单剩余的单，要到单里面去
                                        this.singles.push(card);
                                        Card.sort(this.singles);
                                    }
                                }
                            }
                        } else if (role == CardRole.SequencesThreePair) {
                            while (seqNum > 0 && this.pairs.length > 0) {
                                let pairs = this.pairs.pop();
                                for (let card of pairs) {
                                    cards.push(card);
                                    this.popCard(card);
                                }
                                seqNum--;
                            }
                        }

                    }
                    break;
            }
        } else {
            if (this.singles.length > this.threes.length && this.singles.length >= this.pairs.length) {
                let card = this.singles.pop();
                cards.push(card);
                this.popCard(card);
            } else if (this.pairs.length > this.threes.length && this.pairs.length > this.singles.length) {
                let pairs = this.pairs.pop();
                for (let card of pairs) {
                    cards.push(card);
                    this.popCard(card);
                }
            } else if (this.threes.length > 0) {
                let threes = this.threes.pop();
                for (let card of threes) {
                    cards.push(card);
                    this.popCard(card);
                }
                if (this.singles.length > 0 || this.pairs.length > 0) {
                    if (this.singles.length >= this.pairs.length) {
                        if ((this.pairs.length == 0 && this.threes.length == 0) || this.singles[this.singles.length - 1].value < 16) {//没有除炸弹以外的牌或2者以下的单牌
                            let card = this.singles.pop();
                            cards.push(card);
                            this.popCard(card);
                        } else if (this.pairs.length > 0) {
                            let pairs = this.pairs.pop();
                            for (let card of pairs) {
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                    } else {
                        if ((this.singles.length == 0 && this.threes.length == 0) || this.pairs[this.pairs.length - 1][0].value < 16) {//没有除炸弹以外的牌或2者以下的对牌
                            let pairs = this.pairs.pop();
                            for (let card of pairs) {
                                cards.push(card);
                                this.popCard(card);
                            }
                        }
                    }
                }

            } else if (this.sequences.length > 0) {
                let sequences = this.sequences.pop();
                for (let card of sequences) {
                    cards.push(card);
                    this.popCard(card);
                }
            } else if (this.bombs.length > 0) {
                let bombs = this.bombs.pop();
                for (let card of bombs) {
                    cards.push(card);
                    this.popCard(card);
                }
            }
        }
        this.sort();
        Card.sort(cards);
        return cards;
    }

    public classifyCards() {
        this.singles = new Array<Card>();
        this.sequences = new Array<Array<Card>>();
        this.pairs = new Array<Array<Card>>()
        this.threes = new Array<Array<Card>>();
        this.bombs = new Array<Array<Card>>();
        if (this.cards.length == 0) {
            return;
        }
        if (this.cards.length == 1) {
            this.singles.push(this.cards[0]);
            return;
        }
        let beginSeq = 0;
        if (this.cards[1].name == Card.BLACK_JOKER) {
            this.bombs.push([this.cards[0], this.cards[1]]);
            beginSeq = 2;
        } else if (this.cards[0].name == Card.COLOR_JOKER || this.cards[0].name == Card.BLACK_JOKER) {
            this.singles.push(this.cards[0]);
            beginSeq = 1;
        }
        if (beginSeq == this.cards.length - 1) {
            this.singles.push(this.cards[beginSeq]);
            return;
        } else if (beginSeq > this.cards.length - 1) {
            return;
        }
        let seqIndexs = new Array<number>();
        seqIndexs.push(beginSeq);
        let difValue;
        for (let i = beginSeq + 1; i <= this.cards.length; i++) {
            if (i < this.cards.length) {
                difValue = this.cards[i - 1].value - this.cards[i].value;
            } else {
                difValue = this.cards[i - 1].value;
            }
            if (difValue == 1) {
                seqIndexs.push(i);
            } else if (difValue != 0) {
                //console.log(seqIndexs);
                if (i - seqIndexs[0] <= 1) {
                    this.singles.push(this.cards[seqIndexs[0]]);
                } else {
                    for (let j = seqIndexs[0] + 1, sameNum = 0; j <= i; j++) {
                        if (j < i) {
                            difValue = this.cards[j - 1].value - this.cards[j].value;
                        } else {
                            difValue = this.cards[j - 1].value;
                        }
                        if (difValue == 0) {
                            sameNum++;
                        } else {
                            if (sameNum == 0) {
                                if (seqIndexs.length < 5) {
                                    this.singles.push(this.cards[j - 1]);
                                    seqIndexs.splice(seqIndexs.indexOf(j - 1), 1);
                                } else {
                                    //
                                }
                            } else if (sameNum == 1) {//对子
                                if (seqIndexs.length < 5) {
                                    this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                    seqIndexs.splice(seqIndexs.indexOf(j - 2), 1);
                                } else {
                                    let index = seqIndexs.indexOf(j - 2);
                                    if (index == 0 && seqIndexs.length > 5) {
                                        this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    } else if (index == seqIndexs.length - 1 && seqIndexs.length > 5) {
                                        this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    } else {
                                        this.singles.push(this.cards[j - 1]);
                                    }
                                }
                            } else if (sameNum == 2) {//三张
                                let index = seqIndexs.indexOf(j - 3);
                                if (seqIndexs.length < 5) {
                                    this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                    seqIndexs.splice(index, 1);
                                } else {
                                    if (index == 0 && seqIndexs.length > 5) {
                                        this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    } else if (index == seqIndexs.length - 1 && seqIndexs.length > 5) {
                                        this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                        seqIndexs.splice(index, 1);
                                    } else {
                                        this.pairs.push([this.cards[j - 2], this.cards[j - 1]]);
                                    }
                                }
                            } else if (sameNum == 3) {//四张
                                let index = seqIndexs.indexOf(j - 4);
                                if (seqIndexs.length < 5) {
                                    this.bombs.push([this.cards[j - 4], this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                    seqIndexs.splice(seqIndexs.indexOf(j - 4), 1);
                                } else {
                                    let singleNum = 0;
                                    if (index > 2 && index < 5 && seqIndexs.length - 1 - index > 2 && seqIndexs.length - 1 - index < 5) {
                                        this.threes.push([this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                    } else {
                                        this.bombs.push([this.cards[j - 4], this.cards[j - 3], this.cards[j - 2], this.cards[j - 1]]);
                                        let rms = seqIndexs.splice(0, index);
                                        if (rms.length >= 5) {
                                            let seq = new Array<Card>();
                                            for (let index = 0; index < rms.length; index++) {
                                                seq.push(this.cards[rms[index]]);
                                            }
                                            this.sequences.push(seq);
                                        } else {
                                            for (let index = 0; index < rms.length; index++) {
                                                this.singles.push(this.cards[rms[index]]);
                                            }
                                        }
                                        seqIndexs.splice(0, 1);
                                        rms = seqIndexs.splice(0, seqIndexs.length);
                                        if (rms.length >= 5) {
                                            let seq = new Array<Card>();
                                            for (let index = 0; index < rms.length; index++) {
                                                seq.push(this.cards[rms[index]]);
                                            }
                                            this.sequences.push(seq);
                                        } else {
                                            for (let index = 0; index < rms.length; index++) {
                                                this.singles.push(this.cards[rms[index]]);
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
                    let seq = new Array<Card>();
                    for (let index = 0; index < seqIndexs.length; index++) {
                        seq.push(this.cards[seqIndexs[index]]);
                    }
                    this.sequences.push(seq);
                }
                seqIndexs.length = 0;
                seqIndexs.push(i);
            }
        }
    }


    public greaterThan(myCards: Array<Card>, lastCards: Array<Card>): boolean {
        let myRole = this.checkRole(myCards);
        if (!myRole) {
            return false;
        }
        let lastRole = this.checkRole(lastCards);
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
                } else {
                    return false;
                }
            case CardRole.Pair:
                if (myCards[0].value > lastCards[0].value) {
                    return true;
                } else {
                    return false;
                }
            case CardRole.Three:
            case CardRole.ThreeOne:
            case CardRole.ThreePair:
                if (myCards[2].value > lastCards[2].value) {
                    return true;
                } else {
                    return false;
                }
            case CardRole.Bomb:
                if (myCards[0].value > lastCards[0].value) {
                    return true;
                } else {
                    return false;
                }
            case CardRole.Sequences:
                if (myCards.length == lastCards.length && myCards[0].value > lastCards[0].value) {
                    return true;
                } else {
                    return false;
                }
            case CardRole.SequencesPair:
                if (myCards.length == lastCards.length && myCards[0].value > lastCards[0].value) {
                    return true;
                } else {
                    return false;
                }
            case CardRole.SequencesThree:
                if (myCards.length == lastCards.length && myCards[0].value > lastCards[0].value) {
                    return true;
                } else {
                    return false;
                }
            case CardRole.SequencesThreeSinge:
            case CardRole.SequencesThreePair:
                if (myCards.length == lastCards.length) {
                    let myFirtValue = -1;
                    for (let i = myCards.length - 3; i >= 0; i--) {
                        if (myCards[i].value == myCards[i + 1].value && myCards[i].value == myCards[i + 2].value) {
                            myFirtValue = myCards[i].value;
                        }
                    }
                    let lastFirtValue = -1;
                    for (let i = lastCards.length - 3; i >= 0; i--) {
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
    }
    //检测出牌对应的规则
    public checkRole(cards: Array<Card>): CardRole {
        if (!cards) {
            return null;
        }
        Card.sort(cards);
        if (cards.length == 1) {
            return CardRole.Singe;
        } else if (cards.length == 2) {
            if (cards[0].value == cards[1].value) {
                return CardRole.Pair;
            } else if (cards[1].name == Card.BLACK_JOKER && cards[0].name == Card.COLOR_JOKER) {
                return CardRole.Bomb;
            }
        } else if (cards.length == 3) {
            if (cards[0].value == cards[1].value && cards[0].value == cards[2].value) {
                return CardRole.Three;
            }
        } else if (cards.length == 4) {
            if (cards[0].value == cards[1].value && cards[0].value == cards[2].value && cards[0].value == cards[3].value) {
                return CardRole.Bomb;
            } else if (cards[1].value == cards[2].value && (cards[0].value == cards[1].value || cards[2].value == cards[3].value)) {
                return CardRole.ThreeOne;
            }
        } else if (cards.length == 5) {
            if (cards[0].value - cards[1].value == 1 && cards[1].value - cards[2].value == 1
                && cards[2].value - cards[3].value == 1 && cards[3].value - cards[4].value == 1) {
                return CardRole.Sequences;
            } else if (cards[0].value == cards[1].value && cards[3].value == cards[4].value
                && (cards[1].value == cards[2].value || cards[2].value == cards[3].value)) {
                return CardRole.ThreePair;
            }
        } else if (cards.length >= 6) {
            let seq = true;
            let pairNum = 0, lastPairValue = -1, seqPair = true;
            let threeNum = 0, lastThreeValue = -1, seqThree = true;
            for (let i = cards.length - 2; i >= 0; i--) {
                if (cards[i].value - cards[i + 1].value != 1) {
                    seq = false;
                    if (cards[i].value == cards[i + 1].value) {
                        if (i + 2 < cards.length && cards[i].value == cards[i + 2].value) {
                            threeNum++;
                            if (lastThreeValue > 0 && cards[i].value - lastThreeValue != 1) {
                                seqThree = false;
                            }
                            lastThreeValue = cards[i].value;
                        } else if (i - 1 <= 0 || cards.length && cards[i].value != cards[i - 1].value) {
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
            } else if (seqPair && pairNum * 2 == cards.length) {
                return CardRole.SequencesPair;
            } else if (seqThree) {
                if (threeNum == pairNum && threeNum * 5 == cards.length) {
                    return CardRole.SequencesThreePair;
                } else if (threeNum * 4 == cards.length) {
                    return CardRole.SequencesThreeSinge;
                }
            }
        }
        return null;
    }

    //返回从此卡牌开始对应规则的出牌
    private roleCards(index: number, role: CardRole): Array<Card> {
        if (index < 0 || index >= this.cards.length) {
            return null;
        }
        let cards: Array<Card> = new Array();
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
                    for (let i = this.cards.length; i >= 0; i--) {
                        let roles = this.cardRoles(i);
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
                    for (let i = this.cards.length; i >= 0; i--) {
                        let roles = this.cardRoles(i);
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
                } else if (index - 3 >= 0 && this.cards[index - 1].value == this.cards[index].value
                    && this.cards[index - 2].value == this.cards[index].value && this.cards[index - 3].value == this.cards[index].value) {
                    cards.push(this.cards[index - 1]);
                    cards.push(this.cards[index - 2]);
                    cards.push(this.cards[index - 3]);
                    return cards;
                }
                break;
            case CardRole.Sequences:
                let currentValue = this.cards[index].value;
                for (let i = index - 1; i >= 0; i--) {
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
                let currentDiffer = 0;
                for (let i = index - 1; i >= 0; i--) {
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
                for (let i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        if ((i - index) % 3 == 0) {
                            currentDiffer = 1;
                        } else {
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
                for (let i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        if ((i - index) % 3 == 0) {
                            currentDiffer = 1;
                        } else {
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
                for (let i = index - 1; i >= 0; i--) {
                    if (this.cards[i].value - currentValue == currentDiffer) {
                        cards.push(this.cards[i]);
                        currentValue = this.cards[i].value;
                        if ((i - index) % 3 == 0) {
                            currentDiffer = 1;
                        } else {
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
    }

    //此卡牌能能出的所有规则(单双三顺炸)
    private cardRoles(index: number): Array<CardRole> {
        let roles: Array<CardRole> = new Array();
        roles.push(CardRole.Singe);
        if ((index - 1 == 0 && this.cards[index].name == Card.BLACK_JOKER) || (index == 0 && this.cards[index + 1].name == Card.BLACK_JOKER)) {
            roles.push(CardRole.Bomb);
        }
        let sameNum = 1;
        let seqNum = 1;
        let lastValue = this.cards[index].value;
        for (let i = index - 1; i >= 0; i--) {
            if (this.cards[i].value == this.cards[index].value) {
                sameNum++;
            } else if (this.cards[i].value - lastValue == 1) {
                seqNum++;
                lastValue = this.cards[i].value;
            }
        }
        for (let i = index + 1; i < this.cards.length; i++) {
            if (this.cards[i].value == this.cards[index].value) {
                sameNum++;
            } else if (this.cards[i].value - lastValue == -1) {
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
        } else if (sameNum == 3) {
            roles.push(CardRole.Three);
            roles.push(CardRole.Pair);
        } else if (sameNum == 2) {
            roles.push(CardRole.Pair);
        }
        return roles;
    }
}