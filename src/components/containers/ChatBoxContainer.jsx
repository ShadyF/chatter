import {connect} from 'react-redux'
import ChatBox from '../views/ChatBox/ChatBox'
import * as actions from '../../actions/chat-actions'

const mapStateToProps = state => {
    return state.chatState
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