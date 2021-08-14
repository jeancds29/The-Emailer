import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class StripeCheckoutButton extends Component {
  render() {
    const onToken = (token) => {
     this.props.handleToken(token)
      alert("Payment Succesful");
    };
    return (
      <StripeCheckout
        name="The Emailer"
        billingAddress
        description="$5 for 5 Survey Campaign Credits"
        amount={500} //stripe uses the amount in cents so multply by 100
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null,actions)(StripeCheckoutButton);
