export type Player = {
    connectionId: string,
    userName: string,
    score: number,
    deck: Array<Card>
};

export type Game = {
    turn: number,
    players: Array<Player>,
    direction: number,
    color: string,
    discardStack: Array<Card>,
    drawStack: Array<Card>,
    drawTwo: boolean,
    hasWon: boolean
};

export type Card = {
    color?: string,
    number: number,
    powerCard?: boolean,
    power?: string
};

export type MyState = {
    game: Game
};
