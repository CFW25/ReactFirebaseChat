import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      loadingChats: false,
    };
    this.myRef = React.createRef();
  }
  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }
  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }
  render() {
    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats && (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {/* chat area */}
          {this.state.chats.map((chat) => {
            return (
              this.state.user.uid === chat.uid && (
                <p>
                  {chat.content}
                  <br />
                  <span className="chat-time">
                    {this.formatTime(chat.timestamp)}
                  </span>
                </p>
              )
            );
          })}
        </div>
        <div className="py-5 mx-3">
          Login in as:{" "}
          <strong className="text-info">{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}
