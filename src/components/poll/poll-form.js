import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, addArrayValue} from 'redux-form';

export const fields = [
    'newOption',
    'pollTitle',
    'options[]'
  ];
class PollForm extends Component {
    constructor(props) {
        super(props);
        this.state = {choice: '', showNewOptionField: false, newInputFieldValue: ''};
    }
    componentWillMount() {
        this.props.fetchPoll();
    }
    handleFormSubmit({newOption, pollTitle, options}) {
        if(!newOption && !this.state.choice) {
            return;
        }
        if(newOption) {
            //add newOption if a new option field is updated
            this.props.pollData.pollOptions.push(newOption);
        }
        if(this.state.choice) {
            newOption = this.state.choice;
        }
        //clear form field values
        this.setState({choice: "", newInputFieldValue: ""})

        //set pollTitle and options fields to pollData values
        pollTitle = this.props.pollData.pollTitle;
        options = this.props.pollData.pollOptions;

        //submit updatd poll Data
        this.props.submitNewChoice({newOption, pollTitle, options});
    }
    handleRadio(e) {
        this.setState({choice: e.target.value, newInputFieldValue: ''});
    }
    showNewOptionField() {
        this.state.showNewOptionField ? this.setState({showNewOptionField: false}) : this.setState({showNewOptionField: true})
    }
    handleNewChange(e) {
        this.setState({choice: '', newInputFieldValue: e.target.value});
      }
    render() {
        const { handleSubmit,fields: {newOption, pollTitle, options}} = this.props;
        var radioOptions = this.props.pollData.pollOptions.map((option, index) => {
            return (
                <li className="list-group-item" key={index}>
                <div className="radio">
                    <label>
                        <input type="radio" value={option} checked ={this.state.choice === option} onChange={this.handleRadio.bind(this)}/>
                        {option}
                    </label>
                </div>
            </li>
            )
           
        })
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <ul className="list-group">
                {radioOptions}
                </ul>
                {this.state.showNewOptionField ? 
                <fieldset className="form-group">
                    <label>Add a different option:</label>
                    <input {...newOption} value={this.state.newInputFieldValue} id="newOption" className="form-control"  onChange={this.handleNewChange.bind(this)}/>
                </fieldset>: ''}
                
                {this.props.authenticated ?
                <div>
                    <button type="button" className="btn btn-success submit-poll-button" onClick={this.showNewOptionField.bind(this)}>
                    {this.state.showNewOptionField ? "Hide New Option" : "Add New Option"}
                    </button>
                    <button action="submit" className="btn btn-primary submit-poll-button">Submit</button>
                </div>
                :
                <button action="submit" className="btn btn-primary submit-poll-button">Submit</button>
                }
                
            </form>

        )
    }
    
}
function mapStateToProps(state) {
    return {pollData: state.pollData,
            authenticated: state.auth.authenticated}
}
export default reduxForm({
    form: 'pollForm',
    fields,
}, mapStateToProps, actions)(PollForm);