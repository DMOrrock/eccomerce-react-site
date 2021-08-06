import React, {useContext} from 'react'
import * as bs from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field} from 'formik'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AppContext from './context'  
import axios from 'axios'
const stripePromise = loadStripe("pk_test_uY2kX8DuWYNwAm7gkjrZAheO00hLUwMY2u")


function Checkout(props) {
    return (
        <Elements stripe ={stripePromise}>
            <CheckoutController />
        </Elements>
    )
}
export default Checkout


const CheckoutController = props => {
    const state = useContext(AppContext) 
    const total = state.getCartTotal()
    let history = useHistory()
    let itemsInCart = {}
    let i = 0
    const stripe = useStripe()
    const elements = useElements()

    Object.entries(state.cart).forEach(([key, value]) => {
        let currentProduct = Object.values(state.products).find(x => x.id.toString() === key)
        if (currentProduct){
            itemsInCart[i] = {
                "pid": key,
                "price": currentProduct.price,
                "qty": value
            }
        } 
        i++
    })
    
    return (
        <Formik
            initialValues={{
                name: 'Dakota Orrock',
                address1: '514 E. Center St',
                address2: '',
                city: 'Provo',
                state: 'UT',
                zipcode: '84606',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}

                if (!values.name) {
                    errors.name = 'Name Is Required';
                }
                if (!values.address1) {
                    errors.address1 = 'Address Is Required';
                }
                if (!values.city) {
                    errors.city = 'City Is Required';
                }
                if (!values.state) {
                    errors.state = 'State Is Required';
                }
                if (!values.zipcode) {
                    errors.zipcode = 'Zip Code Is Required'; 
                }
                
                // console.log('validating', values)
                return errors
            }}
            onSubmit={async (values, actions) => {
                
                // UNCOMMENT THE CODE BELOW FOR THE API POST CALL
                const resp = await axios.post('https://dakotasarcticapi.herokuapp.com/sale/',{
                    'name': values.name,
                    'address1': values.address1,
                    'address2': values.address2,
                    'city': values.city,
                    'state': values.state,
                    'zipcode': values.zipcode,
                    'total': total,
                    'items': itemsInCart,
                    'payment_intent': {},
                })
                // console.log('resp.data: ',resp.data)
                
                const stripeResp = await stripe.confirmCardPayment(resp.data.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                        name: values.name,
                        },
                    }
                });

                // console.log('srtipeResp:',stripeResp)
                if (stripeResp.error) {
                    state.setCCError(stripeResp.error.message)
                    // console.log('stripeError',stripeResp.error.message)
                } 
                else {
                    // The payment has been processed!
                    if (stripeResp.paymentIntent.status === 'succeeded') {
                        state.setCCError('')
                        state.clearCart()
                        history.push('/receipt')
                        // There's a risk of the customer closing the window before callback
                        // execution. Set up a webhook or plugin to listen for the
                        // payment_intent.succeeded event that handles any business critical
                        // post-payment actions.
                    }
                }
                
                await new Promise(resolve => {
                    setTimeout(() => {  // wait 2 seconds, then set the form as "not submitting"
                        resolve()
                        actions.setSubmitting(false)
                    }, 2000)
                })
            }}
        >{form => (
            <PaymentForm form={form} total={total} state={state} />
        )}</Formik>
    )
}


/**
 * The form layout/html.
 * This component needs finishing.
 */
const PaymentForm = props => (
    <Form id="form">
        <bs.Container>
            <bs.Row>
                <bs.Col className="px-3 py-4" style={{color:"white",backgroundColor: "royalBlue"}}>
                    <h2>Checkout:</h2>
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col md="6" className="px-3 py-4 border-right" style={{backgroundColor: "white"}}>
                    <h3>Shipping</h3>
                        <Input title="Name:" name="name" type="text" disabled={props.form.isSubmitting} />
                        <Input title="Address 1:" name="address1" type="text" disabled={props.form.isSubmitting}/>
                        <Input title="Address 2:" name="address2" type="text" disabled={props.form.isSubmitting}/>
                        <Input title="City:" name="city" type="text" disabled={props.form.isSubmitting}/>
                        <Input title="State:" name="state" type="text" disabled={props.form.isSubmitting}/>
                        <Input title="Zip Code:" name="zipcode" type="text" disabled={props.form.isSubmitting}/>
                </bs.Col>
                <bs.Col md="6" className="px-3 py-4 border-left" style={{backgroundColor: "white"}}>
                    <h3>Payment</h3>
                    <CardElement/>
                    <br></br>
                    <span style={{color:'red'}}>{props.state.CCError} </span>
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col className="px-3 py-4" style={{color:"white",backgroundColor: "royalBlue"}}>
                    <h5>Your card will be charged {props.total}</h5>
                    {/* {console.log('isSubmitting: ', props.form.isSubmitting)} */}
                    <bs.Button id="submitButton"  disabled={props.form.isSubmitting} type="submit" variant="warning">
                        <span hidden={!props.form.isSubmitting}>
                            <img src={require('./loading.gif')} alt="loading..." height="22px" />
                        </span>
                        <span hidden={props.form.isSubmitting}>
                            Purchase
                        </span>
                    </bs.Button>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    </Form>
)


/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
        
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled={props.disabled}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>         
)       