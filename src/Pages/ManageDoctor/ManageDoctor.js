import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageDoctor = () => {
  const { data: manageDoctorData = [] } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/doctor");
      const data = await res.json();
      return data;
    },
  });
  console.log(manageDoctorData);
  return (
    <div>
      <h2 className="text-3xl">Manage Doctor</h2>
    </div>
  );
};

export default ManageDoctor;
