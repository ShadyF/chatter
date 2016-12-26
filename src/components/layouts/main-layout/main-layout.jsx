import {Col} from 'react-bootstrap'

export default function MainLayout(props) {
    "use strict";
    return (
        <Col md={6} mdOffset={3}>
            {props.children}
        </Col>
    )
}