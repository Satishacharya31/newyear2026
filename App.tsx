import React, { useState, useRef, useEffect } from 'react';
import { PUBLIC_VAPID_KEY } from './constants';
import ParticleBackground from './components/ParticleBackground';
import Fireworks from './components/Fireworks';
import JhilimiliLights from './components/JhilimiliLights';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Wishes from './components/Wishes';
import Vision from './components/Vision';
import Footer from './components/Footer';
import { Sparkles, Play, Volume2, VolumeX } from 'lucide-react';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  // Default to local file, fallback to a royalty-free celebration track if missing
  const [audioSrc, setAudioSrc] = useState("/newyear.mp3");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Volume fade-in effect
  useEffect(() => {
    if (isCelebrating && audioRef.current) {
      // Start at 0 and fade to 0.6
      audioRef.current.volume = 0;
      const fadeInterval = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.6) {
          audioRef.current.volume = Math.min(audioRef.current.volume + 0.05, 0.6);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
      return () => clearInterval(fadeInterval);
    }
  }, [isCelebrating]);

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        // Reset if it ended or was paused
        if (audioRef.current.paused) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
          console.log("Audio playing successfully");
        }
      } catch (error) {
        console.warn("Audio playback failed:", error);
        // Retry once if it was an allowed interaction issue
        setTimeout(() => {
          if (audioRef.current) audioRef.current.play().catch(e => console.error("Retry failed", e));
        }, 1000);
      }
    }
  };

  const startExperience = () => {
    setHasStarted(true);
    setIsCelebrating(true);

    // Request Notification & Subscribe to Service Worker
    subscribeToNotifications();

    // Tiny timeout to ensure DOM updates don't block main thread before audio start attempt
    setTimeout(playAudio, 100);
  };

  const subscribeToNotifications = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("Requesting notification permission...");
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notifications are blocked or permission denied.");
          return;
        }

        const register = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker Registered");

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });

        console.log("Push Subscribed");
        // Send Subscription to Server
        fetch("http://localhost:3000/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json"
          }
        });
        // Show a quick alert or toast here in real app
      } catch (err) {
        console.error("Service Worker/Push Error", err);
      }
    } else {
      console.warn("Push notifications not supported");
    }
  };

  // Tiny timeout to ensure DOM updates don't block main thread before audio start attempt
  setTimeout(playAudio, 100);

  const toggleCelebration = () => {
    setIsCelebrating(prev => {
      const newState = !prev;
      if (newState) {
        playAudio();
      } else {
        audioRef.current?.pause();
      }
      return newState;
    });
  };

  const ensureCelebration = () => {
    if (!isCelebrating) {
      setIsCelebrating(true);
      playAudio();
    }
  }

  const handleAudioError = () => {
    console.error("Audio error detected");
    // If the local file fails, switch to a reliable external fallback
    if (audioSrc === "/newyear.mp3") {
      console.warn("Local 'newyear.mp3' issue. Switching to fallback.");
      setAudioSrc("https://cdn.pixabay.com/download/audio/2023/01/01/audio_823d57367b.mp3");
      // Try asking to play again after switch (give it a moment to load)
      setTimeout(() => {
        if (isCelebrating) playAudio();
      }, 1000);
    }
  };

  return (
    <div className="relative bg-[#020617] text-slate-200 min-h-screen selection:bg-amber-500/30 selection:text-amber-100 overflow-hidden">

      {/* Click-to-Start Overlay */}
      {!hasStarted && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-md cursor-pointer transition-all duration-700"
          onClick={startExperience}
        >
          <div className="text-center px-6 animate-pulse">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-6 opacity-80" />
            <h1 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tighter">
              SATISH <span className="font-bold text-amber-400">2026</span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tighter">
              Allow notifications to get the best experience
            </h2>
            <p className="text-slate-300 text-sm md:text-base tracking-[0.3em] uppercase mb-12">
              Tap anywhere to begin
            </p>
            <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors group">
              <Play className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Enter Celebration</span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Audio Player with Error Handling */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      {/* Layer 1: Animated Background (Zooms/Moves) */}
      <div className="fixed inset-0 z-0 animate-bg-walk pointer-events-none">
        {/* Deep Space Gradient + fake stars using a pattern */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `radial-gradient(white 2px, transparent 2px), radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '100px 100px, 40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        ></div>
        {/* Nebula clouds */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e1b4b] opacity-80"></div>
      </div>

      {/* Layer 2: Floating Lanterns (No Zoom, Separate motion) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Visuals - Fixed on top */}
      <JhilimiliLights />
      <Fireworks active={isCelebrating} />

      {/* Main Content - Blurred until started */}
      <div className={`relative z-10 transition-all duration-1000 transform ${!hasStarted ? 'blur-lg scale-105 opacity-30 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        <Navbar isCelebrating={isCelebrating} onToggleCelebration={toggleCelebration} />
        <main>
          <Hero />
          <Wishes />
          <Vision onCelebrate={ensureCelebration} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}