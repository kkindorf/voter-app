import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Header extends Component {
    render() {
        if(this.props.authenticated) {
            const userId = localStorage.getItem('userId');
            //show link to sign out
            return  (
                <nav className="navbar navbar-light">
                    <Link to="/" className="navbar-brand">PollHub</Link>
                    <ul className="nav navbar-nav">
                    <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={this.props.signoutUser}>Sign Out</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/user/'+userId}>Dashboard</Link>
                        </li> 
                    </ul>
                </nav>
            )
        }
        else {
            //show link to sign in and sign up
            return (
                <nav className="navbar navbar-light">
                    <Link to="/" className="navbar-brand">PollHub</Link>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </nav>
            ); 
        }
    }
}


function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
}
export default connect(mapStateToProps, actions)(Header);
