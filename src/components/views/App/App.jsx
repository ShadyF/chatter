import React, {Component, PropTypes} from 'react'
import {Col, Grid, Row} from 'react-bootstrap'

import styles from './App.scss'

export default class App extends Component {
    render() {
        return (
            <Grid fluid={true}>
                <Row className={styles.row}>
                    <Col md={6} mdOffset={3}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
};