import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import produce from 'immer'

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.actions = {
            addToCart: this.addToCart,
            removeFromCart : this.removeFromCart,
            addToRecents: this.addToRecents,
            getTotayQty: this.getTotayQty,
            getCartTotal: this.getCartTotal,
            clearCart: this.clearCart,
            getCCError: this.getCCError,
            setCCError: this.setCCError,

        }
        this.state = {
            categories: null,
            products: {},
            cart: {
            12123: 10,
            477227: 2
            },
            recentList: [],
            CCError: null
        }
    } 

    clearCart= pid => {
        this.setState(state => produce(state, draft => {
            for (let item in draft.cart){
                delete draft.cart[item]
            }
        }))
    }

    getCCError() {
        return(this.CCError)
    }

    setCCError = errorMsg => {
        this.setState(state => produce(state, draft => {
            draft.CCError = errorMsg
        }))
    }

    getCartTotal() {
        let cartTotal = 0
        Object.entries(this.cart).forEach(([key, value]) => {
            let currentProduct = Object.values(this.products).find(x => x.id.toString() === key)
            if (currentProduct){
                cartTotal += currentProduct.price * value
            } 
        })
        return(cartTotal)
    }

    getTotayQty() {
        let totQty = 0
        for (let item in this.cart){
            totQty += this.cart[item]
        }
        return(totQty)
    }

    addToRecents = pid => {
        this.setState(state => produce(state, draft => {
            let returnList = []
            for (let item in draft.recentList){
                if (draft.recentList[item] !== pid) {
                    returnList.push(draft.recentList[item])
                }
            }
            returnList.push(pid)
            draft.recentList = returnList
        }))
    }

    addToCart = pid => {
        this.setState(state => produce(state, draft => {
            if (pid in draft.cart){
                draft.cart[pid] = draft.cart[pid] + 1
            }
            else {
                draft.cart[pid] = 1
            }
        }))
    }

    removeFromCart = pid => {
        this.setState(state => produce(state, draft => {
            delete draft.cart[pid]
        }))
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        const resp = await axios.get('https://dakotasarcticapi.herokuapp.com/category')
        const resp2 = await axios.get('https://dakotasarcticapi.herokuapp.com/product')

        this.setState({...this.state, categories: resp.data, products: resp2.data})
    }
}