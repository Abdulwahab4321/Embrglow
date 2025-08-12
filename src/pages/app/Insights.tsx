import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
} from '@mui/material';
import {
  Insights as InsightsIcon,
  FilterList,
  Download,
  TrendingUp,
  TrendingDown,
  CalendarToday,
  BarChart,
  ShowChart,
  ScatterPlot,
  Save,
  Info,
  Refresh,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data for demonstration
const mockMoodData = [
  { date: '2024-01-01', mood: 7, energy: 6, hotFlashes: 2 },
  { date: '2024-01-02', mood: 5, energy: 4, hotFlashes: 4 },
  { date: '2024-01-03', mood: 8, energy: 7, hotFlashes: 1 },
  { date: '2024-01-04', mood: 6, energy: 5, hotFlashes: 3 },
  { date: '2024-01-05', mood: 9, energy: 8, hotFlashes: 0 },
  { date: '2024-01-06', mood: 4, energy: 3, hotFlashes: 5 },
  { date: '2024-01-07', mood: 7, energy: 6, hotFlashes: 2 },
];

const mockSymptomData = [
  { symptom: 'Hot Flashes', frequency: 15, intensity: 7 },
  { symptom: 'Mood Swings', frequency: 12, intensity: 6 },
  { symptom: 'Fatigue', frequency: 18, intensity: 8 },
  { symptom: 'Sleep Issues', frequency: 14, intensity: 7 },
  { symptom: 'Brain Fog', frequency: 10, intensity: 5 },
];

const mockTriggerData = [
  { trigger: 'Caffeine', hotFlashes: 8, moodImpact: 6 },
  { trigger: 'Stress', hotFlashes: 12, moodImpact: 9 },
  { trigger: 'Spicy Food', hotFlashes: 6, moodImpact: 3 },
  { trigger: 'Alcohol', hotFlashes: 4, moodImpact: 7 },
  { trigger: 'Exercise', hotFlashes: 2, moodImpact: 2 },
];

const COLORS = ['#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4'];

interface FilterState {
  dateRange: string;
  includeSoft: boolean;
  includeDeep: boolean;
  categories: string[];
}

const Insights: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '7d',
    includeSoft: true,
    includeDeep: true,
    categories: ['mood', 'symptoms', 'triggers'],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      setExportDialog(false);
      // In real app, this would trigger actual export
    }, 2000);
  };

  const patternCards = [
    {
      title: 'Hot flashes ↑ after caffeine (2–4pm)',
      description: 'You experience 3x more hot flashes within 2-4 hours of caffeine consumption',
      trend: 'up',
      confidence: 85,
    },
    {
      title: 'Better sleep with evening exercise',
      description: 'Sleep quality improves by 40% when exercising before 6pm',
      trend: 'up',
      confidence: 78,
    },
    {
      title: 'Mood dips on high-stress days',
      description: 'Mood scores are 30% lower on days with high stress levels',
      trend: 'down',
      confidence: 92,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Insights & Trends
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Understand your patterns and correlations
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => setExportDialog(true)}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Filters Panel */}
      {showFilters && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={filters.dateRange}
                    label="Date Range"
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  >
                    <MenuItem value="7d">Last 7 days</MenuItem>
                    <MenuItem value="30d">Last 30 days</MenuItem>
                    <MenuItem value="90d">Last 90 days</MenuItem>
                    <MenuItem value="custom">Custom range</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.includeSoft}
                        onChange={(e) => handleFilterChange('includeSoft', e.target.checked)}
                      />
                    }
                    label="Include Soft Logs"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.includeDeep}
                        onChange={(e) => handleFilterChange('includeDeep', e.target.checked)}
                      />
                    }
                    label="Include Deep Logs"
                  />
                </FormGroup>
              </Box>
              <Box sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1', md: '3 / -1' } }}>
                <Typography variant="body2" gutterBottom>
                  Categories
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {['mood', 'symptoms', 'triggers', 'sleep', 'energy'].map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      variant={filters.categories.includes(category) ? 'filled' : 'outlined'}
                      onClick={() => {
                        const newCategories = filters.categories.includes(category)
                          ? filters.categories.filter(c => c !== category)
                          : [...filters.categories, category];
                        handleFilterChange('categories', newCategories);
                      }}
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Pattern Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Pattern Analysis
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        {patternCards.map((pattern, index) => (
          <Box key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {pattern.trend === 'up' ? (
                    <TrendingUp color="success" sx={{ mr: 1 }} />
                  ) : (
                    <TrendingDown color="error" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="h6" component="h3">
                    {pattern.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pattern.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Confidence: {pattern.confidence}%
                  </Typography>
                  <Button size="small" startIcon={<Save />}>
                    Save to Tips
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Charts Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Trends & Correlations
      </Typography>
      
      {/* Mood Trend Chart */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mood & Energy Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockMoodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="mood" stroke="#E91E63" strokeWidth={2} />
                  <Line type="monotone" dataKey="energy" stroke="#9C27B0" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Symptom Frequency
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockSymptomData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent ? (percent * 100).toFixed(0) : 0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="frequency"
                  >
                    {mockSymptomData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Trigger Correlations */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trigger Correlations
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={mockTriggerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="trigger" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="hotFlashes" fill="#E91E63" />
                  <Bar dataKey="moodImpact" fill="#9C27B0" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Sleep vs Irritability */}
      <Box sx={{ mt: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sleep Quality vs Irritability
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMoodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Line yAxisId="left" type="monotone" dataKey="mood" stroke="#E91E63" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="hotFlashes" stroke="#9C27B0" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Export Insights</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Export your insights and patterns for sharing with healthcare providers or personal reference.
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Export Format</InputLabel>
            <Select
              value={exportFormat}
              label="Export Format"
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <MenuItem value="pdf">PDF Report</MenuItem>
              <MenuItem value="csv">CSV Data</MenuItem>
              <MenuItem value="json">JSON Data</MenuItem>
            </Select>
          </FormControl>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Include charts and graphs"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Include pattern analysis"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Include raw data"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
          <Button
            onClick={handleExport}
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <LinearProgress /> : <Download />}
          >
            {isLoading ? 'Exporting...' : 'Export'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Insights;
