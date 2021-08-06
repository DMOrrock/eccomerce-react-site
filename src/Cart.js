import React, {useContext} from 'react'
import * as bs from 'react-bootstrap'
import AppContext from './context'
import {Link} from 'react-router-dom'

function Cart() {
  const state = useContext(AppContext)  
  let cartTotal = state.getCartTotal()
  if  (!state.categories){
    return <div><img src={require('./loading.gif')} alt="loading..."/></div>
  }
  else{
    return (
        <bs.Container fluid className="p-4">
            <bs.Row noGutters className="rounded-top" style={{backgroundColor: 'white'}}>
                <bs.Col>
                    <h1>Cart</h1>
                </bs.Col>
            </bs.Row>
            <bs.Row noGutters className="rounded-bottom" style={{backgroundColor: 'white'}}>
                <bs.Col>
                    <bs.Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(state.cart).map(([key, value]) => {
                            let item = Object.values(state.products).find(x => x.id.toString() === key)
                            return(
                                    <tr key={key}>
                                        <th>
                                            <img 
                                                className='border' 
                                                src={require('../public/media/products/'+item.filename+'-1.png')} 
                                                alt='main'
                                                height="100px"
                                                width="100px"
                                            /> 
                                        </th>
                                        <th style={{paddingTop:"3rem"}}>{item.name}</th>
                                        <th style={{paddingTop:"3rem"}}>{value}</th>
                                        <th style={{paddingTop:"3rem"}}>{item.price}</th>
                                        <th style={{paddingTop:"3rem"}}>{(item.price * value).toFixed(2)}</th>
                                        <th style={{paddingTop:"3rem"}}>
                                            <bs.Button
                                                variant="outline-danger"
                                                onClick={e => {
                                                    state.removeFromCart(key)
                                                }}
                                            >
                                                Remove
                                            </bs.Button>
                                        </th>
                                    </tr>
                            )
                        })}
                        <tr>
                            <th><b>GRAND TOTAL</b></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{cartTotal.toFixed(2)}</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th><Link to={{
                                    pathname: '/checkout/',
                                }} className="btn btn-primary">Checkout
                                </Link>
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </tbody>
                    </bs.Table>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )
 }  
}

export default Cart