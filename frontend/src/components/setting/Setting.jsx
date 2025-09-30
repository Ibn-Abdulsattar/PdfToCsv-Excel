import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Grid
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Save,
  ArrowBack
} from '@mui/icons-material';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    currentName: 'John Doe',
    newName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [alerts, setAlerts] = useState({
    name: null,
    password: null
  });
  
  const [loading, setLoading] = useState({
    name: false,
    password: false
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear alerts when user starts typing
    if (field.includes('Name')) {
      setAlerts(prev => ({ ...prev, name: null }));
    } else {
      setAlerts(prev => ({ ...prev, password: null }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleNameUpdate = async () => {
    if (!formData.newName.trim()) {
      setAlerts(prev => ({ 
        ...prev, 
        name: { type: 'error', message: 'نام درج کریں' } 
      }));
      return;
    }
    
    if (formData.newName.trim().length < 2) {
      setAlerts(prev => ({ 
        ...prev, 
        name: { type: 'error', message: 'نام کم از کم 2 حروف کا ہونا چاہیے' } 
      }));
      return;
    }

    setLoading(prev => ({ ...prev, name: true }));
    
    // Simulate API call
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        currentName: prev.newName,
        newName: ''
      }));
      setAlerts(prev => ({ 
        ...prev, 
        name: { type: 'success', message: 'نام کامیابی سے اپ ڈیٹ ہو گیا' } 
      }));
      setLoading(prev => ({ ...prev, name: false }));
    }, 1000);
  };

  const handlePasswordUpdate = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setAlerts(prev => ({ 
        ...prev, 
        password: { type: 'error', message: 'تمام فیلڈز بھریں' } 
      }));
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setAlerts(prev => ({ 
        ...prev, 
        password: { type: 'error', message: 'نیا پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے' } 
      }));
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setAlerts(prev => ({ 
        ...prev, 
        password: { type: 'error', message: 'نیا پاس ورڈ اور تصدیق میں فرق ہے' } 
      }));
      return;
    }

    setLoading(prev => ({ ...prev, password: true }));
    
    // Simulate API call
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setAlerts(prev => ({ 
        ...prev, 
        password: { type: 'success', message: 'پاس ورڈ کامیابی سے اپ ڈیٹ ہو گیا' } 
      }));
      setLoading(prev => ({ ...prev, password: false }));
    }, 1000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={() => console.log('Go back')}
          sx={{ 
            bgcolor: 'primary.light', 
            color: 'white',
            '&:hover': { bgcolor: 'primary.main' }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Name Update Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Person sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="medium">
                نام تبدیل کریں
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                موجودہ نام
              </Typography>
              <Typography variant="body1" sx={{ 
                p: 1.5, 
                bgcolor: 'grey.100', 
                borderRadius: 1,
                fontWeight: 'medium'
              }}>
                {formData.currentName}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="نیا نام"
              value={formData.newName}
              onChange={handleInputChange('newName')}
              sx={{ mb: 2 }}
              variant="outlined"
            />

            {alerts.name && (
              <Alert 
                severity={alerts.name.type} 
                sx={{ mb: 2 }}
                onClose={() => setAlerts(prev => ({ ...prev, name: null }))}
              >
                {alerts.name.message}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handleNameUpdate}
              disabled={loading.name || !formData.newName.trim()}
              startIcon={<Save />}
              sx={{ width: '100%' }}
            >
              {loading.name ? 'اپ ڈیٹ ہو رہا ہے...' : 'نام اپ ڈیٹ کریں'}
            </Button>
          </Paper>
        </Grid>

        {/* Password Update Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Lock sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="medium">
                پاس ورڈ تبدیل کریں
              </Typography>
            </Box>

            <TextField
              fullWidth
              type={showPasswords.current ? 'text' : 'password'}
              label="موجودہ پاس ورڈ"
              value={formData.currentPassword}
              onChange={handleInputChange('currentPassword')}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('current')}
                      edge="end"
                    >
                      {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type={showPasswords.new ? 'text' : 'password'}
              label="نیا پاس ورڈ"
              value={formData.newPassword}
              onChange={handleInputChange('newPassword')}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('new')}
                      edge="end"
                    >
                      {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type={showPasswords.confirm ? 'text' : 'password'}
              label="نیا پاس ورڈ دوبارہ درج کریں"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('confirm')}
                      edge="end"
                    >
                      {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {alerts.password && (
              <Alert 
                severity={alerts.password.type} 
                sx={{ mb: 2 }}
                onClose={() => setAlerts(prev => ({ ...prev, password: null }))}
              >
                {alerts.password.message}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handlePasswordUpdate}
              disabled={loading.password || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
              startIcon={<Save />}
              sx={{ width: '100%' }}
            >
              {loading.password ? 'اپ ڈیٹ ہو رہا ہے...' : 'پاس ورڈ اپ ڈیٹ کریں'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}