import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../../actions/openModal';
import Login from './Login';
import axios from 'axios';
import swal from 'sweetalert';
import registerAction from '../../actions/registerAction';

class SignUp extends Component{
    constructor(){
        super();
        this.state={
            signupWithEmail: <button type="button" onClick={this.showInputs} className="sign-up-button button">Sign up with email</button>
        }
    }

    emailHandleChange=(e)=>{
        this.setState({email:e.target.value})
    }

    passwordHandleChange=(e)=>{
        this.setState({password:e.target.value})
    }

    showInputs=()=>{
        this.setState({ 
            signupWithEmail:<SignUpInputFields 
            changeEmail={this.emailHandleChange} 
            changePassword={this.passwordHandleChange} />
        })
    }

    submitSignUp= async(e)=>{
        e.preventDefault();
        // console.log(this.state.email)
        // console.log(this.state.password)
        if(!this.state.email){
            swal({
                title: "Invalid email or password",
                text: "Please provide a valid email and password",
                icon: "error",
                
            })
        }else{
            const url = `${window.apiHost}/users/signup`;
            const data = {
            email:this.state.email,
            password:this.state.password

            }
            const resp = await axios.post(url, data);
            const token = resp.data.token;

            if(resp.data.msg === 'userExists'){
               swal({
                   title: "Email exists",
                   text: "The email you provided is already registered",
                   icon: "error",
                   
               })
            }else if(resp.data.msg === 'invalidData'){
                swal({
                    title: "Invalid email or password",
                    text: "Please provide a valid email and password",
                    icon: "error",
                    
                })
            }else if(resp.data.msg === 'userAdded'){
                swal({
                    title: "You have signed up successfully!",
                    icon: "success",
                    
                })
                //calling register action to update auth reducer
                this.props.registerAction(resp.data)
            }

            // const checkTokenUrl = `${window.apiHost}/users/token-check`;
            // const resp2 = await axios.post(checkTokenUrl, {token});
            // console.log(resp2.data);
        }
        
    }

    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.submitSignUp}>
                    <button className="facebook-login button">Continue with Facebook</button>
                    <button className="google-login button">Continue with Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    {this.state.signupWithEmail}
                    <div className="divider"></div>
                    <div>Already have an account? <span className="pointer" onClick={()=>{this.props.openModal('open', <Login />)}}>Log in</span></div>
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
        registerAction: registerAction,
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);





const SignUpInputFields=(props)=>{
    return(
        <div className="sign-up-wrapper">
            <div className="col m12">
                <div className="input-field" id="email">
                    <input type="email" placeholder="Email" onChange={props.changeEmail} />
                </div>
                <div className="input-field" id="password">
                    <input type="password" placeholder="Password" onChange={props.changePassword} />
                </div>
                <div className="col m12">
                    <button type="submit" className="sign-up-button button">Continue</button>
                </div>
            </div>
        </div>
    )
}