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
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {manageDoctorData.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>{doctor.name}</td>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={doctor.image} alt="any" />
                    </div>
                  </div>
                </td>
                <td>{doctor.email}</td>
                <td>{<button className="btn btn-sm">Delete</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctor;
