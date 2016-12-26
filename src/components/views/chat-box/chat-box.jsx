import React from 'react'
import {FormGroup, InputGroup, Button, FormControl, Panel} from 'react-bootstrap'

function createMessage(message, index) {
    "use strict";
    return (
        <li key={'message-' + index} className="message-item">
            {message}
        </li>
    )
}

const messageField = (
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
);

export default function ChatBox(props) {
    "use strict";
    return (
        <Panel footer={messageField}>
            <ol className="message-box">
                {props.messages.map(createMessage)}
            </ol>
        </Panel>
    )
}