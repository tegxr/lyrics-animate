import React, { useState, useEffect } from 'react';
import './LyricsDisplay.css';

const lyrics = [
  { text: 'suki yo!', duration: 1000 },
  { text: 'ima anata ni omoi nosete', duration: 4000 },
  { text: 'hora!', duration: 650 },
  { text: 'sunao ni naru no watashi', duration: 4000 },
  { text: 'kono saki motto', duration: 2400 },
  { text: 'soba ni ite mo ii ka na?', duration: 3000 },
  { text: 'koi to koi ga kasanatte', duration: 4000 },
  { text: 'suki yo!', duration: 4000 },
  // Add more lines with their corresponding durations
];

const getRandomAnimationClass = () => {
  const animations = [
    'fly-in-top-left',
    'fly-in-top-right',
    'fly-in-bottom-left',
    'fly-in-bottom-right'
  ];
  return animations[Math.floor(Math.random() * animations.length)];
};

const LyricsDisplay = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (currentLine < lyrics.length) {
      const { duration } = lyrics[currentLine];

      if (currentLine !== 0) {
        // Apply a random animation class for lines after the first one
        setAnimationClass(getRandomAnimationClass());
      } else {
        // No animation for the first line
        setAnimationClass('');
      }

      // Show the current line
      setVisible(true);

      // Hide the current line and move to the next one after the duration
      const hideTimeout = setTimeout(() => {
        setVisible(false);
        setCurrentLine(prevLine => prevLine + 1);
      }, duration);

      return () => {
        clearTimeout(hideTimeout);
      };
    }
  }, [currentLine]);

  return (
    <div className="lyrics-container">
      {visible && (
        <p className={`lyrics-text ${currentLine === 0 ? 'show' : animationClass}`}>{lyrics[currentLine]?.text}</p>
      )}
    </div>
  );
};

export default LyricsDisplay;