import Player from '../structs/Player';

/* Game Setup */
export const addPlayer = ({connectionId, userName, score, deck}) => {
    return dispatch({
        type: 'ADD_PLAYER',
        player: new Player(connectionId, userName, 0, [])
    });
};

export const dealCards = () => {
    return dispatch({
        type: 'DEAL_CARDS'
    }); 
};


export const switchTurn = (turn) => {
    return {
        type: 'SWITCH_TURN',
        turn: turn += 1
    }; 
};

/* Card Actions */
export const reverseDirection = (direction) => (
    dispatch({
        type: 'CARD_REVERSE',
        direction
    })
)

export const changeColor = color => {
    return {
        type: 'CHANGE_COLOR',
        color
    }
};

export const playCard = (card, key, player) => {
    return {
        type: 'PLAY_CARD',
        card,
        key,
        player
    };
};

export const drawCard = (player) => {
    return {
        type: 'DRAW_CARD',
        player
    };
};

export const skipTurn = () => (
    dispatch({
        type: 'SKIP_TURN'
    })
);

export const drawTwo = () => (
    dispatch({
        type: 'DRAW_TWO'
    })
);