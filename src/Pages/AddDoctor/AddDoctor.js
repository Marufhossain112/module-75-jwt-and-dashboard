import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
const AddDoctor = () => {
  const imageHostKey = process.env.REACT_APP_imagbb_api;
  // console.log(imageHostKey);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddDoctor = (data) => {
    const image = data.image[0];
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const image = imgData.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: image,
          };
          fetch("http://localhost:5000/doctor", {
            method: "POST",
            headers: {
              authorization: `bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                toast.success(`${doctor.name} successfully submitted.`);
                navigate("/dashboard/manageDoctor");
              }
            });
        }
      });
  };
  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ["appointmentsSpecialty"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentsSpecialty");
      const data = await res.json();
      return data;
    },
  });
  // console.log(appointmentsData);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Specialty</span>
            </label>
            <select
              {...register("specialty", {
                required: true,
              })}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Pick a specialty
              </option>
              {appointmentsData.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Upload Image</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "img is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Add Doctor"
            type="submit"
          />
          {/* {signUpError && <p className="text-red-600">{signUpError}</p>} */}
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default AddDoctor;
