// 程序入口
class Landlord {
    player: Player;
    opponentLeft: Player;
    opponentRight: Player;
    deliverArea: DeliverCardArea;
    showArea: ShowCardArea;
    sureBtn: Laya.Button;
    passBtn: Laya.Button;
    label: Laya.Label;
    //当前出牌玩家
    curPlayer: Player;
    constructor() {
        Laya.init(1000, 600);
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        Laya.loader.load(
            [
                "res/atlas/poker.json",
                {
                    url: "res/bg1.png",
                    type: Laya.Loader.IMAGE
                },
                {
                    url: "res/btn.jpg",
                    type: Laya.Loader.IMAGE
                }
            ],
            Laya.Handler.create(this, this.onResLoad),
            null,
            Laya.Loader.ATLAS
        );
    }

    public onResLoad() {
        var bg = new Laya.Sprite();
        bg.graphics.drawTexture(Laya.loader.getRes("res/bg1.png"));
        bg.scaleX = 1000 / 640;
        bg.scaleY = 600 / 320;
        console.log(bg.scaleX, bg.scaleY);
        Laya.stage.addChild(bg);

        this.deliverArea = new DeliverCardArea();
        this.deliverArea.pos(500, 20);
        this.deliverArea.initCard();
        Laya.stage.addChild(this.deliverArea);

        this.showArea = new ShowCardArea();
        this.showArea.pos(500, 250);
        Laya.stage.addChild(this.showArea);

        this.player = new Player("莲花漂移");
        this.player.pos(500, 450);
        this.player.showCard = true;
        Laya.stage.addChild(this.player);

        this.opponentLeft = new Player("left");
        this.opponentLeft.pos(150, 300);
        this.opponentLeft.rotation = 90;
        this.opponentLeft.showCard = false;
        Laya.stage.addChild(this.opponentLeft);

        this.opponentRight = new Player("right");
        this.opponentRight.pos(850, 300);
        this.opponentRight.rotation = -90;
        this.opponentRight.showCard = false;
        Laya.stage.addChild(this.opponentRight);

        this.sureBtn = new Laya.Button("res/btn.jpg", "出牌");
        this.sureBtn.stateNum = 1;
        this.sureBtn.pos(400, 400);
        this.sureBtn.width = 48;
        this.sureBtn.height = 24;
        this.sureBtn.on(Laya.Event.CLICK, this, this.playerSure);

        this.passBtn = new Laya.Button("res/btn.jpg", "不出");
        this.passBtn.stateNum = 1;
        this.passBtn.pos(550, 400);
        this.passBtn.width = 48;
        this.passBtn.height = 24;
        this.passBtn.on(Laya.Event.CLICK, this, this.playerPass);

        this.label = new Laya.Label();
        this.label.color = "#ffff00";
        this.label.width = 48;
        this.label.height = 24;
        this.label.pos(-40, -40);
        Laya.timer.loop(300, this, this.deliverLoop);
    }
    public playerSure() {
        if (!this.curPlayer) {//首次出牌
            if (this.player.landlord) {
                let cards = this.player.chooseCards();
                if (this.player.checkRole(cards)) {
                    this.player.removeCards(cards);
                    this.showArea.addCards(cards, this.player);
                    this.curPlayer = this.opponentRight;
                    this.curPlayer.showLable(this.label, "出牌");
                }
            }
        } else if (this.player == this.curPlayer) {
            let cards = this.player.chooseCards();
            if (this.showArea.cardPlayer != this.player) {
                if (this.player.greaterThan(cards, this.showArea.cards)) {
                    this.player.removeCards(cards);
                    this.showArea.addCards(cards, this.player);
                    this.curPlayer = this.opponentRight;
                    this.curPlayer.showLable(this.label, "出牌");
                }
            } else {
                if (this.player.checkRole(cards)) {
                    this.player.removeCards(cards);
                    this.showArea.addCards(cards, this.player);
                    this.curPlayer = this.opponentRight;
                    this.curPlayer.showLable(this.label, "出牌");
                }
            }

        }
        if(this.player.cards.length == 0) {
            this.gameOver();
        }else {
            this.player.resetChoose();
        }
    }

    public playerPass() {
        this.player.resetChoose();
        if (this.curPlayer == this.player && this.player != this.showArea.cardPlayer) {
            this.curPlayer = this.opponentRight;
            this.curPlayer.showLable(this.label, "出牌");
        }
    }

    public deliverLoop() {
        let players = [this.player, this.opponentLeft, this.opponentRight];
        for (let player of players) {
            if (this.deliverArea.cards.length > 3) {
                player.addCard(this.deliverArea.popCard());
            } else {
                Laya.timer.clear(this, this.deliverLoop);
                this.deliverArea.displayRest();
                let landlordInex = Math.floor(Math.random() * players.length);
                while (this.deliverArea.cards.length > 0) {
                    players[landlordInex].addCard(this.deliverArea.popCard());
                }
                players[landlordInex].setLandlord();
                this.beginGame();
                return;
            }
        }
    }

    public beginGame() {
        this.player.sort();
        this.opponentLeft.sort();
        this.opponentRight.sort();
        Laya.stage.addChild(this.sureBtn);
        Laya.stage.addChild(this.passBtn);
        Laya.timer.loop(1000, this, this.gameLoop);
    }

