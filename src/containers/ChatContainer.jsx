import React, { Component } from "react";
import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { queryAI } from "../utils/api";

class ChatContainer extends Component {
  state = {
    messages: [],
    loading: false, // Status loading saat fetch API
  };

  handleQuery = (query) => {
    this.setState({ loading: true });

    queryAI({ query })
      .then((response) => {
        this.setState((prevState) => ({
          messages: [
            ...prevState.messages,
            { query, answer: response.data.data },
          ],
          loading: false, // Selesai loading
        }));
      })
      .catch((error) => {
        console.error("Error fetching AI response:", error);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <>
        <Navbar setToken={this.props.setToken} />
        <div className="chat-container">
          <div className=" pt-5">
            {this.state.messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}

            {/* Animasi Loading AI */}
            {this.state.loading && (
              <div className="text-center my-3">
                <span className="spinner-border text-primary" role="status" />
                <p>
                  <i className="bi bi-robot"></i> AI is thinking...
                </p>
              </div>
            )}
          </div>
        </div>
        <ChatInput onSubmit={this.handleQuery} loading={this.state.loading} />
      </>
    );
  }
}

export default ChatContainer;
