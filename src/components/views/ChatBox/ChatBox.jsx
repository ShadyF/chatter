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

import {TransitionMotion, spring} from 'react-motion'
import moment from 'moment'
import styles from './ChatBox.scss'

const RGB = {
    r: Math.floor(Math.random() * 220),
    g: Math.floor(Math.random() * 220),
    b: Math.floor(Math.random() * 220)
};

const randColor = {
    color: "rgb(" + RGB.r + ", " + RGB.g + ", " + RGB.b + ")"
};

function createMessage(config) {
    "use strict";

    const message = config.data;
    const key = config.key;
    const style = config.style;

    const handle = message.handle;
    const text = message.message;
    const timestamp = moment(message.timestamp);

    return (
        <ListGroupItem key={key} className={styles.message}
                       style={{transform: 'translateX(' + style.offset + '%)'}}>
            <h5 className={styles.handle} style={randColor}>{message.handle}</h5>
            <span className={styles.content}>{message.message}</span>
            <small className={styles.timestamp}>{timestamp.format('LT')}</small>
        </ListGroupItem>
    )
}

const messageField = props => {
    "use strict";
    return (
        <form>
            <FormGroup>
                <InputGroup>
                    <FormControl
                        type="text"
                        value={props.message_field}
                        placeholder="Enter Message..."
                        onChange={e => props.onMessageFieldChange(e.target.value)}
                    />
                    <InputGroup.Button>
                        <Button
                            type="submit"
                            className={styles.sendButton}
                            onClick={e => {
                                e.preventDefault();
                                props.onMessageSend();
                            }
                            }>
                            Send
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </form>
    )
};

function willEnter() {
    "use strict";
    // Starting position, comes out from the left
    return {offset: -100};
}

export default function ChatBox(props) {
    return (
        <div className={styles.chatBox}>
            <Panel footer={messageField(props)}>
                <ListGroup className="message-list">
                    <TransitionMotion
                        willEnter={willEnter}
                        styles={props.displayed_messages.map((msg, index) => ({
                            // Must have these there keys
                            // style corresponds to ending value
                            data: msg,
                            key: 'message-' + index,
                            style: {offset: spring(0)},
                        }))}>
                        {interpolatedStyles =>
                            // Must be wrapped in a div else an except will be thrown by react
                            <div>
                                {interpolatedStyles.map(createMessage)}
                            </div>
                        }
                    </TransitionMotion>
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
                            <FormControl
                                type="text"
                                value={props.handle}
                                placeholder="Pick a username..."
                                onChange={e => props.onHandleUpdate(e.target.value)}/>
                            <HelpBlock> Username should be greater than 2 characters</HelpBlock>
                        </FormGroup>
                        <Button
                            type="submit"
                            onClick={e => {
                                e.preventDefault();
                                props.onHandleSet();
                            }}
                            disabled={props.handle.length < 2}>
                            Set Username
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}