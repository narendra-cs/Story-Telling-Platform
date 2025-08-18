import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  ButtonGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStory } from '../hooks/useStory';

const StoryGenerator = () => {
  const [genre, setGenre] = useState('');
  const [numberOfParagraphs, setNumberOfParagraphs] = useState(3);
  const [characterInputType, setCharacterInputType] = useState('number'); // 'number' or 'details'
  const [numberOfCharacters, setNumberOfCharacters] = useState(3);
  const [characters, setCharacters] = useState([
    {
      name: '',
      age: '',
      gender: 'Other',
      role: '',
      personality: '',
      motivation: '',
    },
  ]);
  const [plotPoints, setPlotPoints] = useState(['']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const { setStory } = useStory();
  const navigate = useNavigate();

  const genres = [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Horror',
    'Adventure',
    'Comedy',
    'Drama',
    'Thriller',
    'Biography',
    'History',
    'Self Help',
    'Non Fiction',
  ];

  const handleAddCharacter = () => {
    setCharacters([
      ...characters,
      {
        name: '',
        age: '',
        gender: 'Other',
        role: '',
        personality: '',
        motivation: '',
      },
    ]);
  };

  const handleCharacterChange = (index, field, value) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index] = { ...updatedCharacters[index], [field]: value };
    setCharacters(updatedCharacters);
  };

  const handleRemoveCharacter = (index) => {
    if (characters.length > 1) {
      const updatedCharacters = characters.filter((_, i) => i !== index);
      setCharacters(updatedCharacters);
    }
  };

  const handleAddPlotPoint = () => {
    setPlotPoints([...plotPoints, '']);
  };

  const handlePlotPointChange = (index, value) => {
    const updatedPlotPoints = [...plotPoints];
    updatedPlotPoints[index] = value;
    setPlotPoints(updatedPlotPoints);
  };

  const handleRemovePlotPoint = (index) => {
    if (plotPoints.length > 1) {
      const updatedPlotPoints = plotPoints.filter((_, i) => i !== index);
      setPlotPoints(updatedPlotPoints);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);

    try {
      // Filter out empty plot points
      const validPlotPoints = plotPoints.filter((point) => point.trim() !== '');

      // Prepare request data based on input type
      const requestData = {
        genre,
        number_of_paragraphs: numberOfParagraphs,
        plot_points: validPlotPoints,
      };

      if (characterInputType === 'number') {
        requestData.number_of_characters = numberOfCharacters;
      } else {
        requestData.characters_details = characters.map((char) => ({
          name: char.name.trim(),
          age: parseInt(char.age) || 0,
          gender: char.gender,
          personality: char.personality.trim(),
          motivation: char.motivation.trim(),
          role: char.role.trim(),
        }));
      }

      const response = await fetch('/api/v1/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to generate story');
      }

      let story = await response.text();

      try {
        story = JSON.parse(story);
      } catch (e) {
        story = { content: story };
      }

      setStory(story);
      navigate('/story');
    } catch (err) {
      setError(err.message || 'Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Typography gutterBottom component="h1" variant="h4">
        Generate a New Story
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              required
              label="Genre"
              labelId="genre-label"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="paragraphs-label">Number of Paragraphs</InputLabel>
            <Select
              required
              label="Number of Paragraphs"
              labelId="paragraphs-label"
              value={numberOfParagraphs}
              onChange={(e) => setNumberOfParagraphs(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ mr: 2 }} variant="h6">
                Character Input Type
              </Typography>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  variant={characterInputType === 'number' ? 'contained' : 'outlined'}
                  onClick={() => setCharacterInputType('number')}
                >
                  Number of Characters
                </Button>
                <Button
                  variant={characterInputType === 'details' ? 'contained' : 'outlined'}
                  onClick={() => setCharacterInputType('details')}
                >
                  Character Details
                </Button>
              </ButtonGroup>
            </Box>

            {characterInputType === 'number' ? (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="char-count-label">Number of Characters</InputLabel>
                <Select
                  required
                  label="Number of Characters"
                  labelId="char-count-label"
                  value={numberOfCharacters}
                  onChange={(e) => setNumberOfCharacters(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Box>
                <Typography gutterBottom variant="h6">
                  Characters
                </Typography>
                {characters.map((char, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Name"
                          value={char.name}
                          onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                        />
                      </Grid>
                      <Grid item sm={2} xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Age"
                          type="number"
                          value={char.age}
                          onChange={(e) => handleCharacterChange(index, 'age', e.target.value)}
                        />
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            required
                            label="Gender"
                            value={char.gender}
                            onChange={(e) => handleCharacterChange(index, 'gender', e.target.value)}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <TextField
                          fullWidth
                          required
                          label="Role"
                          value={char.role}
                          onChange={(e) => handleCharacterChange(index, 'role', e.target.value)}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          label="Personality"
                          placeholder="E.g., Brave, curious, and quick-witted"
                          rows={2}
                          value={char.personality}
                          onChange={(e) =>
                            handleCharacterChange(index, 'personality', e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          label="Motivation"
                          placeholder="E.g., To find the legendary treasure and prove himself"
                          rows={2}
                          value={char.motivation}
                          onChange={(e) =>
                            handleCharacterChange(index, 'motivation', e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                    {characters.length > 1 && (
                      <Button
                        color="error"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => handleRemoveCharacter(index)}
                      >
                        Remove Character
                      </Button>
                    )}
                  </Box>
                ))}
                <Button sx={{ mt: 1 }} variant="outlined" onClick={handleAddCharacter}>
                  Add Another Character
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom variant="h6">
              Plot Points (Optional)
            </Typography>
            {plotPoints.map((point, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  placeholder="E.g., The hero discovers a hidden map in their grandfather's attic"
                  rows={2}
                  value={point}
                  onChange={(e) => handlePlotPointChange(index, e.target.value)}
                />
                {plotPoints.length > 1 && (
                  <Button
                    color="error"
                    sx={{ minWidth: '120px' }}
                    variant="outlined"
                    onClick={() => handleRemovePlotPoint(index)}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}
            <Button sx={{ mt: 1 }} variant="outlined" onClick={handleAddPlotPoint}>
              Add Plot Point
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button disabled={isGenerating} variant="outlined" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={isGenerating || !genre}
              startIcon={isGenerating ? <CircularProgress size={20} /> : null}
              type="submit"
              variant="contained"
            >
              {isGenerating ? 'Generating...' : 'Generate Story'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default StoryGenerator;
