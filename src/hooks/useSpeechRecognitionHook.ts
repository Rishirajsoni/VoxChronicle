import { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
}

const UseSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [commandListeners, setCommandListeners] = useState<{ [key: string]: () => void }>({});
    const [listeningTimeout, setListeningTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const recognizedText = event.results[0][0].transcript;
            console.log('Recognized text:', recognizedText);
            setText(recognizedText);
            executeCommand(recognizedText);
            stopListening();
        };
    }, []);

    const startListening = () => {
        if (!isListening) {
            setText("");
            setIsListening(true);
            recognition.start();

            // Set a timeout to stop listening after 5 seconds
            const timeout = setTimeout(() => {
                stopListening();
            }, 5000);
            setListeningTimeout(timeout);
        }
    };

    const stopListening = () => {
        if (isListening) {
            setIsListening(false);
            recognition.stop();

            // Clear the timeout if it exists
            if (listeningTimeout) {
                clearTimeout(listeningTimeout);
                setListeningTimeout(null);
            }
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const executeCommand = (recognizedText: string) => {
        const command = recognizedText.toLowerCase();
        if (commandListeners[command]) {
            commandListeners[command]();
        }
    };

    const recognizeCommand = (recognizedText: string) => {
        executeCommand(recognizedText);
    };

    const addCommandListener = (command: string, callback: () => void) => {
        setCommandListeners((prevListeners) => ({
            ...prevListeners,
            [command.toLowerCase()]: callback,
        }));
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        toggleListening,
        recognizeCommand,
        addCommandListener,
        hasRecognitionSupport: !!recognition,
    };
};

export default UseSpeechRecognition;