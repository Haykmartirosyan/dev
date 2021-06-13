import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: '',
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
        }
    }

    componentDidMount() {
        const {prevLocation} = this.state.redirect.state || {prevLocation: {pathname: '/dashboard'}};
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({formSubmitting: true});
        let userData = this.state.user;
        axios.post("/api/auth/login", userData).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let userData = {
                    id: json.data.id,
                    email: json.data.email,
                    access_token: json.data.access_token,
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: ''
                });
                location.reload()
            }
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                this.setState({
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                })
            } else if (error.request) {
                let err = error.request;
                this.setState({
                    error: err,
                    formSubmitting: false
                })
            } else {
                let err = error.message;
                this.setState({
                    error: err,
                    formSubmitting: false
                })
            }
        }).finally(this.setState({error: ''}));
    }

    handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, user_email: value
            }
        }));
    }

    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, user_pass: value
            }
        }));
    }

    render() {
        const {state = {}} = this.state.redirect;
        const {error} = state;
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2 className="text-center mb30">Log In To Your Account</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input id="email" type="email" name="user_email" placeholder="E-mail"
                                       className="form-control" required onChange={this.handleEmail}/>
                            </div>
                            <div className="form-group">
                                <input id="password" type="password" name="user_pass" placeholder="Password"
                                       className="form-control" required onChange={this.handlePassword}/>
                            </div>
                            <button disabled={this.state.formSubmitting} type="submit" name="singlebutton"
                                    className="btn btn-default btn-lg  btn-block mb10"> {this.state.formSubmitting ? "Logging You In..." : "Log In"} </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginContainer);
