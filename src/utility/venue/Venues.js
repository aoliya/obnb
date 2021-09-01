import React from 'react';
import Venue from './Venue';
import './Venue.css'


function Venues(props){
    const venues = props.venues.map((venue, i) => {
        return(
            <div key={i} className="col m6 l3">
                <Venue venue={venue} key={i} />
            </div>
        )
    })
    return(
        <div className="venues-main">
            <h1 className="main-header-text">{props.header}</h1>
            <div className="venues">
                {venues}
            </div>
            
        </div>
    )
}

export default Venues;