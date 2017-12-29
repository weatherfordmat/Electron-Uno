import * as React from 'react';
import './login.css';

type Props = {
  history: {
    push: Function
  },
  location: Object
};

class Login extends React.Component<Props> {
  render() {
    return (
        <div className="loginBox">
          <div className="portal">
              <button onClick={() => this.props.history.push('/game')}>
                  Enter Game
              </button>
          </div>
        </div>
    );
  }
}

export default Login;
