import React, {Component} from 'react';
import './SingleVenue.css';
import axios from 'axios';
import Point from './Point';
import {connect} from 'react-redux';
import openModal from '../../actions/openModal';
import {bindActionCreators} from 'redux';
import Login from '../login/Login';
import moment from "moment";
import swal from 'sweetalert';
import scriptLoad from '../../utilityFunc/scriptLoad';

class SingleVenue extends Component {
    state={
        singleVenue:{}, 
        points: [],
        checkIn:'',
        checkOut:''
    }
    
    async componentDidMount(){
        const vId = this.props.match.params.vid;
        const url = `${window.apiHost}/venue/${vId}`;
        const axiosRespone = await axios.get(url);
        const singleVenue = axiosRespone.data;

        const pointsUrl = `${window.apiHost}/points/get`;
        const pointsResponse = await axios.get(pointsUrl);

        const points = singleVenue.points.split(',').map((point, i) =>{
            return(<Point key={i} pointDescription={pointsResponse.data} point={point} />)
        })
        this.setState({singleVenue, points})
    }
    
    checkInHandleChange=(e)=>{
        this.setState({checkIn: e.target.value})
    }

    checkOutHandleChange=(e)=>{
        this.setState({checkOut: e.target.value})
    }
    reserveVenue = async(e) => {
        const startDay = moment(this.state.checkIn)
        const endDay = moment(this.state.checkOut)
        const diffDays = endDay.diff(startDay, 'days')
        if(diffDays<1){
            swal({
                title: "Check out date must be after check in date",
                icon: "error"
            })
        }else if(isNaN(diffDays)){
            swal({
                title: "Make sure your dates are valid",
                icon: "error"
            })
        }else{
            const pricePerNight = this.state.singleVenue.pricePerNight;
            const totalPrice = pricePerNight*diffDays;
            const stripeScriptUrl = 'https://js.stripe.com/v3';
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';
            await scriptLoad(stripeScriptUrl);
            //invoke stripe
            const stripe = window.Stripe(stripePublicKey);
            const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
            const data = {
                venueData: this.state.singleVenue,
                totalPrice,
                diffDays,
                pricePerNight,
                checkIn: this.state.checkIn,
                checkOut: this.state.checkOut,
                token: this.props.auth.token,
                currency: 'USD'
            }
            const sessionVar = await axios.post(stripeSessionUrl, data);
            stripe.redirectToCheckout({
                sessionId: sessionVar.data.id
            }).then((result)=>{
                console.log(result)
            }) 

        }
    }
    render(){
        const singVenue = this.state.singleVenue;
        
        return(
            <div className="single-venue row">
                <div className="main-box col s8 offset-s2">
                    <div className="left-box">
                        <div className="img-box">
                            <div className="location">{singVenue.location}</div>
                            <div className="rating"><i className="material-icons">star</i>{singVenue.rating}</div>
                            <div className="">
                            <img src={singVenue.imageUrl} alt="" />
                            </div> 
                        </div>
                        <div className="info-box">
                            <div className="title">{singVenue.title}</div>
                            <div className="guests">{singVenue.guests } <span> guests</span>
                            </div>
                            <div className="divider"></div>
                                {this.state.points}
                            <div className="divider"></div>
                            <div className="details-bottom">
                                <div className="details">{singVenue.details}</div>
                                <div className="divider"></div>
                                <h3>Amenities</h3>
                                <div className="amenities">{singVenue.amenities}</div>
                                
                        </div>
                                
                     </div>
                    
                    </div>
                    <div className="right-box">
                        <div className="reserve-box">
                            <div className="price-rating-box">
                                <div className="price-per-day">${singVenue.pricePerNight}</div>
                                <div className="rating"><i className="material-icons">star</i>{singVenue.rating}</div>
                            </div>
                            <div className="checkin-checkout-box">
                                <div className="col s6">
                                    Check-In
                                    <input type="date" onChange={this.checkInHandleChange} />
                                </div>
                                <div className="col s6">
                                    Check-Out
                                    <input type="date" onChange={this.checkOutHandleChange} />
                                </div>
                            </div>
                            <div className="guests-box col s12">
                                <select className="browser-default">
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guest</option>
                                    <option value="3">3 Guest</option>
                                    <option value="4">4 Guest</option>
                                    <option value="5">5 Guest</option>
                                    <option value="6">6 Guest</option>
                                    <option value="7">7 Guest</option>
                                    <option value="8">8 Guest</option>
                                </select>
                            </div>
                            <div className="col s12 center">
                                {this.props.auth.token  
                                ? <button onClick={this.reserveVenue} type="button" className="btn red accent-2">Reserve
                                </button>
                                : <div>You must <span className="login-signup" onClick={()=> {this.props.openModal('open', <Login />)}}>login</span> to reserve</div>

                                    
                                }
                                        
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                
            </div>

            
               
        )
    }
}



function mapStateToProps(state){
    return{
        auth: state.auth,
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
        openModal
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleVenue);