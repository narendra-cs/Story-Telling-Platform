import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, CssBaseline, Toolbar, AppBar, Typography, Button } from '@mui/material';

import HomePage from './pages/HomePage';
import StoryGenerator from './pages/StoryGenerator';
import StoryDisplay from './pages/StoryDisplay';
import StoryProvider from './components/StoryProvider';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoryProvider>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
              <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                    Story Telling Platform
                  </Link>
                </Typography>
                <Button color="inherit" component={Link} to="/generate">
                  Generate Story
                </Button>
              </Toolbar>
            </AppBar>

            <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<StoryGenerator />} path="/generate" />
                <Route element={<StoryDisplay />} path="/story" />
              </Routes>
            </Container>

            <Box
              component="footer"
              sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}
            >
              <Container maxWidth="sm">
                <Typography align="center" color="text.secondary" variant="body2">
                  {new Date().getFullYear()} Story Telling Platform
                </Typography>
              </Container>
            </Box>
          </Box>
        </Router>
      </StoryProvider>
    </ThemeProvider>
  );
}

export default App;
