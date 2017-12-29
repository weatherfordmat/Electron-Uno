import * as React from 'react';

/**
 * Adds Redux to the Store;
 */
import { Provider } from 'react-redux';
import store from './store';

/**
 * React D&D
 */
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// components;
import MyHand from './components/MyHand';
import PlayPiles from './components/PlayPiles';
import UnoModal from './components/Modal';
import './App.css';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <div className="userHand">
            <UnoModal />
            <PlayPiles />
            <MyHand />
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
