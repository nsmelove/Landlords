/*
* name;
*/

enum CardName {
    diamond_3, club_3, heart_3, spade_3,//0-3
    diamond_4, club_4, heart_4, spade_4,//4-7
    diamond_5, club_5, heart_5, spade_5,//8-11
    diamond_6, club_6, heart_6, spade_6,//12-15
    diamond_7, club_7, heart_7, spade_7,//16-19
    diamond_8, club_8, heart_8, spade_8,//20-13
    diamond_9, club_9, heart_9, spade_9,//24-27
    diamond_10, club_10, heart_10, spade_10,
    diamond_J, club_J, heart_J, spade_J,
    diamond_Q, club_Q, heart_Q, spade_Q,
    diamond_K, club_K, heart_K, spade_K,
    diamond_A, club_A, heart_A, spade_A,
    diamond_2, club_2, heart_2, spade_2,
    black_joker, color_joker
}
enum CardRole {
    Singe = 1,//单牌
    Pair = 2,//对牌
    Three = 3,//3不带
    ThreeOne,//3带1
    ThreePair,//3带2
    Bomb,//炸弹
    Sequences,//顺子
    SequencesPair,//连对
    SequencesThree,//飞机
    SequencesThreeSinge,//飞机带单
    SequencesThreePair,//飞机带对
}
class Card extends Laya.Sprite {
    //黑
    static SPADE_2: string = "spade_2";
    static SPADE_3: string = "spade_3";
    static SPADE_4: string = "spade_4";
    static SPADE_5: string = "spade_5";
    static SPADE_6: string = "spade_6";
    static SPADE_7: string = "spade_7";
    static SPADE_8: string = "spade_8";
    static SPADE_9: string = "spade_9";
    static SPADE_10: string = "spade_10";
    static SPADE_J: string = "spade_J";
    static SPADE_Q: string = "spade_Q";
    static SPADE_K: string = "spade_K";
    static SPADE_A: string = "spade_A";
    //红
    static HEART_2: string = "heart_2";
    static HEART_3: string = "heart_3";
    static HEART_4: string = "heart_4";
    static HEART_5: string = "heart_5";
    static HEART_6: string = "heart_6";
    static HEART_7: string = "heart_7";
    static HEART_8: string = "heart_8";
    static HEART_9: string = "heart_9";
    static HEART_10: string = "heart_10";
    static HEART_J: string = "heart_J";
    static HEART_Q: string = "heart_Q";
    static HEART_K: string = "heart_K";
    static HEART_A: string = "heart_A";
    //梅
    static CLUB_2: string = "club_2";
    static CLUB_3: string = "club_3";
    static CLUB_4: string = "club_4";
    static CLUB_5: string = "club_5";
    static CLUB_6: string = "club_6";
    static CLUB_7: string = "club_7";
    static CLUB_8: string = "club_8";
    static CLUB_9: string = "club_9";
    static CLUB_10: string = "club_10";
    static CLUB_J: string = "club_J";
    static CLUB_Q: string = "club_Q";
    static CLUB_K: string = "club_K";
    static CLUB_A: string = "club_A";
    //方
    static DIAMOND_2: string = "diamond_2";
    static DIAMOND_3: string = "diamond_3";
    static DIAMOND_4: string = "diamond_4";
    static DIAMOND_5: string = "diamond_5";
    static DIAMOND_6: string = "diamond_6";
    static DIAMOND_7: string = "diamond_7";
    static DIAMOND_8: string = "diamond_8";
    static DIAMOND_9: string = "diamond_9";
    static DIAMOND_10: string = "diamond_10";
    static DIAMOND_J: string = "diamond_J";
    static DIAMOND_Q: string = "diamond_Q";
    static DIAMOND_K: string = "diamond_K";
    static DIAMOND_A: string = "diamond_A";
    //joker and back
    static COLOR_JOKER: string = "color_joker";
    static BLACK_JOKER: string = "black_joker";
    static BACK_CARD: string = "back_card";

    static CARD_MAP = {
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
    //名称
    name: string;
    //色调
    hue: string;
    //排序
    order: number;
    //值
    value: number;

    choose:boolean;

    constructor(name: string) {
        super();
        this.name = name;
        this.hue = Card.CARD_MAP[name].hue;
        this.value = Card.CARD_MAP[name].value;
        this.order = Card.CARD_MAP[name].order;
        this.choose = false;
        this.showFace();
    }

    public static sort(cards: Array<Card>): Array<Card> {
        if (cards) {
            cards.sort(function (a: Card, b: Card) {
                let num = CardName[b.name] - CardName[a.name];
                return num;
            });
        }
        return cards;

    }
    public showFace() {
        this.loadImage("poker/" + this.name + ".jpg");
        return this
    }

    public showBack() {
        this.loadImage("poker/" + Card.BACK_CARD + ".jpg");
        return this;
    }

}