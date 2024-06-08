"use client";

import Navbar from "@/components/common/Navbar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [therapists, setTherapists] = useState([]);
  const [currentSelectedTherapist, setCurrentSelectedTherapist] =
    useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTherapists();
    } else {
      router.push("/auth/login");
    }
  }, []);

  const fetchTherapists = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5005/therapist/non-verified"
      );

      const data = response.data;
      setTherapists(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClick = (therapistId: any) => {
    const temp = therapists.find((t) => t?._id === therapistId);
    setCurrentSelectedTherapist(temp);
  };

  const handleAccept = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:5005/therapist/accept/${currentSelectedTherapist._id}`
      );
      fetchTherapists();
      setCurrentSelectedTherapist(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:5005/therapist/reject/${currentSelectedTherapist._id}`
      );
      fetchTherapists();
      setCurrentSelectedTherapist(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const renderTherapistDetails = () => {
    const therapist = currentSelectedTherapist;
    if (!therapist) return null;

    return (
      <div className="w-[80%] mx-auto mt-14 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Therapist Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-semibold text-gray-600">Username:</p>
            <p className="text-gray-800">{therapist.username}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Email:</p>
            <p className="text-gray-800">{therapist.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">CNIC:</p>
            <p className="text-gray-800">{therapist.cnic}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Verified:</p>
            <p className="text-gray-800">{therapist.verified ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Created At:</p>
            <p className="text-gray-800">
              {moment(therapist.createdAt).format("DD-MMM-YYYY hh:mmA")}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <p className="font-semibold text-gray-600">Education Certificates:</p>
          <ul className="list-disc list-inside text-blue-500">
            {therapist.educationCertificates?.map(
              (cert: string, index: number) => (
                <li key={index} className="hover:underline">
                  <a
                    href={`http://127.0.0.1:5005/static/${cert}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {cert}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="mb-6">
          <p className="font-semibold text-gray-600">Professional License:</p>
          <p className="text-blue-500 hover:underline">
            <a
              href={`http://127.0.0.1:5005/static/${therapist.professionalLicense}`}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {therapist.professionalLicense}
            </a>
          </p>
        </div>
        <div className="mb-6">
          <p className="font-semibold text-gray-600">
            Professional Memberships:
          </p>
          <ul className="list-disc list-inside text-blue-500">
            {therapist.professionalMemberships?.map(
              (membership: string, index: number) => (
                <li key={index} className="hover:underline">
                  <a
                    href={`http://127.0.0.1:5005/static/${membership}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {membership}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="mb-6">
          <p className="font-semibold text-gray-600">
            Experience Certificates:
          </p>
          <ul className="list-disc list-inside text-blue-500">
            {therapist.experienceCertificates?.map(
              (cert: string, index: number) => (
                <li key={index} className="hover:underline">
                  <a
                    href={`http://127.0.0.1:5005/static/${cert}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {cert}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="mb-6">
          <p className="font-semibold text-gray-600">Criminal Record Check:</p>
          <p className="text-blue-500 hover:underline">
            <a
              href={`http://127.0.0.1:5005/static/${therapist.criminalRecordCheck}`}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {therapist.criminalRecordCheck}
            </a>
          </p>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            onClick={() => setCurrentSelectedTherapist(null)}
          >
            Back to List
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      </div>
    );
  };

  const renderTherapistList = () => (
    <div className="w-[80%] mx-auto mt-14">
      {therapists.length > 0 ? (
        <table className="mt-10 w-full mx-auto table-auto border bg-white shadow-md rounded">
          <thead className="text-center font-bold text-lg bg-deepAqua text-white">
            <tr>
              <th className="border-2 p-4">Date</th>
              <th className="border-2 p-4">Name</th>
              <th className="border-2 p-4">Email</th>
              <th className="border-2 p-4">View Details</th>
            </tr>
          </thead>
          <tbody className="text-center font-medium text-[18px]">
            {therapists?.map((therapist: any, index: number) => (
              <tr key={index}>
                <td className="border-2 p-4">
                  {moment(therapist.createdAt).format("DD-MMM-YYYY hh:mmA")}
                </td>
                <td className="border-2 p-4">{therapist.username}</td>
                <td className="border-2 p-4">{therapist.email}</td>
                <td className="border-2 p-4 flex justify-center items-center">
                  <FaLongArrowAltRight
                    size={40}
                    className="cursor-pointer text-deepAqua"
                    onClick={() => handleClick(therapist?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-xl">No application found!</div>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      {currentSelectedTherapist
        ? renderTherapistDetails()
        : renderTherapistList()}
    </div>
  );
}
