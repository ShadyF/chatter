import {connect} from 'react-redux'
import ChatBox from '../views/chat-box/chat-box'
import * as messageActions from '../../actions/message-actions'

const mapStateToProps = state => {
    return {
        messages: state.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMessageSend: () => {
            dispatch(messageActions.sendMessage())
        },
        onMessageFieldChange: (message) =>{
            "use strict";
            dispatch(messageActions.messageFieldUpdate(message));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)