import React, { useState } from "react";
import { SpotifyIcon } from "../components";
import { Link } from "react-router-dom";

const ImportPlaylist = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImportClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("spotifyAccessToken"); // Ensure you have a valid access token

      if (!token) {
        setError("Missing Spotify access token. Please log in to Spotify.");
        return;
      }

      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status); // Log the response status
      const data = await response.json();
      console.log("Response data:", data); // Log the response data for debugging

      if (!response.ok) {
        if (response.status === 401) {
          setError("Access token expired. Please log in again.");
        } else if (response.status === 403) {
          setError("Insufficient permissions to access playlists. Please check your Spotify app's permissions.");
        } else {
          setError("Failed to fetch playlists from Spotify.");
        }
        return;
      }

      // Process playlists data here (e.g., render playlists)
      console.log(data); // Display playlists or handle as needed

    } catch (err) {
      setError("Sorry, we couldn't fetch the playlist at this time. Please try again later.");
      console.error("Error fetching Spotify playlist:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 px-6 overflow-auto">
      <Link
        to={"/spotifylogin"}
        className="flex items-center gap-5 py-4 hover:bg-lightBlue rounded-md px-4 text-neutral-300"
        onClick={handleImportClick}
      >
        <SpotifyIcon width={4} /> Import from Spotify
      </Link>

      {loading && <p>Loading playlists...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImportPlaylist;
