import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51M6sUXGGuleKu5Js1MoQrS6AXlPuL2XREt4GEycGi2pYEgznQwwEhEJlMbfgvnhKP7ue8TiECsUj3UAFxrTkXNge00mlODxGxO"
);
// console.log(stripePromise);

const Payment = () => {
  const booking = useLoaderData();
  // console.log(booking);
  return (
    <div>
      <h2 className="text-3xl">Payment</h2>
      <div>
        <h2>You have appointment on {booking.treatment}</h2>
        <h3>
          Your price is <strong>${booking.price}</strong>
        </h3>
        <p>Date - {booking.appointmentDate}</p>
        <p>Slot- {booking.slot}</p>
      </div>
      <div className="w-96 my-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
