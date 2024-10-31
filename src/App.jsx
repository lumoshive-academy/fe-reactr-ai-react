import React, { Component } from "react";
import AuthContainer from "./containers/AuthContainer";
import ChatContainer from "./containers/ChatContainer";

class App extends Component {
  state = { token: null };

  setToken = (token) => this.setState({ token });

  render() {
    const { token } = this.state;
    return token ? (
      <ChatContainer token={token} setToken={this.setToken} />
    ) : (
      <AuthContainer setToken={this.setToken} />
    );
  }
}

export default App;
