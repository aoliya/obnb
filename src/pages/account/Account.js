import React, { Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {Route} from 'react-router-dom';
import AccountSideBar from './AccountSideBar';
import Bookings from './Bookings';
import ChangePassword from './ChangePassword';

import './Account.css';


class Account extends Component{
    state={
        pastBookings: [],
        upcomingBookings: [],
    }

    async componentDidMount(){
        const accountUrl = `${window.apiHost}/users/getBookings`;
        const data = {
            token: this.props.auth.token
        }
        const resp = await axios.post(accountUrl, data);;
        let pastBookings = [];
        let upcomingBookings = [];
        resp.data.forEach(booking => {
            const today = moment();
            const checkOutDate = moment(booking.checkOut);
            const diffDays = checkOutDate.diff(today, 'days');
            if(diffDays < 0){
                pastBookings.push(booking);
            }else{
                upcomingBookings.push(booking);
            }
        })
        this.setState({
            pastBookings,
            upcomingBookings
        })

    }

    render(){
        const {pastBookings, upcomingBookings} = this.state;
        return(
            <div className="account container-fluid">
                <AccountSideBar />
                <div className="row">
                    <div className="col s8 offset-s3">
                        <Route exact path='/account/reservations/confirmed'>
                            <Bookings type="upcoming" bookings={upcomingBookings} token={this.props.auth.token} />
                        </Route>
                        
                        <Route exact path='/account/reservations/past'>
                            <Bookings type="past" bookings={pastBookings} />
                        </Route>
                        <Route exact path='/account/change-pass' component={ChangePassword} />
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

export default connect(mapStateToProps)(Account);

