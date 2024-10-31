import React, { Component } from "react";

class LoginModal extends Component {
  state = { username: "", password: "" };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(
      { username: this.state.username, password: this.state.password },
      this.props.isLogin ? "login" : "register"
    );
  };

  render() {
    const { isLogin, setIsLogin, loading, error } = this.props;

    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{isLogin ? "Login" : "Register"}</h5>
            </div>
            <div className="modal-body">
              {this.props.error && (
                <div className="alert alert-danger" role="alert">
                  <i class="bi bi-exclamation-triangle me-1"></i>
                  {this.props.error}
                </div>
              )}
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  <i className="bi bi-file-lock"></i>{" "}
                  {loading ? "Processing..." : isLogin ? "Login" : "Register"}
                </button>
                <button
                  type="button"
                  className="btn btn-link w-100 mt-2"
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={loading}
                >
                  {isLogin ? "Register" : "Back to Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
