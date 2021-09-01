import React from 'react';
import City from './City';
import SlickSlider from '../slider/Slider';


function Cities(props){
  const cities = props.cities.map((city, i)=>{
        return(
            <div key={i} className="col s6">
                <City city={city} key={i} />
            </div>
        )
    })
    return(
        <div className="slider-box col s12">
            <h1 className="main-header-text">{props.header}</h1>
            <SlickSlider elements={cities} />
        </div>
        
    )
    
}

export default Cities;