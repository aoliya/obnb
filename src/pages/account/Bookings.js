import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import axios from 'axios';
import './Account.css';


function Bookings(props){
    const bookings = props.bookings.map((booking, i)=>{
        const dates = `${moment(booking.checkIn).format('MMM Do')} - ${moment(booking.checkOut).format('MMM Do YYYY')}`;

    const cancelBooking = async(bid, location) => {
        const cancelBooking = await swal({
            text: `Are you sure you want to cancel your trip to ${location}?`,
            icon: 'warning',
            buttons: true
        })
        if(cancelBooking){
            const cancelUrl = `${window.apiHost}/reservation/cancel`;
            const data={ 
                token: props.token, 
                bid
            }
            const resp = await axios.post(cancelUrl, data)
            if(resp.data.msg === "cancelled"){
                swal({
                    title: "Your reservation successfully cancelled",
                    icon: "success"
                })
            }else{
                swal({
                    title: "There was an error cancelling",
                    icon: "error"
                })
            }
        }
    }
        return(
            <tr key={i} className="booking-row">
                <td>{booking.status === 'confirmed' && props.type === 'past'
                ? "complete"
                : booking.status
            }
                </td>
                <td>
                    <div className="booking-detail">{dates}</div>
                    <div className="booking-detail">{booking.venueData.title}</div>
                    <div className="booking-detail">{booking.venueData.location}</div>
                </td>
                <td>
                    <div className="booking-detail">Confirmation #: {booking.conf}</div>
                    <div className="booking-detail">{booking.numberOfGuests} Guests, {booking.totalNights} Nights</div>
                    <div className="booking-detail">${booking.pricePerNight} per night</div>
                    <div className="booking-detail">${booking.totalPrice} Total</div>
                </td>
                <td>
                    <div className="booking-detail pointer">
                        Print Reservation
                    </div>
                    {props.type==="upcoming" && booking.status !== "cancelled"
                        ? <div onClick={() =>cancelBooking(booking.id, booking.venueData.location)} className="booking-detail pointer">Cancel Confirmation</div>
                       : <></>
                    }
                    
                </td>
            </tr>
        )
        
    })
    return(
        <table className="booking">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Dates and location</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings}
            </tbody>
        </table>
    )
}

export default Bookings