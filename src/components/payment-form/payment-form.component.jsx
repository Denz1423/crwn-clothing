import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { resetCart } from "../../store/cart/cart.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.style";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const clearCart = () => dispatch(resetCart());

  const paymentHandler = async (e) => {
    e.preventDefault();

    if(!stripe || !elements){
        return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({amount: amount * 100})
    }).then((res) => {
        return res.json();
    });

    const {paymentIntent: {client_secret}} = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: currentUser ? currentUser.displayName : 'Guest',
            }
        }
    });

    setIsProcessingPayment(false);

    if(paymentResult.error){
        alert(paymentResult.error);
    } else {
        if(paymentResult.paymentIntent.status === 'succeeded'){
            alert('Payment successful');
            clearCart();
            elements.getElement(CardElement).clear();
        }
    }

  };

  return (
    <PaymentFormContainer onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Card Payment:</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
}
