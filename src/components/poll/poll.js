import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PollForm from './poll-form';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme , VictoryLabel} from 'victory';
class Poll extends Component {
    componentWillMount() {
        this.props.fetchPoll();
        this.props.pollAccessed();
        
    }
    render() {
        //should set initial data up as a seperate form import into container
        console.log(this.props.pollData.showPollForm)
        return (
            <div className="poll-container">
            <div className="jumbotron app-banner">
                    <h1>Thanks for visiting PollHub</h1>
                    <p>Please make your selection</p>
                    
            </div>
                <h1>{this.props.pollData.pollTitle}</h1>
                {this.props.pollData.showPollForm || !this.props.pollData.pollResults ? 
                <PollForm/>
                :
                <div>
                    <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={30}>
                    <VictoryBar
                    data={this.props.pollData.pollResults}
                    x="choice"
                    y="count"
                    />
                    </VictoryChart>
                    
                </div>
                }
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {pollData: state.pollData,
            authenticated: state.auth.authenticated}
}
export default connect(mapStateToProps, actions)(Poll);

