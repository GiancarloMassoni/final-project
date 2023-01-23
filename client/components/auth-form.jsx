import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign in instead'
      : "Don't have an account? Register now";
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
      <div className='row'>
        <div className='col-full text-center'>
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="text-center">
              <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="sign-in-form"
             />
            </div>
            <div className="mb-3">
              <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className='sign-in-form'
             />
            </div>
            <div className="padding">
              <div>
                <button type="submit" className="btn btn-primary">
                  {submitButtonText}
                </button>
              </div>
              <a className="padding-top" href={alternateActionHref}>
                {alternatActionText}
              </a>

            </div>
          </form>
        </div>
      </div>
    );
  }
}
