import { useState } from 'react'
import './App.css'
import { Container, Typography, TextField, Box, FormControl, InputLabel, MenuItem, Select, CircularProgress,Button} from '@mui/material';
import axios from 'axios';

function App() {
  // setting up the state variables
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedRply, setGeneratedReply] = useState('');
  const [error, setError] = useState('');


// This function is going to handle the API request
  const handleSubmit = async () => {
    setLoading(true);
    setError(''); // so we are clearing out any previous errors
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {emailContent, tone});
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data)); // we are checking if the response is a string
    
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);    // so weather the request was fullfileld or not we are going to set the loading state to false
    }
  }
  return (
    <Container maxWidth="sm" sx={{py: 4}}>

    <Typography variant = "h4" component="h1" gutterBottom>
      Email Reply Generator
    </Typography>
    <Box sx = {{mx: 3}}>
      <TextField
      fullWidth
      multiline
      rows={6}
      variant="outlined"
      label="Original Email Content"
      value={emailContent}
      onChange={(e) => setEmailContent(e.target.value)}
      sx={{ mb: 2 }}/>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel> Tone (Optional) </InputLabel>
        <Select 
          value={tone || ''}
          label="Tone (Optional)"
          onChange={(e) => setTone(e.target.value)}>
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="formal">Formal</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
        </Select>
      </FormControl>

      <Button
      variant="contained"
      onClick={handleSubmit}
      disabled={!emailContent || loading}
      fullWidth >
        {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
      </Button>
    </Box>

    {error && (
      <Typography  color="error" sx={{ mb: 2 }}>
        {error}
      </Typography>
    )}

    {generatedRply && (
      <Box sx = {{mt: 3}}> 
        <Typography variant="h6" gutterBottom>
          Generated Reply
        </Typography>
        <TextField  
          fullWidth
          multiline
          rows = {6}
          variant="outlined"
          value = {generatedRply || ''}
          inputProps={{ readOnly: true }}
        />

      <Button
        variant = "outlined"
        sx = {{mt: 2}}
        onClick = {() => navigator.clipboard.writeText(generatedRply)}>
        Copy to Clipboard
      </Button>
      </Box>
    )}

  </Container>

  );
}

export default App
