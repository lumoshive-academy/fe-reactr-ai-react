import React, { Component } from "react";

class ChatInput extends Component {
  state = { query: "" };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="fixed-bottom p-3 bg-primary-subtle border-top shadow"
        style={{ zIndex: 1030 }}
      >
        <div className="container d-flex">
          <input
            type="text"
            className="form-control me-2 border border-primary"
            placeholder="Ask something..."
            value={this.state.query}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterKey}
            required
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <i className="bi bi-arrow-bar-up"></i>
          </button>
        </div>
      </form>
    );
  }
}

export default ChatInput;
