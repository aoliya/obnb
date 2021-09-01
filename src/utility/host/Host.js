import React, { Component } from 'react';
import './Host.css';
import hostImage from '../images/hostpic.jpg'

class Host extends Component {
    render() {
        
        return (
            <div className="host-main col s12">
                <div className="host-box black">
                    <div className="host-info">
                        <h1>Try hosting</h1>
                        <p>Earn extra income and unlock new opportunities by sharing your space</p>
                        <button>Learn more</button>
                    </div>
                    
                </div>
                <div className="host-box image">
                    <img src={hostImage} alt="" />
                </div>
                
            </div>
        )
    }
}

export default Host;