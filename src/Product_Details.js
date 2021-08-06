import React, {useContext, useState} from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import AppContext from './context'

export default function Product() {
    let match = useRouteMatch()
    let[hidden, setHidden] = useState('-1')
    let history = useHistory()
    const state = useContext(AppContext)
    function cartClick() {
        history.push("/cart")
    }

    if  (!state.categories){
        return <div><img src={require('./loading.gif')} alt="loading..."></img></div>
    }
    else{
        let item = null
        item = Object.values(state.products).find(x => x.id.toString() === match.params.id)
        // state.addToRecents(item.id)

        if (!item){
            return(
                <h1 className="p-3">
                    That item ID is not found, please try again.
                </h1>
            )
        }
        else {
            return(
                <div className="rounded m-2" style={{backgroundColor: "white", height: "37rem"}}>
                    <h1 className="pt-5">
                        {item.name} -- ${item.price}
                    </h1>
                    <div className="float-right m-5 p-2 " style={{backgroundColor: "#000000"}}>
                        <bs.Row noGutters className="m-0" style={{backgroundColor: "#004876"}}>
                            <img 
                                className='p-2' 
                                src={require('../public/media/products/'+item.filename+hidden+'.png')} 
                                alt='main'
                                height="300px"
                                width="300px"
                            /> 
                        </bs.Row>
                        <bs.Row noGutters className='p-2 m-0' style={{backgroundColor: "#004876"}}>
                            <bs.Col md="3">
                                <img className='border' 
                                    src={require('../public/media/products/'+item.filename+'-1.png')} 
                                    alt='small-1'
                                    style={{height:'30px', width: '30px'}}
                                    onMouseEnter= {() => setHidden('-1')}
                                /> 
                            </bs.Col>
                            <bs.Col md="3">
                                <img className='border' 
                                    src={require('../public/media/products/'+item.filename+'-2.png')} 
                                    alt='small-2'
                                    style={{height:'30px', width: '30px'}}
                                    onMouseEnter= {() => setHidden('-2')}
                                    onMouseLeave= {() => setHidden('-1')}
                                    />
                            </bs.Col>
                            <bs.Col md="3">
                                <img className='border' 
                                    src={require('../public/media/products/'+item.filename+'-3.png')} 
                                    alt='small-3'
                                    style={{height:'30px', width: '30px'}}
                                    onMouseEnter= {() => setHidden('-3')}
                                    onMouseLeave= {() => setHidden('-1')}
                                    />
                            </bs.Col>
                            <bs.Col md="3">
                                <img 
                                    className='border' src={require('../public/media/products/'+item.filename+'-4.png')} 
                                    alt='small-4'
                                    style={{height:'30px', width: '30px'}}
                                    onMouseEnter= {() => setHidden('-4')}
                                    onMouseLeave= {() => setHidden('-1')}
                                    />
                            </bs.Col>
                        </bs.Row>
                    </div>
                    <p className="pt-5 pl-3" style={{textAlign: "left"}}>
                        {item.description}
                    </p>
                    <bs.Button
                        variant="warning"
                        onClick={e => {
                            state.addToCart(item.id)
                            state.addToRecents(item.id)
                            cartClick()
                        }}
                    >
                        Add to Cart
                    </bs.Button>
                </div>
            )
        }
    }
}