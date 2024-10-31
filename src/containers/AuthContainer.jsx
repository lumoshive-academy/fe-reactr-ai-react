import React, { Component } from "react";
import LoginModal from "../components/LoginModal";
import { login, register } from "../utils/api";

class AuthContainer extends Component {
  state = { isLogin: true, loading: false, error: null };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.setToken(token);
    }
  }

  handleAuth = (data, type) => {
    this.setState({ loading: true, error: null });
    const request = type === "login" ? login(data) : register(data);

    request
      .then((response) => {
        if (type === "login") {
          localStorage.setItem("token", response.data.accessToken);
          this.props.setToken(response.data.accessToken);
        } else {
          alert("Registration successful! Please login.");
          this.setState({ isLogin: true });
        }
      })
      .catch((error) => this.setState({ error: error.response.data.error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleToggle = (isLogin) => {
    this.setState({ isLogin, error: null });
  };

  render() {
    return (
      <LoginModal
        isLogin={this.state.isLogin}
        setIsLogin={this.handleToggle}
        onSubmit={this.handleAuth}
        loading={this.state.loading}
        error={this.state.error}
      />
    );
  }
}

export default AuthContainer;
