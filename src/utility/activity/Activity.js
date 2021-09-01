import React, { Component } from 'react';
import './Activity.css';
import {Link} from 'react-router-dom';


class Activity extends Component {
    render() {
        const {activityType, cost, id, image, rating, title, totalRatings} = this.props.activity;
        return (
            <div className="activity">
                <Link to={`/activity/${id}`}>
                    <img src={image} alt="" />
                    <div className="rating">
                       <div><i className="material-icons">star </i></div> 
                       <div>
                             {rating} ({totalRatings})
                       </div>
                    </div>
                    <div className="activity-type">{activityType} - 
                    <span className="title"> {title}</span></div>
                    <div className="cost"><span>From</span> ${cost}/person</div>
                    
                </Link>
                

            </div>
        )
    }
}

export default Activity;