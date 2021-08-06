import React, {useContext} from 'react'
import * as bs from 'react-bootstrap'
import ProductCard from './Product_Card'
import { useRouteMatch } from 'react-router-dom'
import AppContext from './context'

function Middle() {
    const state = useContext(AppContext)
    let match = useRouteMatch()
    let category = match.params.name
    if  (!state.categories){
        return <div><img src={require('./loading.gif')} alt="loading..."></img></div>
    }
    else{
        let newDict = {}
        if (category){
            newDict = Object.values(state.products).filter(match => match.category.title === category)
        }
        else {
            newDict = Object.values(state.products)
        }

        return (
            <bs.Container fluid className="p-4">
                <bs.Row className="p-0">
                {Object.values(newDict).map(x => {
                    return(
                        <ProductCard product={x} key={x.id}/>
                    )
                })}
                </bs.Row>
            </bs.Container>
        )
    }  
}

export default Middle;