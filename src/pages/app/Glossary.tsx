import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Divider,
  Grid,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Book,
  Search,
  Language,
  Favorite,
  FavoriteBorder,
  Add,
  Chat,
  Timeline,
  Info,
  Translate,
  Public as Culture,
  LocalHospital,
  Spa,
  Restaurant,
  Psychology,
} from '@mui/icons-material';

interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation: string;
  definition: string;
  culturalContext: string;
  doGuidance: string[];
  dontGuidance: string[];
  category: 'symptom' | 'remedy' | 'cultural' | 'medical' | 'wellness';
  region: string;
  relatedTerms: string[];
  isFavorite: boolean;
}

const Glossary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock glossary data
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      term: 'Nervios',
      pronunciation: 'nehr-VEE-ohs',
      definition: 'A cultural concept of nervousness, anxiety, and emotional distress often associated with life changes and stress.',
      culturalContext: 'Common in Latin American cultures, particularly among women experiencing life transitions like menopause.',
      doGuidance: [
        'Recognize it as a valid cultural experience',
        'Consider traditional remedies like chamomile tea',
        'Seek support from family and community',
        'Practice gentle self-care routines'
      ],
      dontGuidance: [
        'Dismiss it as "just anxiety"',
        'Ignore cultural significance',
        'Force Western medical approaches only'
      ],
      category: 'cultural',
      region: 'Latin America',
      relatedTerms: ['Susto', 'Empacho', 'Mal de ojo'],
      isFavorite: false,
    },
    {
      id: '2',
      term: 'Hot Flash',
      pronunciation: 'hot flash',
      definition: 'A sudden feeling of warmth, often accompanied by sweating and flushing, typically occurring during menopause.',
      culturalContext: 'Universal menopausal symptom, but cultural responses and management strategies vary widely.',
      doGuidance: [
        'Keep a small fan nearby',
        'Wear layered clothing',
        'Stay hydrated',
        'Practice cooling techniques'
      ],
      dontGuidance: [
        'Panic or feel embarrassed',
        'Ignore triggers like caffeine',
        'Wear heavy, non-breathable fabrics'
      ],
      category: 'symptom',
      region: 'Global',
      relatedTerms: ['Night sweats', 'Vasomotor symptoms', 'Flushing'],
      isFavorite: true,
    },
    {
      id: '3',
      term: 'Yoga Nidra',
      pronunciation: 'YOH-gah NEE-drah',
      definition: 'A form of guided meditation and deep relaxation practice that promotes restful sleep and stress reduction.',
      culturalContext: 'Ancient Indian practice adapted for modern wellness, particularly beneficial for sleep issues during menopause.',
      doGuidance: [
        'Practice regularly for best results',
        'Create a quiet, comfortable space',
        'Follow guided sessions initially',
        'Be patient with the process'
      ],
      dontGuidance: [
        'Expect immediate results',
        'Practice when very tired',
        'Force concentration'
      ],
      category: 'remedy',
      region: 'India/Global',
      relatedTerms: ['Meditation', 'Sleep hygiene', 'Stress management'],
      isFavorite: false,
    },
    {
      id: '4',
      term: 'Brain Fog',
      pronunciation: 'brain fog',
      definition: 'Difficulty concentrating, memory lapses, and mental confusion commonly experienced during menopause.',
      culturalContext: 'Recognized across cultures but may be described differently in various traditions.',
      doGuidance: [
        'Practice mindfulness techniques',
        'Get adequate sleep',
        'Stay mentally active',
        'Use memory aids and reminders'
      ],
      dontGuidance: [
        'Blame yourself for forgetfulness',
        'Ignore the symptom',
        'Overwhelm yourself with tasks'
      ],
      category: 'symptom',
      region: 'Global',
      relatedTerms: ['Cognitive changes', 'Memory issues', 'Concentration'],
      isFavorite: false,
    },
    {
      id: '5',
      term: 'Ayurveda',
      pronunciation: 'ah-yur-VAY-dah',
      definition: 'Traditional Indian system of medicine that emphasizes balance and natural healing.',
      culturalContext: 'Ancient Indian medical system with specific approaches to women\'s health and menopause.',
      doGuidance: [
        'Consult qualified practitioners',
        'Learn about your dosha type',
        'Incorporate dietary changes gradually',
        'Combine with modern medicine when appropriate'
      ],
      dontGuidance: [
        'Self-diagnose or self-treat serious conditions',
        'Ignore modern medical advice',
        'Expect instant results'
      ],
      category: 'medical',
      region: 'India',
      relatedTerms: ['Dosha', 'Pitta', 'Vata', 'Kapha'],
      isFavorite: false,
    },
  ];

  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>(glossaryTerms);

  useEffect(() => {
    let filtered = glossaryTerms;
    
    if (searchQuery) {
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.culturalContext.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }
    
    setFilteredTerms(filtered);
  }, [searchQuery, selectedCategory]);

  const handleTermClick = (term: GlossaryTerm) => {
    setSelectedTerm(term);
    setShowDetailDialog(true);
  };

  const handleFavoriteToggle = (termId: string) => {
    setFavorites(prev => 
      prev.includes(termId) 
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
    );
  };

  const handleAddToTracker = (term: GlossaryTerm) => {
    // In real app, this would add the term to tracker defaults
    console.log('Adding to tracker:', term.term);
  };

  const handleUseInChat = (term: GlossaryTerm) => {
    // In real app, this would open chat with term context
    console.log('Using in chat:', term.term);
  };

  const categories = [
    { key: 'all', label: 'All Terms', icon: <Book /> },
    { key: 'symptom', label: 'Symptoms', icon: <LocalHospital /> },
    { key: 'remedy', label: 'Remedies', icon: <Spa /> },
    { key: 'cultural', label: 'Cultural', icon: <Culture /> },
    { key: 'medical', label: 'Medical', icon: <Psychology /> },
    { key: 'wellness', label: 'Wellness', icon: <Restaurant /> },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'symptom': return <LocalHospital />;
      case 'remedy': return <Spa />;
      case 'cultural': return <Culture />;
      case 'medical': return <Psychology />;
      case 'wellness': return <Restaurant />;
      default: return <Book />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Glossary & Cultural Library
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Learn about cultural terms, remedies, and menopause-related concepts
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Translate />}
          onClick={() => {/* Language settings */}}
        >
          Language
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search terms, definitions, or cultural concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((category) => (
              <Chip
                key={category.key}
                icon={category.icon}
                label={category.label}
                variant={selectedCategory === category.key ? 'filled' : 'outlined'}
                onClick={() => setSelectedCategory(category.key)}
                clickable
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Results */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
        {filteredTerms.map((term) => (
          <Card key={term.id} sx={{ cursor: 'pointer' }} onClick={() => handleTermClick(term)}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {term.term}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {term.pronunciation}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(term.id);
                  }}
                >
                  {favorites.includes(term.id) ? <Favorite color="primary" /> : <FavoriteBorder />}
                </IconButton>
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {term.definition}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {getCategoryIcon(term.category)}
                <Chip
                  label={term.category}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={term.region}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Typography variant="body2" color="text.secondary">
                {term.culturalContext.substring(0, 100)}...
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* No Results */}
      {filteredTerms.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Book sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No terms found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or category filter
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Term Detail Dialog */}
      <Dialog 
        open={showDetailDialog} 
        onClose={() => setShowDetailDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedTerm && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedTerm.term}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTerm.pronunciation} • {selectedTerm.region}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleFavoriteToggle(selectedTerm.id)}
                >
                  {favorites.includes(selectedTerm.id) ? <Favorite color="primary" /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                Definition
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedTerm.definition}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Cultural Context
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedTerm.culturalContext}
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom color="success.main">
                    Do's
                  </Typography>
                  <List dense>
                    {selectedTerm.doGuidance.map((guidance, index) => (
                      <ListItem key={index} sx={{ py: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Info color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={guidance} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom color="error.main">
                    Don'ts
                  </Typography>
                  <List dense>
                    {selectedTerm.dontGuidance.map((guidance, index) => (
                      <ListItem key={index} sx={{ py: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Info color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={guidance} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>

              {selectedTerm.relatedTerms.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Related Terms
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selectedTerm.relatedTerms.map((relatedTerm) => (
                      <Chip
                        key={relatedTerm}
                        label={relatedTerm}
                        variant="outlined"
                        size="small"
                        clickable
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<Timeline />}
                onClick={() => handleAddToTracker(selectedTerm)}
              >
                Add to Tracker Defaults
              </Button>
              <Button
                startIcon={<Chat />}
                onClick={() => handleUseInChat(selectedTerm)}
                variant="contained"
              >
                Use in Chat
              </Button>
              <Button onClick={() => setShowDetailDialog(false)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Glossary;
