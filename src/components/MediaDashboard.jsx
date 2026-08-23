import React, { useState } from 'react';

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
  youtubeTitle = "Video Overview: System Walkthrough & Infrastructure"
}) {
  const [showVideo, setShowVideo] = useState(false);

  // Parse Spotify ID from URI if provided, otherwise assume it's a URL/ID
  const spotifyId = spotifyUri.includes('spotify:episode:') 
    ? spotifyUri.split('spotify:episode:')[1] 
    : spotifyUri;

  const spotifyEmbedUrl = `https://open.spotify.com/embed/episode/${spotifyId}?utm_source=generator&theme=0`;
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1`;
  const youtubeThumbnailUrl = `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <div className="w-full my-10 p-4 sm:p-6 rounded-2xl bg-[#1e2129] border border-[rgba(230,235,245,0.12)] shadow-xl font-sans text-[#dce0e8]">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(230,235,245,0.10)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a47bea] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a47bea]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#a47bea] font-semibold">
              R&D Multimedia Synthesis
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            🎙️ Audio Critique & Video Walkthrough
          </h3>
          <p className="text-xs text-[#9ba0ad] mt-0.5">
            NotebookLM Audio Debate and System Infrastructure Demonstration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* =========================================================================
            AUDIO DEEP DIVE (SPOTIFY)
           ========================================================================= */}
        <div className="rounded-xl p-4 bg-[#242831] border border-[rgba(230,235,245,0.12)] shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(230,235,245,0.10)]">
            <div className="flex items-center gap-2">
              <span className="text-base">🎧</span>
              <span className="font-bold text-sm text-white tracking-wide">
                {spotifyTitle}
              </span>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#1e2129] text-[#1db954] border border-[rgba(230,235,245,0.12)] font-semibold">
              Spotify Podcast
            </span>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            {/* Spotify embed: uses lazy loading and standard height for compact player */}
            <iframe 
              style={{ borderRadius: '12px' }} 
              src={spotifyEmbedUrl} 
              width="100%" 
              height="152" 
              frameBorder="0" 
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
        <div className="rounded-xl p-4 bg-[#242831] border border-[rgba(230,235,245,0.12)] shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(230,235,245,0.10)]">
            <div className="flex items-center gap-2">
              <span className="text-base">🎬</span>
              <span className="font-bold text-sm text-white tracking-wide">
                {youtubeTitle}
              </span>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#1e2129] text-[#ff0000] border border-[rgba(230,235,245,0.12)] font-semibold">
              YouTube Video
            </span>
          </div>
          
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#1e2129] border border-[rgba(230,235,245,0.10)] relative shadow-inner">
            {showVideo ? (
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src={youtubeEmbedUrl}
                title="YouTube Video Embed"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <div 
                className="w-full h-full relative cursor-pointer group flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${youtubeThumbnailUrl})` }}
                onClick={() => setShowVideo(true)}
                role="button"
                aria-label="Play Video"
              >
                {/* Fallback pattern if thumbnail fails/isn't real */}
                {!youtubeVideoId || youtubeVideoId === "YOUR_YOUTUBE_ID" ? (
                  <div className="absolute inset-0 bg-[#1a1e29] flex flex-col items-center justify-center p-6 text-center text-[#9ba0ad]">
                    <svg className="w-12 h-12 mb-3 text-[#a47bea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-[#dce0e8]">No Video Configured</span>
                    <span className="text-xs mt-1">Pass `youtubeVideoId` prop to load the facade.</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="relative z-10 w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
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
