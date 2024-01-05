import React, { useEffect, useState } from 'react';
import logo from '../../logo-chat-app.png'
import { Wrapper } from './styles';
import { Box, FormControlLabel, Paper, IconButton, Radio, RadioGroup, Stack, TextField, Typography, Divider, Button } from '@mui/material';
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; 
import CustomDialog from '../utils/CustomDialog';
import { useRegisterUserMutation } from '../../app/api/apiSlice';

function Register() {

  const [registerUser, registerUserResult] = useRegisterUserMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('');

  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    dateOfBirth: '',
    gender: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (field === 'password2') {
      if (formData.password !== event.target.value) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, dateOfBirth: date.toLocaleDateString() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   await registerUser(formData)
  }
  useEffect(() => {
      if (registerUserResult.isError) {
        if (registerUserResult.error.status === 409) {
          setDialogMessage('Email already exists try again with another email')

        } else {
          setDialogMessage('Unknown error occurred')

        }
        setDialogType("Error")
        setDialogOpen(true)
      }else{
        setDialogOpen(false)

        if (registerUserResult.status ==='fulfilled'){
          navigate('/', { state: { registrationSuccess: true } });
        }

      }






  }, [registerUserResult, navigate])





  return (
  <Wrapper>
      {(registerUserResult.status === 'pending') ? (<>Loading...</>) :
      <>
          <Box ><img src={logo} alt='app-logo'/></Box>

          <Paper sx={{  padding: '10px' ,  width: 'min-conten' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' ,width:'min-content'}}>
        <Stack>
          <Box>
            <Typography marginBottom={'5px'} variant='h3'>
              Register
            </Typography>
            <Typography marginBottom={'5px'} variant='body1'>
              It's fast and easy
            </Typography>
            <Divider />
          </Box>

          <TextField
            name='email'
            type='email'
            required
            label='Email'
            value={formData.email}
            onChange={handleChange('email')}
          />
          <TextField
            name='username'
            type='text'
            required
            label='Username'
            value={formData.username}
            onChange={handleChange('username')}
          />

          <TextField
            name='password'
            onChange={handleChange('password')}
            required
            type={visible ? 'password' : 'text'}
            value={formData.password}
            sx={{ width: '300px' }}
            label='Password'
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setVisible(!visible)}>
                  {visible ? <VisibilityOff /> : <RemoveRedEye />}
                </IconButton>
              ),
            }}
          />
          <TextField
            name='password2'
            onChange={handleChange('password2')}
            required
            type={visible ? 'password' : 'text'}
            value={formData.password2}
            sx={{ width: '300px' }}
            label='Password Confirmation'
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setVisible(!visible)}>
                  {visible ? <VisibilityOff /> : <RemoveRedEye />}
                </IconButton>
              ),
            }}
          />
          <Box>
            <DatePicker
              name='emaissssl'
              selected={selectedDate}
              required
              onChange={handleDateChange}
              dateFormat='dd MMMM yyyy'
              placeholderText='Select Date of Birth'
            />
          </Box>
          <RadioGroup
            onChange={handleChange('gender')}
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='male'
            name='radio-buttons-group'
            sx={{ flexDirection: 'row' }}
          >
            <FormControlLabel name='email' value='male' control={<Radio />} label='Male' />
            <FormControlLabel name='email' value='female' control={<Radio />} label='Female' />
          </RadioGroup>
          <Button
            type='submit'
            disabled={disable}
            variant='contained'
            sx={{ bgcolor: theme.palette.success.main, width: '85%', margin: '20px' }}
          >
            <Typography variant='h6'>Sign in</Typography>
          </Button>
        </Stack>
      </form>
    </Paper>       </>
}
    <CustomDialog message={dialogMessage} isOpen={dialogOpen} type={dialogType} />

  </Wrapper>)




}
export default Register;
