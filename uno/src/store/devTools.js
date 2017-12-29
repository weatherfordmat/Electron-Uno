import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const devTools = () => {
    if (process.env.NODE_ENV === 'development') {
        return composeWithDevTools(
            applyMiddleware(thunk)
        );
    } else {
        return applyMiddleware(thunk);
    }
}

export default devTools;