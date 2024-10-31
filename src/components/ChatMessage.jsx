import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import "bootstrap-icons/font/bootstrap-icons.css";

class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedText: "",
      index: 0,
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.typeText();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message.answer !== this.props.message.answer) {
      clearInterval(this.intervalId);
      this.setState({ displayedText: "", index: 0 }, this.typeText);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  typeText = () => {
    const { answer } = this.props.message;
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          const nextIndex = prevState.index + 1;
          return {
            displayedText: answer.slice(0, nextIndex),
            index: nextIndex,
          };
        },
        () => {
          if (this.state.index >= answer.length) {
            clearInterval(this.intervalId);
          }
        }
      );
    }, 4);
  };

  render() {
    const { query } = this.props.message;
    const { displayedText } = this.state;

    return (
      <>
        {/* User's question on the right */}
        <div className="d-flex justify-content-end chat-message">
          <div className="p-3 border shadow-sm rounded bg-primary-subtle text-white text-end">
            <i className="bi bi-person-fill me-1"></i>
            <strong>Question:</strong> {query}
          </div>
        </div>

        {/* Bot's answer on the left */}
        <div className="d-flex justify-content-start chat-message">
          <div className="p-3 border shadow-sm rounded bg-succcess-subtle text-white">
            <div className="mb-4">
              <i className="bi bi-robot me-1"></i>
              <strong>Answer:</strong>
            </div>
            <ReactMarkdown>{displayedText}</ReactMarkdown>
          </div>
        </div>
      </>
    );
  }
}

export default ChatMessage;
