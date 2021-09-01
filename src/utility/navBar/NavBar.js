import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../../actions/openModal';
import logoutAction from '../../actions/logoutAction';
import Login from '../../pages/login/Login';
import SignUp from '../../pages/login/SignUp';
import logo from '../images/house.png'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
        }

        this.menuRef = React.createRef();
        this.btnRef = React.createRef();
    }
    
    handleDropdown = () => {
        this.setState(prevState => ({isOpen:!prevState.isOpen}));
    }
         
    handler = (event) => {
        if(!this.menuRef.current.contains(event.target) && !this.btnRef.current.contains(event.target)){
            this.setState({isOpen: false})   
        }
    }   
    
    componentDidUpdate(oldProps){
        if(oldProps.auth.token !== this.props.auth.token){
            this.props.openModal('closed', "");
    }    
        
        
        const {isOpen} = this.state;
        // console.log(isOpen)
        if(isOpen){
            document.addEventListener('mousedown', this.handler)
        }else{
            document.removeEventListener('mousedown', this.handler)

        }
   }
    
    render() {
        let isOpen = this.state.isOpen;
        let navColor = 'transparent';
        if (this.props.location.pathname !== '/') {
            //user is on Home page
            navColor = "#ee6e73";
        }
        return (
            <div className="container-fluid nav">
                <div className="row">
                    <nav className={navColor}>
                        <div className="nav-wrapper">
                            <div className="logo-box">
                                <div>
                                    <img className="logo-box-img" src={logo} alt="" />
                                </div>
                                <div><h1>obnb</h1></div>
                            </div>
                            
                            
                            <div className="right">
                                <div>
                                    <ul id="nav-mobile" className="nav-right">
                                        
                                        <li><Link to="/" >Become a host</Link></li>
                                        <li><Link to="/" >$ USD</Link></li>
                                    </ul>
                                </div>
                                <div>
                                <button ref={this.btnRef} onClick={this.handleDropdown} className="login-signin-button">
                                    <div>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" style={{width: '30px', height: "22px", marginTop: '13px', marginLeft:'5px'}} className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                                    </div>
                                    <div>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" className="svg-inline--fa fa-user-circle fa-w-16" role="img" style={{ height: "100%", width: "100%", marginTop: "6px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                                    </div>
                                </button>
                                </div>
                                
                            </div>
                           
                        </div>
                    </nav>

                </div>
                <div ref={this.menuRef} className={isOpen ? "nav-dropdown-active" : "nav-dropdown"}>
                        <ul className="ul-dropdown">
                        {this.props.auth.email 
                                    ? <>
                                    <li>Hello, {this.props.auth.email}</li>
                                    <li onClick={()=>this.props.logoutAction()}>Logout</li>

                                    </>
                                    : <>
                                        <li onClick={()=>{this.props.openModal('open', <SignUp />)}}>Sign Up</li>
                                        <li onClick={()=>{this.props.openModal('open', <Login />)}}>Log in</li>
                                      </>
                                }
                                <div className="divider"></div>
                                <li><Link to="/" >Host your home</Link></li>
                                <li><Link to="/" >Host an experience</Link></li>
                                <li><Link to="/" >Help</Link></li>
                        </ul>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal,
        logoutAction: logoutAction,
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


