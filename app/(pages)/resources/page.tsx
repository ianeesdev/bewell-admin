"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/common/Navbar";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [source, setSource] = useState("");

  // Function to fetch all videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5004/video/getAll");
      console.log(response.data.data)
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Function to add a new video
  const addVideo = async () => {
    try {
      await axios.post("http://localhost:5004/video/add", { source });
      setSource(""); // Clear input field after adding
      fetchVideos(); // Fetch updated list of videos
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  // Function to delete a video
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/video/delete/${id}`);
      fetchVideos(); // Fetch updated list of videos
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // Fetch videos on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchVideos();
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Video Resources</h1>
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Enter video source"
            className="border border-gray-300 px-4 py-2 mr-2 rounded-md flex-grow"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <button
            className="bg-deepAqua text-white px-6 py-2 rounded-md hover:bg-seaBlue"
            onClick={addVideo}
          >
            Add Video
          </button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-deepAqua text-white">
              <th className="w-[20%]  px-4 py-2">ID</th>
              <th className="w-[60%] px-4 py-2">Source</th>
              <th className="w-[20%]  px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.length > 0 && videos?.map((video) => (
              <tr key={video._id} className="bg-white">
                <td className="border px-4 py-2">{video._id}</td>
                <td className="border px-4 py-2">{video.source}</td>
                <td className="border px-4 py-2 flex justify-center items-center">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteVideo(video._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
