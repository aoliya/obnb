import React, { Component } from 'react';
import './Venue.css';
import {Link} from 'react-router-dom';

class Venue extends Component {
    render() {
        // console.log(this.props.venue)
        const {id, title, location, pricePerNight, imageUrl, rating} = this.props.venue;
        return (
            <div className="venue col s12">
                <Link to={`/venue/${id}`}>
                    <div className="image">
                        <img src={imageUrl} alt="#" />
                    </div>
                    <div className="location-starts">
                        <div className="raiting"><i className="material-icons">star</i>{rating}</div>
                        <div className="location">{location}</div>
                    </div>
                    <div className="title">{title}</div>
                    <div className="price-per-night">${pricePerNight}<span> / night</span></div>

                </Link>
                
            </div>
        )
    }
}

export default Venue;