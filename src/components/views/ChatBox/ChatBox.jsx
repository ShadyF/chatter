import React, {Component} from 'react'
import {TransitionMotion, spring} from 'react-motion'
import ScrollBars from 'react-custom-scrollbars/lib'
import moment from 'moment'
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
} from 'react-bootstrap/lib'

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

        // Needed for createMessage to be able to access randColor
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidUpdate() {
        const {scrollBar} = this.refs;

        const scrollOffsetTrigger = 150;
        const scrollTop = scrollBar.getScrollTop();
        const clientHeight = scrollBar.getClientHeight();
        const scrollHeight = scrollBar.getScrollHeight();

        this.shouldScrollBottom = scrollTop + clientHeight > scrollHeight - scrollOffsetTrigger;

        if (this.shouldScrollBottom) {
            // To ensure DOM element has actually been rendered and not only virtually by the render() method
            // removing window.requestAnimationFrame() will result in autoscrolling getting delayed by a single
            // render() update due to componentDidUpdate() getting called after render() has virtually modified DOM
            // but not in the browser
            window.requestAnimationFrame(() => {
                scrollBar.scrollTop(scrollHeight);
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
        const socketid = sessionStorage.getItem('socketid');
        return (
            <ListGroupItem key={key} className={message.ownMessage ? styles.ownMessage : styles.message}
                           style={{transform: 'translateX(' + style.offset + '%)'}}>
                {!message.ownMessage && <h5 className={styles.handle} style={this.randColor}>{message.handle}</h5>}
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

    static willEnter(config) {
        // Starting position, comes out from the left if not user's own message
        // comes out from the right if message is indeed the user's own message
        const message = config.data;
        return message.ownMessage ? {offset: 100} : {offset: -100};
    }

    render() {
        return (
            <div className={styles.chatBox}>
                <Panel footer={this.getMessageField()}>
                    <ScrollBars ref="scrollBar" style={{overflow: 'hidden'}} renderTrackHorizontal={() => <div></div>}>
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
                    </ScrollBars>
                </Panel>
                <Modal show={!this.props.handle_set || this.props.connecting}>
                    {!this.props.handle_set && !this.props.connecting &&
                    <Modal.Header>
                        <Modal.Title>Set your username!</Modal.Title>
                    </Modal.Header>}

                    <Modal.Body>
                        {!this.props.handle_set && !this.props.connecting &&
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
                        </form>}
                        {this.props.connecting &&
                        <div className={styles.connectionWrapper}>
                            <div className={styles.spinner}></div>
                            <div className={styles.connectionTextWrapper}>
                                <span>Connecting to server</span>
                                <div className={styles.elipsis}></div>
                            </div>
                        </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

