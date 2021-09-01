import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios  from 'axios';
import './PaymentSuccess.css';
import moment from "moment";
import Spinner from '../../utility/spinner/Spinner';
import {Link} from 'react-router-dom';



class PaymentSuccess extends Component{
    state={
        reservationDetails:{},
        venueData: {},
        isWaiting: true
    }

    async componentDidMount(){
        const stripeToken = this.props.match.params.stripeToken;
        const token = this.props.auth.token;
        const data ={
            stripeToken,
            token,
            
        }
        const successUrl = `${window.apiHost}/payment/success`;
        const resp = await axios.post(successUrl, data);
        this.setState({
            reservationDetails: resp.data.reservationDetails,
            userData:resp.data.userData,
            isWaiting: false
        })
    }

    render(){
        if(this.state.isWaiting){
            return(<Spinner />)
        }
        const resDetails = this.state.reservationDetails;
        console.log(resDetails)
        const venueData = resDetails.venueData;
        console.log(venueData)
        return(
            <div className="reservation-success row">
                <div className="reservation-details col s7 ">
                    <h3>Your reservation is confirmed</h3>
                    <p>You're going to <span>{venueData.location}</span></p>
                    <div className="col s12 ">
                        <img src={venueData.imageUrl} alt=""/>
                    </div>
                    <p>{venueData.title}</p>
                    <div className="divider row col m12"></div>
                    
                    
                    <div className="check-in-out row">
                        <div className="col s6 left">
                            <div>Check in</div>
                            <div className="check-in s6">
                            {moment(resDetails.checkIn).format('MMM Do, YYYY')}
                            </div>
                        </div>
                        <div className="col s6 right">
                            <div>Check out</div>
                            <div className="check-out s6">
                                {moment(resDetails.checkOut).format('MMM Do, YYYY')}
                            </div>
                        </div>
                        <div className="divider row col m12"></div>
                        <div className="col m12 title-text">
                            {venueData.title}
                        </div>  
                        <div className="col m12 details">
                            {venueData.details}
                        </div>  
                            
                    </div>
                    
                </div>
                <div className="reservation-details col s5 ">
                <div className="charges-text col m12">Charges</div>
                        <div className="row col m12">
                            <div className="left"> ${resDetails.pricePerNight} * {resDetails.diffDays} <span>days</span></div>
                            <div className="right">${resDetails.totalPrice}</div>
                        </div>
                        <div className="divider row col m12"></div>
                        <div className="row col m12">
                            <div className="left">Discount</div>
                            <div className="right">$0</div>
                        </div> 
                        <div className="divider row col m12"></div> 
                        <div className="row col m12">
                            <div className="left">Guests</div>
                            <div className="right">{venueData.guests}</div>
                        </div> 
                        <div className="divider row col m12"></div>                             
                        <div className="row col m12 total">
                            <div className="left">TOTAL</div>
                            <div className="right">${resDetails.totalPrice}</div>
                           
                        </div>
                        <div className="change-reserve-button row col m12">
                            <Link to="/account"> <button>Change reservation </button></Link>
                        </div>
                        
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PaymentSuccess)