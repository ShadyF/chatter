import React from 'react'
import {
    FormGroup,
    InputGroup,
    Button,
    FormControl,
    ControlLabel,
    HelpBlock,
    Panel,
    ListGroup,
    ListGroupItem,
    Modal
} from 'react-bootstrap'

function createMessage(message, index) {
    "use strict";
    return (
        <ListGroupItem key={'message-' + index} className="message-item">
            {message}
        </ListGroupItem>
    )
}

const messageField = props => {
    "use strict";
    return (
        <form>
            <FormGroup>
                <InputGroup>
                    <FormControl type="text"
                                 value={props.message_field}
                                 placeholder="Enter Message..."
                                 onChange={e => props.onMessageFieldChange(e.target.value)}
                    />
                    <InputGroup.Button>
                        <Button type="submit"
                                onClick={e => {
                                    e.preventDefault();
                                    props.onMessageSend();
                                }}
                        >
                            Send
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </form>
    )
};


export default function ChatBox(props) {
    return (
        <div>
            <Panel footer={messageField(props)}>
                <ListGroup className="message-list">
                    {props.messages.map(createMessage)}
                </ListGroup>
            </Panel>
            <Modal show={!props.handle_set}>
                <Modal.Header>
                    <Modal.Title>Set your username!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text"
                                         value={props.handle}
                                         placeholder="Pick a username..."
                                         onChange={e => props.onHandleUpdate(e.target.value)}/>
                            <HelpBlock> Username should be greater than 2 characters</HelpBlock>
                        </FormGroup>
                        <Button type="submit"
                                onClick={e => {
                                    e.preventDefault();
                                    props.onHandleSet();
                                }}
                                disabled={props.handle.length < 2}
                        >
                            Set Username
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}