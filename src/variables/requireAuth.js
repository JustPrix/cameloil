import React from "react";
import { connect } from "react-redux";
import {addFlashMessage} from "../action/flashMessages";


export default function(ComposedComponent){
    class Authenticate extends React.Component {
        
        componentDidMount(){ 
         //   console.log("Authenticate")
         //   console.log(this.props.isAuthenticated);
            
            if(localStorage.getItem("refreshtoken") == null){
                this.props.addFlashMessage({
                    type: "error",
                    text: "Precisa fazer o login para autenticar"
                  });
                  this.props.history.push("/login"); 
            }
            
        }

       

        componentDidUpdate(){
           
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type: "error",
                    text: "Precisa fazer o login para autenticar"
                  });
                this.props.history.push("/login"); 
            }
        }

        render(){
            return(
                <ComposedComponent {...this.props}/>
            );
        }
    
    }
    const mapStateToProps = state => ({
            isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}