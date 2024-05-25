"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FaLongArrowAltRight } from "react-icons/fa";
import Navbar from "@/components/common/Navbar";

export default function Page() {
  const [reports, setReports] = useState([]);
  const [currentSelectedReport, setCurrentSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5003/community/fetchReports"
      );
      const data = response.data;
      setReports(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = (reportId) => {
    const temp = reports.find((t) => t?._id === reportId);
    setCurrentSelectedReport(temp);
  };

  const removePost = async () => {
    try {
      await axios.delete(`http://localhost:5003/community/removePostAndReport/${currentSelectedReport.reportedItem._id}/${currentSelectedReport._id}`);
      setCurrentSelectedReport(null); // Clear selected report after removal
      fetchReports(); // Refresh the reports list
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  const removeUser = async () => {
    try {
      await axios.delete(`http://localhost:5003/community/removeUserAndReport/${currentSelectedReport.reporter._id}/${currentSelectedReport._id}`);
      setCurrentSelectedReport(null); // Clear selected report after removal
      fetchReports(); // Refresh the reports list
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="w-[80%] mx-auto mt-14">
        {reports.length > 0 ? (
          <table className="mt-10 w-full mx-auto table-auto border bg-white shadow-md rounded">
            <thead className="text-center font-bold text-lg bg-deepAqua text-white">
              <tr>
                <th className="border p-4">Date</th>
                <th className="border p-4">Reporter</th>
                <th className="border p-4">Post Content</th>
                <th className="border p-4">View Details</th>
              </tr>
            </thead>
            <tbody className="text-center font-medium text-md">
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="border p-4">
                    {moment(report.createdAt).format("DD-MMM-YYYY hh:mmA")}
                  </td>
                  <td className="border p-4">{report.reporter.username}</td>
                  <td className="border p-4">{report.reportedItem.text}</td>
                  <td className="border p-4 flex justify-center items-center">
                    <FaLongArrowAltRight
                      size={25}
                      className="cursor-pointer text-deepAqua"
                      onClick={() => handleClick(report._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-xl mt-20">No report found!</div>
        )}

        {currentSelectedReport && (
          <div className="mt-10 p-6 bg-white shadow-lg rounded-lg border">
            <h2 className="text-3xl font-bold mb-6 text-center text-deepAqua">Report Details</h2>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold">Reporter:</span> {currentSelectedReport.reporter.username} ({currentSelectedReport.reporter.email})
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold">Reported Item:</span> {currentSelectedReport.reportedItem.text}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold">Report Description:</span> {currentSelectedReport.description}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold">Report Date:</span> {moment(currentSelectedReport.createdAt).format("DD-MMM-YYYY hh:mmA")}
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={removeUser} className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-700 hover:text-white transition">Remove User</button>
              <button onClick={removePost} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Remove Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
