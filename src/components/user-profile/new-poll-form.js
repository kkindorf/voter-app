import React, {Component} from 'react';
import { reduxForm, addArrayValue } from 'redux-form';
import * as actions from '../../actions';
export const fields = [
    'pollTitle',
    'option1',
    'option2',
    'allOptions[]'
  ];

class NewPollForm extends Component {
    handleFormSubmit({pollTitle, option1, option2, allOptions}) {
        allOptions.splice(0, 0, option1);
        allOptions.splice(1, 0, option2);
        allOptions = allOptions.filter(function(e){return e});
        this.props.submitNewPoll({pollTitle, allOptions});
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
        const { handleSubmit, addValue, fields: { pollTitle, option1, option2, allOptions}} = this.props;

       return (
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
                <label>Poll Title:</label>
                <input {...pollTitle} className="form-control"/>
                {pollTitle.touched && pollTitle.error && <div className="error">{pollTitle.error}</div>}
            </fieldset>
            
            <fieldset className="form-group">
                <label>Option 1</label>
                <input {...option1} className="form-control"/>
                {option1.touched && option1.error && <div className="error">{option1.error}</div>}
            </fieldset>
            <fieldset className="form-group">
                <label>Option 2</label>
                <input {...option2} className="form-control"/>
                {option2.touched && option2.error && <div className="error">{option2.error}</div>}
            </fieldset>
            {allOptions.map((option, index) => 
                 <fieldset className="form-group" key={index}>
                 <label>Option {index+ 3}</label>
                 <input type="text" {...option} defaultValue="test" className="form-control"/>

             </fieldset>
            )}
            <button type="button" className="btn btn-default"onClick={
                event => {
                    event.preventDefault();
                    allOptions.addField();
                }
            }>Add Option</button>
            <button action="submit" className="btn btn-primary">Submit</button>
        </form>
       );
    }
}

function validate(formProps) {
    const errors = {};
    if(!formProps.pollTitle) {
        errors.pollTitle = "Please enter a title for the poll";
    }
    if(!formProps.option1) {
        errors.option1 = "You must enter an option";
    }
    if(!formProps.option2) {
        errors.option2 = "You must enter an option";
    }
   
    return errors;
}

export default reduxForm({
    form: 'newpoll',
    fields,
    validate
}, null, actions)(NewPollForm);