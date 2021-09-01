import React, { Component } from 'react';
import './City.css';
import {Link} from 'react-router-dom';

class City extends Component {
    render() {
        
        const {cityName, image} = this.props.city;
        return (
            <div className="city col s12">
                <Link to={`/city/${cityName}`}>
                    <div className="image">
                        <img src={image} alt={cityName} />
                    </div>
                    <div className="city-name">{cityName}
                    </div>                   

                </Link>
                
            </div>
        )
    }
}

export default City;