import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, IconButton, InputAdornment, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Google, LinkedIn } from '@mui/icons-material';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Login attempt', values);
      // TODO: Dispatch login action / connect to auth service
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>
      
      <form onSubmit={formik.handleSubmit} className="space-y-5">
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

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700"></span>
            <a href="#forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </a>
          </div>
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

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          size="large"
          sx={{ 
            mt: 2, 
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
          Sign In
        </Button>
      </form>

      <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#e5e7eb' } }}>
        <span className="text-gray-400 text-sm font-medium">OR CONTINUE WITH</span>
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
        Don't have an account?{' '}
        <a href="#register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Sign up for free
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
