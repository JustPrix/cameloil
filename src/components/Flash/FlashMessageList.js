import React from "react";
import { connect } from "react-redux";
import {deleteFlashMessage} from "../../action/flashMessages"
import FlashMessage from "./FlashMessage";

class FlashMessageList extends React.Component {

    render(){
        const messages = this.props.messages.map(msg =>
            <FlashMessage key={msg.id} message={msg} deleteFlashMessage={this.props.deleteFlashMessage}/>   
        );
        return(
            <div>{messages}</div>
        );
    }

}

const mapStateToProps = state => ({
    messages: state.flashMessages
});


export default connect(mapStateToProps, {deleteFlashMessage}) (FlashMessageList);