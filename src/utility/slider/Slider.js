import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';
import SlickSlider from 'react-slick';

class Slider extends Component {
    render() {
        const settings={
            dots:false,
            infinite: true,
            speed: 500,
            arrors:true,
            slidesToShow: 4,
            slidesToScrol: 1,
            responsive:[{
                breakpoint: 1024,
                settings:{
                    slidesToShow: 3,
                    slidesToScrol: 1
                }
            }, 
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 1,
                    slidesToScrol: 1
                }
            }
        ]
        }
        return (
            <div className="slick">
                <SlickSlider {...settings}>
                    {this.props.elements}
                </SlickSlider>

            </div>
        )
    }
}

export default Slider;