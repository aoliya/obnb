import React, { Component } from 'react';
import './Home.css';
import SearchBox from './SearchBox';
import Spinner from '../../utility/spinner/Spinner';
import Cities from '../../utility/city/Cities';
import Activities from '../../utility/activity/Activities';
import Venues from '../../utility/venue/Venues';
import Host from '../../utility/host/Host';
import axios from 'axios';
import ButtonBox from './ButtonBox';


class Home extends Component {
    state={
        cities: [],
        europeCities:{},
        asiaCities:{},
        exoticCities:{}, 
        activities:[],
        recVenues:{},
        isActive: false,
        handleScroll: () => {
            if(window.scrollY > 50){
                this.setState({isActive:true})

            }else{
                this.setState({isActive:false})
            }
        }, 
        
    }
    async componentDidMount(){

        
        window.addEventListener("scroll", this.state.handleScroll)

        const citiesUrl = `${window.apiHost}/cities/recommended`
        const europeCitiesUrl = `${window.apiHost}/cities/europe`;
        const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
        const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

        const citiesPromises = [];

        citiesPromises.push(axios.get(citiesUrl));
        citiesPromises.push(axios.get(europeCitiesUrl));
        citiesPromises.push(axios.get(asiaCitiesUrl));
        citiesPromises.push(axios.get(exoticCitiesUrl));

        Promise.all(citiesPromises).then((data)=>{
            const recommendedCities = data[0].data;
            const europeCities = data[1].data;
            const asiaCities = data[2].data;
            const exoticCities = data[3].data;
            this.setState({
                cities: recommendedCities,
                europeCities,
                asiaCities,
                exoticCities
            });
        })
        const activitiesUrl = `${window.apiHost}/activities/today`;
        const activities = await axios(activitiesUrl);
        this.setState({ 
            activities:activities.data,
        });

        const recVenuesUrl = `${window.apiHost}/venues/recommended`;
        const venues = await axios(recVenuesUrl);
        // console.log(venues.data)
        this.setState({
            recVenues: venues.data,
        })
        
       
    }

    componentWillUnmount () {
        window.removeEventListener("scroll", this.state.handleScroll);
    }

    render() {
        

        if((this.state.cities.length === 0) || (!this.state.recVenues.venues)) {
            return(<Spinner />)
        }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="home col s12 ">
                        <div className="upper-fold">
                           <SearchBox history={this.props.history} isActive={this.state.isActive} />
                           <div className="flexible-box">
                                <ButtonBox />
                           </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="container-fluid lower-fold">
                <div className="container row">
                    <div className="cities col s12">
                        <Cities cities={this.state.cities} header="Popular locations" />
                    </div>

                    <div className="activities col s12">
                        <Activities activities={this.state.activities} header="Discover things to do" />
                    </div>
                    <div className="host col s12">
                        <Host />
                    </div>
                    <div className="col s12">
                        <Venues venues={this.state.recVenues.venues} header={this.state.recVenues.header}/>
                    </div>

                    <div className="col s12">
                        <Cities cities={this.state.europeCities.cities} header={this.state.europeCities.header} />
                    </div>
                    
                    <div className="cities col s12">
                        <Cities cities={this.state.asiaCities.cities} header={this.state.asiaCities.header} />
                    </div>
                    <div className="cities col s12">
                        <Cities cities={this.state.exoticCities.cities} header={this.state.exoticCities.header} />
                    </div>
                </div>     
            </div>
        </>
        )
    }
}

export default Home;