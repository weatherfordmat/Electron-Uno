import * as React from 'react';

import { connect } from 'react-redux';

import { Card, MyState } from '../../structs/types';

// react dnd;
import * as dnd from 'react-dnd';
import { DragSource } from 'react-dnd';

import { playCard, drawCard, switchTurn  } from '../../actions';

const Types = {
    CARD: 'card'
};

type Props = {
    deck: Card[],
    dropResult: Object,
    connectDragSource: Function,
    src: string,
    updateDiscard: (card: Card, key: number, player: number) => void,
    next: Function,
    card: Card,
    drawCard: (player: number) => void,
    index: number,
    turn: number,
    children?: any,
    context?: any,
    color?: string
};

const cardSource = {
    beginDrag(props: any): Object {
      return props;
    },
    endDrag(props: Props, monitor: dnd.DragSourceMonitor, component?: React.Component<Props>) {
      if (!monitor.didDrop()) {
        return;
      }
      const item: Object = monitor.getItem();
      let { card, index }: any = item;
      props.updateDiscard(card, index, 1);
      // check if person needs to choose a color for wild card.
      props.next(props.turn);
      const dropResult = monitor.getDropResult();
      return { item, dropResult };
    }
};

const collect = (collector: dnd.DragSourceConnector, monitor: dnd.DragSourceMonitor) => {
    return {
      connectDragSource: collector.dragSource(),
      isDragging: monitor.isDragging(),
      dropResult: monitor.getDropResult()
    };
};

class DraggableCard extends React.Component<Props> {
    render() {
        const { connectDragSource, src } = this.props;
        return connectDragSource(
            <img
                className="myCards"
                src={src}
                alt="uno_card" 
            />
        );
    }
}

const ImgCard = DragSource(Types.CARD, cardSource, collect)(DraggableCard);

class MyHand extends React.Component<any> {
  public camelCase(str?: string): string | undefined {
    if (str && str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }
  public getScore(cards: Card[]): number {
    let total = 0;
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i].number >= 0 && cards[i].power !== 'wild' && cards[i].power !== 'wildFour') {
            total = total + cards[i].number;
        } else if (cards[i].power === 'wild' || cards[i].power === 'wildFour') {
            total = total + 50;
        } else {
            total = total + 20;
        }
    }
    return total;
  }
  render() {
    let { deck, updateDiscard, turn, next, color } = this.props;
    let cp = deck.slice();
    return (
        <div >
            <div className="score">
              {this.getScore(cp)} points
            </div>
          {deck ? cp.map((card: Card, index: number) => {
            let src = card.color && card.number !== undefined
              ? require(`../../cards/${card.color}_${card.number}_large.png`) 
              : require(`../../cards/${card.color || ''}${this.camelCase(card.power)}.png`);
            return (
              <ImgCard 
                key={index}
                src={src}
                updateDiscard={updateDiscard}
                card={card}
                index={index}
                next={next}
                turn={turn}
                color={color}
              />
            );
          }) : null}
        </div>
    );
  }
}

const mapStateToProps = (state: MyState) => {
    return {
        deck: state.game.players[1].deck,
        turn: state.game.turn,
        color: state.game.color
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        updateDiscard: (card: Card, key: number, player: number) => {
            dispatch(playCard(card, key, player));
        },
        drawCard: (player: number) => {
            dispatch(drawCard(player));
        },
        next: (turn: number) => {
            dispatch(switchTurn(turn));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHand);
