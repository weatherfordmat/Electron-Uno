class Player {
    constructor(connectionId, userName, score, deck) {
        this.connectionId = connectionId;
        this.userName = userName;
        this.score = score;
        this.deck = deck;
        this.declaredUno = false;
    };
};

export default Player;