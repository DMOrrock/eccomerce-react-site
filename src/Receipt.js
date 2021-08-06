import React from 'react';
import * as bs from 'react-bootstrap'

export default function Receipt() {
    return (
        <bs.Container fluid className="p-4">
            <bs.Row noGutters className="rounded-top" style={{backgroundColor: 'white'}}>
                <bs.Col>
                    <h1>Thank You For Your Purchase</h1>
                </bs.Col>
            </bs.Row>
            <bs.Row noGutters className="rounded-bottom" style={{backgroundColor: 'white'}}>
                <bs.Col>
                <p>
                    Your Order will arrive sometime next week
                </p>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )  
}
