import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NewPollForm from './new-poll-form';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {showUserPolls: false};
        this.loadUserPolls = this.loadUserPolls.bind(this);
        this.showPollForm = this.showPollForm.bind(this);
    }
    loadUserPolls() {
        this.setState({showUserPolls: true})
        this.props.fetchUserPolls();
        
    }
    showPollForm() {
        this.setState({showUserPolls: false})
    }
    render() {
        let polls = this.props.userPolls.map(function(obj,index) {
            return (
                <li className="list-group-item" key={obj._id}>
                    <a href={"/poll/"+obj._id}>{obj.pollTitle}</a>
                </li>
            )
        })
        return (
            <div>
                <div className="jumbotron app-banner">
                    <h1>Dashboard</h1>
                    <p>Let's make a new poll, shall we?</p>
                    <div className="btn-group" role="group">
                        <button className="btn btn-success" onClick={this.showPollForm}>Create Poll</button>
                        <button className="btn btn-primary" onClick={this.loadUserPolls}>Show Polls</button>
                    </div>

                </div>
                {!this.state.showUserPolls ? 
                    <div>
                        <NewPollForm/>   
                    </div>
                    :
                    <div>
                        {this.props.userPolls.length 
                        ?
                        <div>
                            <h3>Your Polls</h3>
                            <ul className="list-group">
                                {polls}
                            </ul>
                        </div>
                        :
                        <div>
                            <h3>You don't have any polls yet</h3>
                        </div>
                        }
                    </div>
                    
                }
            </div> 
        )
        
    }
}

function mapStateToProps(state) {
    return {userPolls: state.userPolls};
}
export default connect(mapStateToProps, actions)(UserProfile);