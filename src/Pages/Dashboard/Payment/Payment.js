import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51M6sUXGGuleKu5Js1MoQrS6AXlPuL2XREt4GEycGi2pYEgznQwwEhEJlMbfgvnhKP7ue8TiECsUj3UAFxrTkXNge00mlODxGxO"
);
console.log(stripePromise);

const Payment = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h2 className="text-3xl">Payment</h2>
      <div>
        <h2>You have appointment on {data.treatment}</h2>
        <h3>
          Your price is <strong>${data.price}</strong>
        </h3>
        <p>Date - {data.appointmentDate}</p>
        <p>Slot- {data.slot}</p>
      </div>
    </div>
  );
};

export default Payment;