    public gameLoop() {
        if (!this.curPlayer) {//还没出牌,由地主出牌
            if (this.opponentLeft.landlord) {
                let cards = this.opponentLeft.sureCards();
                this.showArea.addCards(cards, this.opponentLeft);
                this.curPlayer = this.player;
                this.curPlayer.showLable(this.label, "出牌");
            } else if (this.opponentRight.landlord) {
                let cards = this.opponentRight.sureCards();
                this.showArea.addCards(cards, this.opponentRight);
                this.curPlayer = this.opponentLeft;
                this.curPlayer.showLable(this.label, "出牌");
            }
        } else if (this.curPlayer != this.player) {//电脑出牌
            let sureCard: boolean = false;//该回合电脑该不该出牌
            let lastCard = null;
            if (this.showArea.cardPlayer != this.curPlayer) {//上回合不是自己出的牌
                lastCard = this.showArea.cards;
                if (this.curPlayer.landlord || this.showArea.cardPlayer.landlord) {//上回合出牌的人和自己不是队友
                    sureCard = true;
                }
            } else {//上回合自己出的牌，继续出牌
                sureCard = true;
            }
            let cards = this.curPlayer.sureCards(lastCard);
            if (sureCard) {//确定要出牌
                if (cards.length > 0) {
                    this.showArea.addCards(cards, this.curPlayer);
                } else {//没有比对方大的牌，要确定是否要拆牌或使用炸弹
                    let role = this.curPlayer.checkRole(this.showArea.cards);
                    switch (role) {
                        case CardRole.Singe:
                            if (this.curPlayer.pairs.length > 0 && this.curPlayer.pairs[0][0].value > this.showArea.cards[0].value) {
                                let card = this.curPlayer.popCard(this.curPlayer.pairs[0][0]);
                                this.showArea.addCard(card, this.curPlayer);
                                this.curPlayer.classifyCards();
                            } else if (this.curPlayer.threes.length > 0 && this.curPlayer.threes[0][0].value > this.showArea.cards[0].value) {
                                let card = this.curPlayer.popCard(this.curPlayer.threes[0][0]);
                                this.showArea.addCard(card, this.curPlayer);
                                this.curPlayer.classifyCards();
                            } else if (this.curPlayer.bombs.length > 0) {
                                let bombs = this.curPlayer.bombs.pop();
                                this.curPlayer.removeCards(bombs);
                                this.showArea.addCards(bombs, this.curPlayer);
                            }
                            break;
                        case CardRole.Pair:
                            if (this.curPlayer.threes.length > 0 && this.curPlayer.threes[0][0].value > this.showArea.cards[0].value) {
                                let cards = this.curPlayer.removeCards([this.curPlayer.threes[0][0], this.curPlayer.threes[0][1]]);
                                this.showArea.addCards(cards, this.curPlayer);
                                this.curPlayer.classifyCards();
                            } else if (this.curPlayer.bombs.length > 0) {
                                let bombs = this.curPlayer.bombs.pop();
                                this.curPlayer.removeCards(bombs);
                                this.showArea.addCards(bombs, this.curPlayer);
                            }
                            break;
                        case CardRole.Three:
                        case CardRole.ThreeOne:
                        case CardRole.ThreePair:
                            if (this.curPlayer.bombs.length > 0) {
                                let bombs = this.curPlayer.bombs.pop();
                                this.curPlayer.removeCards(bombs);
                                this.showArea.addCards(bombs, this.curPlayer);
                            }
                            break;
                        case CardRole.Bomb:
                            break;
                        case CardRole.Sequences:
                        case CardRole.SequencesPair:
                        case CardRole.SequencesThree:
                        case CardRole.SequencesThreeSinge:
                        case CardRole.SequencesThreePair:
                            if (this.curPlayer.bombs.length > 0) {
                                let bombs = this.curPlayer.bombs.pop();
                                this.curPlayer.removeCards(bombs);
                                this.showArea.addCards(bombs, this.curPlayer);
                            }
                            break;
                    }
                }
            } else {//如果不确定要出牌，则上回合出牌者和自己是队友，则根据条件出牌
                let role = this.curPlayer.checkRole(cards);
                switch (role) {
                    case CardRole.Singe:
                        if (cards[0].value < 16) {//大于2则不出牌,放回要出的牌
                            sureCard = true;
                        }
                        break;
                    case CardRole.Pair:
                        if (cards[0].value < 14) {//A以下的对牌，出牌
                            sureCard = true;
                        }
                        break;
                    case CardRole.Three:
                    case CardRole.ThreeOne:
                    case CardRole.ThreePair:
                        if (cards[2].value < 10) {//10以下的三牌，出牌
                            sureCard = true;
                        }
                        break;
                    case CardRole.Bomb:
                        break;
                    case CardRole.Sequences:
                        break;
                    case CardRole.SequencesPair:
                        break;
                    case CardRole.SequencesThree:
                        break;
                    case CardRole.SequencesThreeSinge:
                        break;
                    case CardRole.SequencesThreePair:
                        break;
                }
                if (sureCard) {
                    this.showArea.addCards(cards, this.curPlayer);
                } else {
                    this.curPlayer.addCards(cards);
                    this.curPlayer.classifyCards();
                }

            }
            if (this.curPlayer.cards.length == 0) {
                this.gameOver()
            }
            //轮到下一个出牌
            if (this.curPlayer == this.opponentLeft) {
                this.curPlayer = this.player;
            } else {
                this.curPlayer = this.opponentLeft;
            }
            this.curPlayer.showLable(this.label, "出牌");
        }
    }

    public gameOver() {
        Laya.timer.clear(this, this.gameLoop);
        this.opponentLeft.showAll();
        this.opponentRight.showAll();
        console.log("game over");
    }
}

new Landlord();