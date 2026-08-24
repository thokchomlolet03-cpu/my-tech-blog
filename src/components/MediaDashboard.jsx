import React, { useState } from "react";

// =============================================================================
// KNOWLEDGE SYNTHESIS ARCHITECTURE: MEDIA DASHBOARD
// Centralized, lazy-loaded media dashboard embedding the synthesized audio
// (Spotify) and system walkthrough video (YouTube). Matches the flushed, slate
// table-matching aesthetic of the Apex Node.
// =============================================================================

export default function MediaDashboard({
  spotifyUri = "spotify:episode:1234567890",
  youtubeVideoId = "YOUR_YOUTUBE_ID",
  spotifyTitle = "Audio Deep Dive: Architectural Debate & Critique",
  youtubeTitle = "Video Overview: System Walkthrough & Infrastructure",
}) {
  const [showVideo, setShowVideo] = useState(false);

  // Parse Spotify ID from URI if provided, otherwise assume it's a URL/ID
  const spotifyId = spotifyUri.includes("spotify:episode:")
    ? spotifyUri.split("spotify:episode:")[1]
    : spotifyUri;

  const spotifyEmbedUrl = `https://open.spotify.com/embed/episode/${spotifyId}?utm_source=generator&theme=0`;
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1`;
  const youtubeThumbnailUrl = `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <div className="my-10 w-full rounded-2xl border border-[rgba(230,235,245,0.12)] bg-[#1e2129] p-4 font-sans text-[#dce0e8] shadow-xl sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(230,235,245,0.10)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a47bea] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a47bea]"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#a47bea] uppercase">
              R&D Multimedia Synthesis
            </span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
            🎙️ Audio Critique & Video Walkthrough
          </h3>
          <p className="mt-0.5 text-xs text-[#9ba0ad]">
            NotebookLM Audio Debate and System Infrastructure Demonstration
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* =========================================================================
            AUDIO DEEP DIVE (SPOTIFY)
           ========================================================================= */}
        <div className="flex h-full flex-col rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#242831] p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-[rgba(230,235,245,0.10)] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎧</span>
              <span className="text-sm font-bold tracking-wide text-white">
                {spotifyTitle}
              </span>
            </div>
            <span className="rounded-full border border-[rgba(230,235,245,0.12)] bg-[#1e2129] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#1db954]">
              Spotify Podcast
            </span>
          </div>

          <div className="flex flex-grow items-center justify-center">
            {/* Spotify embed: uses lazy loading and standard height for compact player */}
            <iframe
              style={{ border: 0, borderRadius: "12px" }}
              src={spotifyEmbedUrl}
              width="100%"
              height="152"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Audio Embed"
            ></iframe>
          </div>
        </div>

        {/* =========================================================================
            VIDEO OVERVIEW (YOUTUBE FACADE)
           ========================================================================= */}
        <div className="flex h-full flex-col rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#242831] p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-[rgba(230,235,245,0.10)] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎬</span>
              <span className="text-sm font-bold tracking-wide text-white">
                {youtubeTitle}
              </span>
            </div>
            <span className="rounded-full border border-[rgba(230,235,245,0.12)] bg-[#1e2129] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#ff0000]">
              YouTube Video
            </span>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[rgba(230,235,245,0.10)] bg-[#1e2129] shadow-inner">
            {showVideo ? (
              <iframe
                className="absolute top-0 left-0 h-full w-full"
                src={youtubeEmbedUrl}
                title="YouTube Video Embed"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="group relative flex h-full w-full cursor-pointer items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${youtubeThumbnailUrl})` }}
                onClick={() => setShowVideo(true)}
                role="button"
                aria-label="Play Video"
              >
                {/* Fallback pattern if thumbnail fails/isn't real */}
                {!youtubeVideoId || youtubeVideoId === "YOUR_YOUTUBE_ID" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1e29] p-6 text-center text-[#9ba0ad]">
                    <svg
                      className="mb-3 h-12 w-12 text-[#a47bea]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-[#dce0e8]">
                      No Video Configured
                    </span>
                    <span className="mt-1 text-xs">
                      Pass `youtubeVideoId` prop to load the facade.
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20"></div>
                    <div className="relative z-10 flex h-12 w-16 items-center justify-center rounded-xl bg-red-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500">
                      <svg
                        className="ml-1 h-6 w-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
