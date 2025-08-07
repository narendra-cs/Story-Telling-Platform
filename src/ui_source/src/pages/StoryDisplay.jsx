import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useStory } from '../hooks/useStory';
import { printStory } from '../utils/printUtils';
import './StoryDisplay.css';

const StoryDisplay = () => {
  const { currentStory, clearStory } = useStory();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Don't clear story here to prevent race conditions with navigation
    };
  }, [currentStory]);

  const handleGenerateNew = () => {
    clearStory();
    navigate('/generate');
  };

  const handlePrint = () => {
    const storyContent = document.querySelector('.story-paper').innerHTML;
    printStory(storyContent, currentStory?.title || 'Your Story');
  };

  const formatStoryContent = (story) => {
    return (
      <div className="story-content">
        <Typography className="story-title" variant="h5">
          {story.Title}
        </Typography>

        <div className="story-body">
          {story.Paragraphs?.map((p, i) => (
            <Typography key={i} className="story-paragraph">
              {p}
            </Typography>
          ))}
        </div>

        <div className="story-metadata">
          <div className="metadata-item">
            <span className="metadata-label">Genre:</span>
            <span>{story.Genre}</span>
          </div>

          <div className="metadata-item">
            <span className="metadata-label">Tags:</span>
            {story.Tags?.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!currentStory) {
    return (
      <Box className="no-story-container">
        <Typography gutterBottom variant="h5">
          No story found
        </Typography>
        <Button className="home-button" variant="contained" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box className="story-container">
      <Typography gutterBottom className="story-title" variant="h4">
        {currentStory.title || 'Your Generated Story'}
      </Typography>

      <Paper className="story-paper" elevation={3}>
        {formatStoryContent(currentStory)}
      </Paper>

      <Box className="action-buttons no-print">
        <Button className="generate-button" variant="outlined" onClick={handleGenerateNew}>
          Generate Another Story
        </Button>
        <Button
          className="print-button"
          startIcon={<PrintIcon />}
          variant="contained"
          onClick={handlePrint}
        >
          Print Story
        </Button>
      </Box>
    </Box>
  );
};

export default StoryDisplay;
