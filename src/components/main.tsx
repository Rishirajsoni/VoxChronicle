import React, { useState, useEffect, useCallback } from 'react';
import UseSpeechRecognition from "../hooks/useSpeechRecognitionHook";
import { commands } from './SpeechCommands';
import TextToSpeech from './textToSpeech';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

interface MainProps {
  handleCategorySelect: (category: string) => void;
  handleReadTopHeadlines: () => void;
  handleStopReading: () => void;
}

const Main: React.FC<MainProps> = ({ handleCategorySelect, handleReadTopHeadlines, handleStopReading }) => {
  const {
    text,
    isListening,
    toggleListening,
    hasRecognitionSupport,
    recognizeCommand
  } = UseSpeechRecognition();

  const [textToSpeak, setTextToSpeak] = useState<string>(''); // State to manage text to be spoken

  const handleCommand = useCallback((command: string) => {
    const commandObject = commands[command.toLowerCase()];
    if (commandObject) {
      commandObject.handler(handleCategorySelect, handleReadTopHeadlines, handleStopReading);
      if (commandObject.output) {
        setTextToSpeak(commandObject.output); // Set the text to be spoken
      }
    } else {
      console.error(`Unrecognized command: ${command}`);
    }
  }, [handleCategorySelect, handleReadTopHeadlines, handleStopReading]);

  useEffect(() => {
    if (text) {
      handleCommand(text); // Pass recognized text to function for command recognition
    }
  }, [text, handleCommand]);

  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        toggleListening();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isListening, toggleListening]);

  return (
    <div>
      {hasRecognitionSupport ? (
        <div className="speech-button">
          <button
            className={`btn ${isListening ? 'btn-danger' : 'btn-success'}`}
            onClick={toggleListening}
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      ) : (
        <h1>Your browser has no speech recognition support</h1>
      )}
      <TextToSpeech text={textToSpeak} /> {/* Pass the text to be spoken */}
    </div>
  );
};

export default Main;
