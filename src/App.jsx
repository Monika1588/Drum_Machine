import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { FaDrum } from "react-icons/fa";
import { FaVolumeUp, FaHeadphones, FaMusic } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";

const BANK = [
  { key: "Q", name: "Heater 1", url: "/sounds/Heater-1.mp3" },
  { key: "W", name: "Heater 2", url: "/sounds/Heater-2.mp3" },
  { key: "E", name: "Heater 3", url: "/sounds/Heater-3.mp3" },
  { key: "A", name: "Heater 4", url: "/sounds/Heater-4_1.mp3" },
  { key: "S", name: "Clap", url: "/sounds/Heater-6.mp3" },
  { key: "D", name: "Open HH", url: "/sounds/Dsc_Oh.mp3" },
  { key: "Z", name: "Kick n Hat", url: "/sounds/Kick_n_Hat.mp3" },
  { key: "X", name: "Kick", url: "/sounds/RP4_KICK_1.mp3" },
  { key: "C", name: "Closed HH", url: "/sounds/Cev_H2.mp3" }
];

function DrumPad({ keyTrigger, clipName, clipUrl, playClip, active }) {
  const padRef = useRef(null);

  useEffect(() => {
    if (active) {
      padRef.current.classList.add("playing");
      const t = setTimeout(() => padRef.current.classList.remove("playing"), 145);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div
      id={clipName}
      className="drum-pad"
      onClick={() => playClip(keyTrigger, clipName)}
      ref={padRef}
    >
      <div className="pad-key">{keyTrigger}</div>
      <div className="pad-name">{clipName}</div>
      <audio className="clip" id={keyTrigger} src={clipUrl}></audio>
    </div>
  );
}

function App() {
  const [display, setDisplay] = useState("Press Q W E A S D Z X C");
  const [volume, setVolume] = useState(0.9);
  const [activeKey, setActiveKey] = useState(null);

  const playClip = (keyChar, clipName) => {
    const audio = document.getElementById(keyChar);
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {});

    setDisplay(clipName);
    setActiveKey(keyChar);
    setTimeout(() => setActiveKey(null), 150);
  };

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toUpperCase();
      const bankItem = BANK.find((b) => b.key === key);
      if (bankItem) playClip(bankItem.key, bankItem.name);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [volume]);

  return (
    <>
<div className="decor-icons">
  <FaDrum className="decor-icon d1" />
  <GiSoundWaves className="decor-icon d2" />
  <GiSoundWaves className="decor-icon d3" />
  <FaDrum className="decor-icon d4" />
  <FaDrum className="decor-icon d5" />
</div>

      <div id="drum-machine">
        <div className="pads">
          {BANK.map((b) => (
            <DrumPad
              key={b.key}
              keyTrigger={b.key}
              clipName={b.name}
              clipUrl={b.url}
              playClip={playClip}
              active={activeKey === b.key}
            />
          ))}
        </div>

        <div className="side">
          <div id="display">{display}</div>

          <div className="controls">
            <div className="control-group">
              <label htmlFor="volume" className="volume-label">
                <FaVolumeUp className="volume-icon" />
                <span className="volume-value">
                  {Math.round(volume * 100)}%
                </span>
              </label>

              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>How to Play</label>
              <p style={{ fontSize: 13 }}>
                Press keys Q W E A S D Z X C
              </p>
            </div>
          </div>
          <div className="footer">
  <div className="audio-wave">
    <span></span><span></span><span></span><span></span><span></span>
    <FaDrum className="footer-icon" />
    <span></span><span></span><span></span><span></span><span></span>
  </div>
</div>

        </div>
      </div>
    </>
  );
}

export default App;
