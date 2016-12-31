import React, {Component} from 'react'
import ReactDOM from 'react-dom'
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

export default class ChatBox extends Component {
    constructor(props) {
        super(props);

        const randRGB = {
            r: Math.floor(Math.random() * 220),
            g: Math.floor(Math.random() * 220),
            b: Math.floor(Math.random() * 220)
        };

        this.randColor = {
            color: "rgb(" + randRGB.r + ", " + randRGB.g + ", " + randRGB.b + ")"
        };

        // Needed because create message access randColor
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this.refs.list).firstChild;
        const scrollOffsetTrigger = 150;
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight > node.scrollHeight - scrollOffsetTrigger;

        if (this.shouldScrollBottom) {
            // To ensure DOM element has actually been rendered and not only virtually by the render() method
            // removing window.requestAnimationFrame() will result in autoscrolling getting delayed by a single
            // render() update due to componentDidUpdate() getting called after render() has virtually modified DOM
            // but not in the browser
            window.requestAnimationFrame(() => {
                node.scrollTop = node.scrollHeight;
            })

        }
    }

    createMessage(config) {
        const message = config.data;
        const key = config.key;
        const style = config.style;

        const handle = message.handle;
        const text = message.message;
        const timestamp = moment(message.timestamp);

        return (
            <ListGroupItem key={key} className={styles.message}
                           style={{transform: 'translateX(' + style.offset + '%)'}}>
                <h5 className={styles.handle} style={this.randColor}>{message.handle}</h5>
                <span className={styles.content}>{message.message}</span>
                <small className={styles.timestamp}>{timestamp.format('LT')}</small>
            </ListGroupItem>
        )
    }

    getMessageField() {
        return (
            <form>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.props.message_field}
                            placeholder="Enter Message..."
                            onChange={e => this.props.onMessageFieldChange(e.target.value)}
                        />
                        <InputGroup.Button>
                            <Button
                                type="submit"
                                className={styles.sendButton}
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.onMessageSend();
                                }
                                }>
                                Send
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        )
    }

    static willEnter() {
        // Starting position, comes out from the left
        return {offset: -100};
    }

    render() {
        return (
            <div className={styles.chatBox}>
                <Panel ref="list" footer={this.getMessageField()}>
                    <ListGroup>
                        <TransitionMotion
                            willEnter={ChatBox.willEnter}
                            styles={this.props.displayed_messages.map((msg, index) => ({
                                // Must have these there keys
                                // style corresponds to ending value
                                data: msg,
                                key: 'message-' + index,
                                style: {offset: spring(0)},
                            }))}>
                            {interpolatedStyles =>
                                // Must be wrapped in a div else an except will be thrown by react
                                <div>
                                    {interpolatedStyles.map(this.createMessage)}
                                </div>
                            }
                        </TransitionMotion>
                    </ListGroup>
                </Panel>
                <Modal show={!this.props.handle_set}>
                    <Modal.Header>
                        <Modal.Title>Set your username!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>Username</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.handle}
                                    placeholder="Pick a username..."
                                    onChange={e => this.props.onHandleUpdate(e.target.value)}/>
                                <HelpBlock> Username should be greater than 2 characters</HelpBlock>
                            </FormGroup>
                            <Button
                                type="submit"
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.onHandleSet();
                                }}
                                disabled={this.props.handle.length < 2}>
                                Set Username
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

