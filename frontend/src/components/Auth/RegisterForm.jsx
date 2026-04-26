import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, IconButton, InputAdornment, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff, Google, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, 'Name is too short')
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      acceptTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: (values) => {
      console.log('Registration attempt', values);
      // TODO: Dispatch register action
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
      <p className="text-gray-500 mb-8">Join RoiScholar to track your educational ROI.</p>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Full Name"
            variant="outlined"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            placeholder="John Doe"
            InputProps={{
              className: 'bg-gray-50/50 rounded-xl',
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
              }
            }}
          />
        </div>

        <div>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder="name@university.edu"
            InputProps={{
              className: 'bg-gray-50/50 rounded-xl',
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              className: 'bg-gray-50/50 rounded-xl',
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
              }
            }}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            InputProps={{
              className: 'bg-gray-50/50 rounded-xl',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
              }
            }}
          />
        </div>

        <div className="flex items-start">
          <FormControlLabel
            control={
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                color="primary"
                checked={formik.values.acceptTerms}
                onChange={formik.handleChange}
                sx={{ mt: -1 }}
              />
            }
            label={
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#terms" className="text-blue-600 font-semibold hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
              </span>
            }
          />
        </div>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <p className="text-xs text-red-500 mt-[-8px] ml-9">{formik.errors.acceptTerms}</p>
        )}

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          size="large"
          sx={{ 
            mt: 1, 
            mb: 2, 
            py: 1.5, 
            borderRadius: '0.75rem',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            backgroundColor: '#1B2A5B',
            '&:hover': {
              backgroundColor: '#141f45',
            }
          }}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Create Account
        </Button>
      </form>

      <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#e5e7eb' } }}>
        <span className="text-gray-400 text-sm font-medium">OR SIGN UP WITH</span>
      </Divider>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outlined" 
          startIcon={<Google sx={{ color: '#DB4437' }} />}
          sx={{ 
            py: 1.25, 
            borderRadius: '0.75rem', 
            borderColor: '#e5e7eb', 
            color: '#374151',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' }
          }}
        >
          Google
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<LinkedIn sx={{ color: '#0A66C2' }} />}
          sx={{ 
            py: 1.25, 
            borderRadius: '0.75rem', 
            borderColor: '#e5e7eb', 
            color: '#374151',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' }
          }}
        >
          LinkedIn
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
