import React, {Component} from 'react';
import "./Search.css";
import '../home/Home.css';
import axios from "axios";
import Cities from '../../utility/city/Cities';
import Activities from '../../utility/activity/Activities';
import Venues from '../../utility/venue/Venues';
import Spinner from '../../utility/spinner/Spinner';


class Search extends Component {
    state = {
        activities: [],
        cities: [],
        venues: [],
        apiResponse: false
    }
    async componentDidMount(){
        const searchTerm = this.props.match.params.searchTerm;
        const url = `${window.apiHost}/search/${searchTerm}`;
        const resp = await axios.get(url);
        this.setState({
            activities: resp.data.activities,
            cities: resp.data.cities,
            venues: resp.data.venues,
            apiResponse: true
        })
    }

    render(){
        if(!this.state.apiResponse){
            return <Spinner />
        }
        return (
            <div className="container-fluid">
                <div className="main-container row">
                    <div className="col s10 offset-s1">
                        <Cities cities={this.state.cities} header="Cities Matching Your Search" />
                    </div>
                    <div className="col s10 offset-s1">
                        <Activities activities={this.state.activities} header="Activities Matching Your Search" />
                    </div>
                    <div className="col s10 offset-s1">
                        <Venues venues={this.state.venues} header="Venues Matching Your Search" />
                    </div>
                </div>
            </div>
        )
    }
}


export default Search;