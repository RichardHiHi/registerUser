import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './user.scss';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const User = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getUser = async () => {
      if (location.pathname === '/user') {
        setLoading(true);
        const response = await fetch(
          `https://60b998c480400f00177b69d0.mockapi.io/user?page=${page}&limit=10`
        );
        const users = await response.json();
        console.log(users);
        setUsers(users);
        setLoading(false);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUser();
  }, [location.pathname, page]);

  return (
    <div className='content'>
      <h2 className='user-title'>USER LIST</h2>
      <div className='user-info-container'>
        <div className='user-info__header'>
          <Grid container>
            <Grid item sm={3} className='user-info-header__item'>
              <span className='user-info__title'>NAME</span>
            </Grid>
            <Grid item sm={3} className='user-info-header__item text-align'>
              <span className='user-info__title'>ADDRESS</span>
            </Grid>
            <Grid item sm={3} className='user-info-header__item text-align'>
              <span className='user-info__title'>PHONE</span>
            </Grid>
            <Grid
              item
              sm={3}
              className='user-info-header__item text-align-right '
            >
              <span className='user-info__title'>EMAIL</span>
            </Grid>
          </Grid>
        </div>
        {!loading && (
          <div className='user-info__content'>
            {users.map((user) => {
              return (
                <Link
                  to={`/map/${user.lat}/${user.lng}/${user.name}/${user.addressName}`}
                  className='user-info__button'
                >
                  <Grid container>
                    <Grid item sm={3} className='user-info__item'>
                      <span className='user-info-content__title'>
                        {user.name}
                      </span>
                    </Grid>
                    <Grid item sm={3} className='user-info__item text-align'>
                      <span className='user-info-content__title '>
                        {user.addressName}
                      </span>
                    </Grid>
                    <Grid item sm={3} className='user-info__item text-align'>
                      <span className='user-info-content__title '>
                        {user.phone}
                      </span>
                    </Grid>
                    <Grid
                      item
                      sm={3}
                      className='user-info__item text-align-right '
                    >
                      <span className='user-info-content__title '>
                        {user.email}
                      </span>
                    </Grid>
                  </Grid>
                </Link>
              );
            })}
          </div>
        )}
        {loading && <h2 className='user__loading'>Loading...</h2>}
      </div>
      <div className='user-pagination'>
        <div className={classes.root}>
          <Pagination
            defaultPage={1}
            count={10}
            page={page}
            size='large'
            shape='rounded'
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
