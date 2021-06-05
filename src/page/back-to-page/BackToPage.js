import React from 'react';
import './backToPage.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation, Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const BackToPage = () => {
  const location = useLocation();
  if (location.pathname === '/user') {
    return (
      <Link to='/' className='back-to-button'>
        <ArrowBackIcon /> Back To Register
      </Link>
    );
  }
  if (location.pathname.split('/')[1] === 'map') {
    return (
      <Link to='/user' className='back-to-button'>
        <ArrowBackIcon /> Back To User List
      </Link>
    );
  }
  return (
    <Link to='/user' className='back-to-button' style={{ color: 'white' }}>
      User List <ArrowForwardIcon />
    </Link>
  );
};

export default BackToPage;
