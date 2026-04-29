import React from 'react';
import { Typography, Grid, Paper, Box, Button, Divider, LinearProgress, Avatar } from '@mui/material';
import { TrendingUp, AccountBalance, Assignment } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#091E42', mb: 1, fontFamily: 'Inter, sans-serif' }}>
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </Typography>
          <Typography variant="body1" sx={{ color: '#42526E' }}>
            Here's an overview of your ROI and application progress.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#0052CC', 
            textTransform: 'none', 
            fontWeight: 600,
            '&:hover': { backgroundColor: '#0747A6' }
          }}
        >
          New Calculation
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, borderTop: '4px solid #0052CC', boxShadow: '0 4px 12px rgba(9, 30, 66, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#5E6C84', textTransform: 'uppercase', letterSpacing: 1, mb: 1, fontWeight: 600 }}>Saved Universities</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#172B4D' }}>3</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#E6EFFC', color: '#0052CC', width: 56, height: 56 }}>
              <AccountBalance fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, borderTop: '4px solid #36B37E', boxShadow: '0 4px 12px rgba(9, 30, 66, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#5E6C84', textTransform: 'uppercase', letterSpacing: 1, mb: 1, fontWeight: 600 }}>Avg. Estimated ROI</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#172B4D' }}>12.4%</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#E3FCEF', color: '#36B37E', width: 56, height: 56 }}>
              <TrendingUp fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, borderTop: '4px solid #00B8D9', boxShadow: '0 4px 12px rgba(9, 30, 66, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#5E6C84', textTransform: 'uppercase', letterSpacing: 1, mb: 1, fontWeight: 600 }}>Loan Offers</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#172B4D' }}>2</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#E6FCFF', color: '#00B8D9', width: 56, height: 56 }}>
              <Assignment fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, minHeight: 380, boxShadow: '0 4px 12px rgba(9, 30, 66, 0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#091E42' }}>Recent Calculations</Typography>
              <Button size="small" sx={{ color: '#0052CC', textTransform: 'none', fontWeight: 600 }}>View All</Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Dummy Data Rows */}
              {[
                { name: 'Stanford University - MS CS', date: 'Oct 24, 2026', roi: '15.2%', status: 'Excellent' },
                { name: 'MIT - MEng', date: 'Oct 22, 2026', roi: '14.8%', status: 'Excellent' },
                { name: 'NYU - Data Science', date: 'Oct 15, 2026', roi: '8.4%', status: 'Average' }
              ].map((calc, i) => (
                <Box key={i}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#172B4D' }}>{calc.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#5E6C84' }}>Calculated on {calc.date}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: calc.status === 'Excellent' ? '#36B37E' : '#FF991F' }}>{calc.roi} ROI</Typography>
                      <Typography variant="caption" sx={{ color: '#5E6C84', fontWeight: 600 }}>{calc.status}</Typography>
                    </Box>
                  </Box>
                  {i < 2 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Side Panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, minHeight: 380, boxShadow: '0 4px 12px rgba(9, 30, 66, 0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#091E42', mb: 3 }}>Next Steps</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', mb: 1, justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#172B4D' }}>Profile Completion</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#0052CC' }}>60%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4, backgroundColor: '#E6EFFC', '& .MuiLinearProgress-bar': { backgroundColor: '#0052CC', borderRadius: 4 } }} />
              </Box>

              <Box sx={{ p: 2, backgroundColor: '#FAFBFC', borderRadius: 2, border: '1px solid #DFE1E6' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#172B4D', mb: 0.5 }}>Upload Transcripts</Typography>
                <Typography variant="body2" sx={{ color: '#5E6C84', mb: 2 }}>We need your latest academic records to improve loan match accuracy.</Typography>
                <Button size="small" variant="outlined" sx={{ textTransform: 'none', fontWeight: 600, borderColor: '#DFE1E6', color: '#42526E', '&:hover': { backgroundColor: '#EBECF0', borderColor: '#DFE1E6' } }}>Upload Now</Button>
              </Box>

              <Box sx={{ p: 2, backgroundColor: '#E3FCEF', borderRadius: 2, border: '1px solid #79F2C0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#006644', mb: 0.5 }}>2 New Loan Matches</Typography>
                <Typography variant="body2" sx={{ color: '#006644', mb: 2 }}>Based on your recent Stanford calculation, we found two new options.</Typography>
                <Button size="small" sx={{ textTransform: 'none', fontWeight: 600, color: '#006644', '&:hover': { backgroundColor: '#ABF5D1' } }}>Review Offers</Button>
              </Box>

            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
