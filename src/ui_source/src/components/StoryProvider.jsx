import { useState } from 'react';
import { StoryContext } from '../contexts/Contexts';

const StoryProvider = ({ children }) => {
  const [currentStory, setCurrentStory] = useState(null);

  const setStory = (storyData) => {
    setCurrentStory(storyData);
  };

  const clearStory = () => {
    setCurrentStory(null);
  };

  return (
    <StoryContext.Provider value={{ currentStory, setStory, clearStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryProvider;