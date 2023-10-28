import React from "react";

const SpotifyIframe = () => {
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      title="Spotify"
      src="https://open.spotify.com/embed/playlist/5osvOj7D5854coBnCBKDag?utm_source=generator&theme=0"
      width={"100%"}
      height={152}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export default SpotifyIframe;
