import React from 'react'
import * as bs from 'react-bootstrap'
import "./middle.scss"
import {Link} from 'react-router-dom'

export default function productCard(props){
    return(
        <bs.Col md="3" className="p-1" id={props.product.category}>
            <bs.Card className="shadow p-1" style={{ width: '18rem' }}>
                <bs.Card.Img variant="top" src={require('../public/media/products/'+props.product.filename+'-1.png')}/>
                <bs.Card.Body className="rounded" style={{ backgroundColor: "#004876"}}>
                    <bs.Card.Title style={{color: 'white'}}>{props.product.name}</bs.Card.Title>
                    <bs.Card.Text style={{color: 'white'}}>
                        ${props.product.price}
                    </bs.Card.Text>
                    <Link to={{
                        pathname: '/item/'+props.product.id,
                    }} className="btn btn-primary card-button">Details
                    </Link>
                    </bs.Card.Body>
            </bs.Card>
        </bs.Col>
    )
}