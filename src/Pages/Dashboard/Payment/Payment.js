import React from "react";
import { useLoaderData } from "react-router-dom";

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
