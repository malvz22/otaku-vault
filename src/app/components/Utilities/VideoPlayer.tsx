"use client";

import YouTube from "react-youtube";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const VideoPlayer = ({ youtubeId }: { youtubeId: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleVideoPlayer = () => {
    setIsOpen(!isOpen);
  };

  const option = {
    width: "300",
    height: "250",
  };

  const Player = () => {
    return (
      <div className="fixed bottom-2 right-2">
        <button className="float-right mb-1" onClick={handleVideoPlayer}>
          <IoCloseSharp size={32} />
        </button>
        <YouTube
          videoId={youtubeId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
          onError={() => alert("Video is broken, please try another")}
        />
      </div>
    );
  };

  const WatchTrailerButton = () => {
    return (
      <button
        className="fixed bottom-5 right-5 px-3 py-2 mt-4 font-semibold rounded-md border-white border-solid border-[1px] text-xl bg-[#191A1F] hover:bg-[#1E90FF] transition-all duration-700"
        onClick={handleVideoPlayer}
      >
        Watch Trailer
      </button>
    );
  };

  return isOpen ? <Player /> : <WatchTrailerButton />;
};

export default VideoPlayer;
