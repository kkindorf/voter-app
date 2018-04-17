import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({email, password}) {
        this.props.signinUser({ email, password });
    }
    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render() {
        //handleSubmit is a helper from redux-form and the fields email and password are also from redux-form
        const { handleSubmit, fields: { email, password }} = this.props;

       return (
        <div>
        <div className="jumbotron app-banner">
            <h1>Sign In</h1>
            <p>Welcome back! Let's get started creating new polls.</p>
        </div>
        <div className="row">
            <div className="col-sm-12">

                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input {...email} className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input {...password} type="password" className="form-control"/>
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </div>
        </div>
       );
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}
export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);