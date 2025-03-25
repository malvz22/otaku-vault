"use client";

import YouTube from "react-youtube";

const VideoPlayerPage = ({ youtubeId }: { youtubeId: string }) => {
  const option = {
    width: "100%",
    height: "100%",
  };

  const Player = () => {
    return (
      <div className="w-full max-w-full aspect-video relative py-3">
        <YouTube
          videoId={youtubeId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
          className="w-full h-full"
          onError={() => alert("Video is broken, please try another")}
        />
      </div>
    );
  };

  return <Player />;
};

export default VideoPlayerPage;
