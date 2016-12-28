import {connect} from 'react-redux'
import ChatBox from '../views/chat-box/chat-box'
import * as actions from '../../actions/chat-actions'

const mapStateToProps = state => {
    return {
        messages: state.chatState.displayed_messages,
        handle_set: state.chatState.handle_set,
        handle: state.chatState.handle
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMessageSend: () => {
            dispatch(actions.sendMessage())
        },
        onMessageFieldChange: message =>{
            dispatch(actions.messageFieldUpdate(message));
        },
        onHandleSet: () => {
            dispatch(actions.setHandle())
        },
        onHandleUpdate: handle => {
            dispatch(actions.handleUpdate(handle));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)