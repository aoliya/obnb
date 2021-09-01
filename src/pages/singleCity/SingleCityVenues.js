import React, { Component } from 'react';
import './SingleCityVenues.css';
import axios from 'axios';
import Spinner from '../../utility/spinner/Spinner'
import Venues from '../../utility/venue/Venues'

class SingleCityVenues extends Component {
        state={
            venues: [],
            header: ""
        }
    async componentDidMount() {
        const cityName = this.props.match.params.cityName;
        const url = `${window.apiHost}/venues/city/${cityName}`;

        const resp = await axios.get(url, {cityName});
        this.setState({
            venues: resp.data.venues,
            header: resp.data.header
        })
    }
    
    
    render() {
        if(!this.state.header){
            return <Spinner />
        }
        return(
            <div>
                <div className="row">
                    <div className="container">
                         <Venues venues={this.state.venues} header={this.state.header}/>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SingleCityVenues;