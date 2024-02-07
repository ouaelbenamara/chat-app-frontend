import { Alert, Box, Button, Divider, IconButton, OutlinedInput, Paper, TextField, Typography, } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledBox } from './styles'
import { Check, RemoveRedEye } from '@mui/icons-material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { logOut, setCredentials } from '../../features/users/userSlice'
import { useSelector ,useDispatch} from 'react-redux';
import { selectUser } from '../../features/users/userSlice'
import { apiSlice, useLogInUserMutation } from '../../app/api/apiSlice';
import CustomDialog from '../utils/CustomDialog';
import { resetStore } from '../../helpers/functions';
import userReducer from '../../features/users/userSlice'
import { injectAsyncReducer, store } from '../../app/store';
// ... (imports)


function Home() {




  const dispatch = useDispatch()
  // const user =useSelector(selectUser)


  const [logInUser, logInUserResult] = useLogInUserMutation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('');

  useEffect(()=>{
    console.log('HEHEHEHEH')
    resetStore(dispatch)

  },[])
  useEffect(() => {
    if (location.state && location.state.registrationSuccess) {
      setShowSuccessAlert(true);
      navigate({
        state: {},
        replace: true,
      });
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await logInUser(formData);
    const { data } = logInUserResult
    if(logInUserResult.status==='fulfilled'){
    const user = data?.user;
    const token = data?.token
    console.log('tokenmm=',token)
    if (data?.user && data?.token) {
      console.log('entred')
      const payload = {
        user:user,
        token:token
      }
      dispatch(setCredentials(payload))
    }}


  };
  // useEffect(()=>{
  //    console.log(user)

  // },[user])
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (logInUserResult.isError) {
      if (logInUserResult.error.status === 401) {
        setDialogMessage('Email or password are incorrect')
        dispatch(logOut())

      } else {
        console.log(logInUserResult.status)
        setDialogMessage('Unknown error occurred')
        dispatch(logOut())


      }
      setDialogType("Error")
      setDialogOpen(true)
    } else {
      setDialogOpen(false)

      if (logInUserResult.status === 'fulfilled') {
        // console.log(logInUserResult.data)
        localStorage.setItem('userData', JSON.stringify(logInUserResult.data.user))
        localStorage.setItem('token', JSON.stringify(logInUserResult.data.token))
        // injectAsyncReducer(store, `user_${logInUserResult.data.user._id}`, userReducer);
        sessionStorage.setItem('userId', logInUserResult.data.user._id)
        dispatch(setCredentials({ user: logInUserResult.data.user, token: logInUserResult.data.token }))
        // console.log(logInUserResult)


        navigate(`/chats`,);
        
        console.log(logInUserResult.data.user._id,'login successful')
      }

    }






  }, [logInUserResult, navigate])
  return (
    <StyledBox backgroundColor={'#F0ECEC'}>
      <Box sx={{ width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          <img src='' alt='chat-logo' />
          <Typography>partagez et restez en contact avec votre entourage. </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Paper sx={{ paddingX: '20px', paddingY: '20px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <OutlinedInput name='email' required onChange={handleChange('email')} sx={{ width: '300px' }} placeholder='Email address' />
            </Box>
            <Box>
              <TextField name='password' required onChange={handleChange('password')} type={visible ? 'password' : 'text'} sx={{ width: '300px' }} placeholder='Password' InputProps={{ endAdornment: (<IconButton onClick={() => setVisible(!visible)}>{visible ? <VisibilityOffIcon /> : <RemoveRedEye />}</IconButton>) }} />
            </Box>
            <Button type='submit' variant='contained'>
              LogIn
            </Button>
            <Box sx={{ marginLeft: '90px' }}>
              <Link style={{ textDecoration: 'none' }}>Forgot password</Link>
            </Box>
            <Divider />
            <Button type='submit' variant='contained' component={Link} sx={{ width: '200px', marginLeft: '50px', backgroundColor: theme.palette.success.main }} to={'/Register'}>
              Create an account
            </Button>
          </Paper>
        </form>
      </Box>
      {showSuccessAlert && (
        <Alert
          sx={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            zIndex: '3',
          }}
          variant={'filled'}
          severity='success'
          icon={<Check fontSize='inherit' />}
          action={
            <Button
              color='inherit'
              size='small'
              onClick={() => {
                setShowSuccessAlert(false);
              }}
            >
              UNDO
            </Button>
          }
        >
          Registration successful! You can now log in.
        </Alert>
      )}
      
      <CustomDialog message={dialogMessage} isOpen={dialogOpen} type={dialogType} />

    </StyledBox>
  );
}

export default Home;


