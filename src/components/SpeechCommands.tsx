interface CommandHandlers {
    [key: string]: {
      handler: (handleCategorySelect: (category: string) => void, handleReadTopHeadlines?: () => void, handleStopReading?: () => void, setTextToSpeechEnabled?: (isEnabled: boolean) => void) => void;
      output: string;
    };
  }
  
  export const commands: CommandHandlers = {
    "say hello": {
      handler: () => {},
      output: "Hello!"
    },
    "what does this app do": {
        handler: () => {},
        output: "VoxChronicle is a News project which can work with voice commands"
      },
    "who developed this app": {
        handler: () => {},
        output: "This App is developed by Rishi Raj Soni, he is a mca student at B C I I T"
      },
    "show me sports news": {
      handler: (handleCategorySelect) => handleCategorySelect('Sports'),
      output: "Here are the latest sports news."
    },
    "show me technology news": {
      handler: (handleCategorySelect) => handleCategorySelect('Technology'),
      output: "Here are the latest technology news."
    },
    "show me science news": {
      handler: (handleCategorySelect) => handleCategorySelect('Science'),
      output: "Here are the latest science news."
    },
    "show me business news": {
      handler: (handleCategorySelect) => handleCategorySelect('Business'),
      output: "Here are the latest business news."
    },
    "show me entertainment news": {
      handler: (handleCategorySelect) => handleCategorySelect('Entertainment'),
      output: "Here are the latest entertainment news."
    },
    "show me health news": {
      handler: (handleCategorySelect) => handleCategorySelect('Health'),
      output: "Here are the latest health news."
    },
    "read top headlines": {
      handler: (handleCategorySelect, handleReadTopHeadlines) => handleReadTopHeadlines && handleReadTopHeadlines(),
      output: "Reading top headlines."
    },
    'stop reading': {
        handler: (handleCategorySelect, handleReadTopHeadlines, handleStopReading, setTextToSpeechEnabled) => {
          if (setTextToSpeechEnabled) {
            setTextToSpeechEnabled(false);
          }
          if (handleStopReading) {
            handleStopReading();
          }
        }, 
        output: 'Okay'
      }
  };
  