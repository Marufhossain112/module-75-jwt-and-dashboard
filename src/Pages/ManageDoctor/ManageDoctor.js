import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const ManageDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };
  const handleDeleteDoctor = (doctor) => {
    console.log(doctor);
  };

  const { data: manageDoctorData = [] } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/doctor", {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  // console.log(manageDoctorData);
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
                <td>
                  {" "}
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          successAction={() => handleDeleteDoctor(deletingDoctor)}
          // modalData={deletingDoctor}
          successButton="Delete"
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctor;
