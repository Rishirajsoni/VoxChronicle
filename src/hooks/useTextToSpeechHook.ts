import { useEffect } from 'react';

const useTextToSpeech = (text: string) => {
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);
};

export default useTextToSpeech;