import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_51IdyUJSEfZFoe5qpHg431mPXcQcN6T4zFINs0AAiWvmFsLPuPUzlcTws9KxRVJbR2NBvBStiTeCwwBY5HioQf4Q100IpdlHcVz")
const SERVER = "https://cet-project.herokuapp.com"
//const SERVER = "http://localhost:4200"

export default class Payment extends React.Component {
  handleClick = async (event) => {
    try {
      const validate = this.props.validate
      if (validate && !validate()) return

      const stripe = await stripePromise;
      let { total, shopName } = this.props
      total = parseFloat(total).toFixed(2)
      total = total * 100

      const data = {
        total,
        name: shopName,
      }
  
      const response = await fetch(`${SERVER}/create-checkout-session`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const session = await response.json();
  
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    } catch(e) {
      
    }
  }
    render() {
      // debugger
        return (
          <button
              onClick={this.handleClick}
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              style={{ margin: 10 }}
            >
              Pay
            </button>
        )
    }
}