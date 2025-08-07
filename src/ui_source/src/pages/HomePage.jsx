import { useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
        
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography gutterBottom component="h1" variant="h2">
          Welcome to Story Telling Platform
        </Typography>
        <Typography paragraph color="text.secondary" variant="h5">
          Create amazing stories with the power of AI. Generate unique and engaging content with
          just a few clicks.
        </Typography>
        <Button
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          variant="contained"
          onClick={() => navigate('/generate')}
        >
          Generate a Story
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
