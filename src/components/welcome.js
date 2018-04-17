import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Welcome extends Component {
    componentWillMount() {
        this.props.fetchAllPolls();
    }
    render() {
        if(this.props.loadingPolls) {
            return (
            <div>
                <div className="jumbotron app-banner">
                    <h1>Weclome to PollHub</h1>
                    <p>Create real time polls and share with your friends!</p>
                    
                </div>
                <h1>loading...</h1>
            </div>
            )
            
        }
        else {
            const polls = this.props.allPolls.map(function(obj, index) {
                return (
                    <li className="list-group-item" key={obj._id}>
                        <a href={"/poll/"+obj._id}>{obj.pollTitle}</a>
                    </li>
                )
            })
            return (
                <div>
                    <div className="jumbotron app-banner">
                    <h1>Weclome to PollHub</h1>
                    <p>Create real time polls and share with your friends!</p>
                </div>
                    <h3>All User Polls</h3>
                    <ul className="list-group">
                        {polls}
                    </ul>
                </div>
            )
        }
        
           
    }
}
function mapStateToProps(state){
    return {allPolls: state.pollData.allPolls, loadingPolls: state.pollData.loadingPolls};
}
export default connect(mapStateToProps, actions)(Welcome);