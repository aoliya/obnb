import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        where: "",
        checkIn: "",
        checkOut: "",
        guests: ""
    }

    submitSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/search/${this.state.where}`)
    }

    changeWhere = (e) => {
        this.setState({ where: e.target.value });
    }

    changeCheckIn = (e) => {
        this.setState({ checkIn: e.target.value });
    }

    changeCheckOut = (e) => {
        this.setState({ checkOut: e.target.value });
    }

    changeGuests = (e) => {
        this.setState({ guests: e.target.value });
    }

    render() {
        const isActive = this.props.isActive;
        // console.log(isActive)
        return (

            <div>
                
                <form onSubmit = {this.submitSearch} className={isActive ? 'search-box-form scroll' : 'search-box-form'}> 
                    
                        <div className="search-inputs">
                            <label className="location">
                                <div className="label">Location</div>
                                <input id="where" name="location" 
                                onChange={this.changeWhere}  
                                value={this.state.where}
                                placeholder="Where are you going?"  
                                type="text" />
                            </label>
                        </div>
                        <div className="search-inputs">
                            <label>
                                <div className="label">Check in</div>
                                <input name="check-in" 
                                    onChange={this.changeCheckIn} 
                                    id="check-in" 
                                    placeholder="Add dates" 
                                    value={this.state.checkIn}
                                    // type="date"
                                />  
                            </label>
                        </div>
                        <div className="search-inputs">
                            <label>
                                <div className="label">Check out</div>
                                <input name="check-out" 
                                    id="check-out"
                                    onChange={this.changeCheckOut}  
                                    placeholder="Add dates"
                                    value={this.state.checkOut}
                                />
                            </label>
                        </div>
                        <div className="search-inputs">
                            <label className="guests">
                                <div className="label-input">
                                    <div className="label">Guests</div>
                                    <input name="guests" 
                                           id="guests" 
                                            placeholder="Add guests"
                                            onChange={this.changeGuests}
                                            value={this.state.guests}
                                     />
                                </div>
                                
                                <div className="search-button-box">
                                     <button className="search-button">
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" width="18" height="18" className="bi bi-search" >
                                            <g fill='none'>
                                            <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"/>
                                            </g>
                                        
                                        </svg>
                                     </button>
                                </div>
                            </label>
                            
                        </div>
                            
                </form>
            </div>


        )
    }
}

export default SearchBox;