import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../../actions/openModal';
import SignUp from './SignUp';
import registerAction from '../../actions/registerAction';
import './Login.css';
import axios from 'axios';
import swal from 'sweetalert'

class Login extends Component {

    emailHandleChange=(e)=>{
        this.setState({email:e.target.value})
    }

    passwordHandleChange=(e)=>{
        this.setState({password:e.target.value})
    }

    submitLogin= async(e)=>{
        e.preventDefault();
       
        if(!this.state.email){
            swal({
                title: "Invalid email or password",
                text: "Please provide a valid email and password",
                icon: "error",
                
            })
        }else{
            const url = `${window.apiHost}/users/login`;
            const data = {
            email:this.state.email,
            password:this.state.password

            }
            const resp = await axios.post(url, data);
            const token = resp.data.token;

            if(resp.data.msg === 'badPass' || resp.data.msg === 'noEmail'){
                swal({
                    title: "Invalid email or password",
                    text: "Please provide a valid email and password",
                    icon: "error",
                    
                })
            }else if(resp.data.msg === 'loggedIn'){
                swal({
                    title: "Welcome!",
                    icon: "success",
                    
                })
                //calling register action to update auth reducer
                this.props.registerAction(resp.data)
            }
 
        }
    
    }


    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login button">Continue with Facebook</button>
                    <button className="google-login button">Continue with Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <input type="text" onChange={this.emailHandleChange} className="browser-default" placeholder="Email address" />
                    <input type="password" onChange={this.passwordHandleChange} className="browser-default" placeholder="Password" />
                    <button className="sign-up-button button">Login</button>
                    <div className="divider"></div>
                    <div>Don't have an account? <span className="pointer" onClick={()=> {this.props.openModal('open', <SignUp />)}}>Sign up</span></div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        auth: state.auth,
    }
}


function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal,
        registerAction: registerAction
    }, dispatcher)
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);