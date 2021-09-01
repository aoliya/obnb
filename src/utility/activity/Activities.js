import React, { Component } from 'react';
import Activity from './Activity'

class Activities extends Component {
    render() {
        const activities = this.props.activities.slice(0, 4).map((activity, i) => {
            return(
                <div key={i} className="activity-box">
                    <Activity activity={activity} />
                </div>
            )
        })
        return (
            <div className="col s12 activities-main" >
                <h1 className="main-header-text">{this.props.header}</h1>
                <div className="activities-box">
                     {activities}
                </div>
            </div>
        )
    }
}

export default Activities;