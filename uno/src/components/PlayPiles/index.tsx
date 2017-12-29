import * as React from 'react';

import { connect } from 'react-redux';

import { Card, MyState } from '../../structs/types';

import { DropTarget } from 'react-dnd';

import { drawCard, toggleModal  } from '../../actions';

type Props = {
    drawStack: Array<Card>,
    discardStack: Array<Card>,
    connectDropTarget: <P>(elementOrNode: React.ReactElement<P>) => React.ReactElement<P>,
    isOver: boolean,
    isOverCurrent: boolean,
    canDrop: boolean,
    itemType: Card,
    item: Card,
    didDrop: boolean,
    drawCard: Function,
    color?: string,
    hasWon: boolean,
    toggleModal: Function
};

const Types = {
  CARD: 'card'
};

const discardTarget = {
  canDrop(props: Props, monitor: any) {
      const item = monitor.getItem();
      let currentCard = item.card,
          curr = props.discardStack,
          matchTo = curr[curr.length - 1],
          hasMatchTo = !!matchTo,
          numbersEqual = hasMatchTo && matchTo.number / 1 === currentCard.number / 1,
          powersEqual = matchTo.powerCard && currentCard.powerCard && matchTo.power === currentCard.power,
          includesWild = matchTo.power === 'wild' || matchTo.power === 'wildFour',
          colorAfterWild = includesWild && currentCard.color === props.color;

      if (currentCard.color === matchTo.color 
      || numbersEqual
      || powersEqual
      || colorAfterWild
      || currentCard.power === 'wild' || currentCard.power === 'wildFour') {
        return true;
      } else {
        return false;
      }
    },
  hover(props: any, monitor: any, component: any) {
      const isJustOverThisOne = monitor.isOver({ shallow: true });
      const canDrop = monitor.canDrop();
      return { canDrop, isJustOverThisOne};
  },
  drop(props: any, monitor: any, component: any) {
      const item = monitor.getItem();
      window.console.log(item);
      if (item.card.power === 'wild' || item.card.power === 'wildFour') {
        props.toggleModal();
      }
      if (item) {
        return { item, moved: true };
      } else {
        return { moved: false };
      }
  }
};

function collecting(connector: any, monitor: any) {
  return {
      connectDropTarget: connector.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      didDrop: monitor.didDrop()
  };
}

class PlayPiles extends React.PureComponent<Props> {
  public camelCase(str: any) {
    if (str && str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }
  public watchWin(): void {
    if (this.props.hasWon) {
      window.alert('Game Over');
    }
  }
  render() {
    const { connectDropTarget, isOver, discardStack, canDrop } = this.props;
    let card = discardStack[discardStack.length - 1];
    let src = card.color && card.number !== undefined
              ? require(`../../cards/${card.color}_${card.number}_large.png`) 
              : require(`../../cards/${card.color || ''}${this.camelCase(card.power)}.png`);
    return connectDropTarget(
        <div className="centerDraw">
          <div className="row">
          <span>
            {this.watchWin()}
          <button className="draw" onClick={() => this.props.drawCard(1)}>
                  Draw
                </button>
                <img 
                  className="plainDrop"
                  src={require(`../../cards/card_back_alt_large.png`)}
                  alt="draw_deck" 
                />
              </span>
            <span>
              <img 
                className={isOver ? canDrop ? 'goodDrop' : 'badDrop' : 'plainDrop'}
                src={src}
                alt="discard_stack" 
              />
            </span>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: MyState) => {
    return {
        drawStack: state.game.drawStack,
        discardStack: state.game.discardStack,
        color: state.game.color,
        hasWon: state.game.hasWon
    };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
      drawCard: (player: number) => {
          dispatch(drawCard(player));
      },
      toggleModal: () => {
        dispatch(toggleModal());
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)
  ((DropTarget(Types.CARD, discardTarget, collecting)(PlayPiles)));
