import React, { useReducer, useState } from 'react';
import {
  Button,
  TextField,
  Form,
  FormLayout,
  InlineError,
} from '@shopify/polaris';
import './login.scss';
import { useHistory } from 'react-router-dom';
import reducer from './Reducer';

const initialState = {
  email: { value: '', isHidden: false, errorMessage: '' },
  firstName: { value: '', isHidden: false, errorMessage: '' },
  lastName: { value: '', isHidden: false, errorMessage: '' },
  address: { value: '', isHidden: false, errorMessage: '' },
  phoneNumber: { value: '', isHidden: false, errorMessage: '' },
};

function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, firstName, lastName, address, phoneNumber } = state;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  //get let and lng
  const getGeocoding = async (address) => {
    const location = address.split(' ').join('%20');
    const push = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=83fe5b57deb03b0b0188a70373f3a1c7&query=${location}`
    );
    const data = await push.json();
    return [data.data[0].latitude, data.data[0].longitude];
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkSubmit = true;
    for (const property in state) {
      if (state[property].isHidden || state[property].value === '') {
        checkSubmit = false;
      }
    }

    if (checkSubmit) {
      try {
        setLoading(true);
        const [latitude, longitude] = await getGeocoding(address.value);

        const user = {
          name: firstName.value + ' ' + lastName.value,
          email: email.value,
          address: address.value,
          phoneNumber: phoneNumber.value,
          latitude,
          longitude,
        };
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify(user),
        };
        await fetch(
          'https://60b998c480400f00177b69d0.mockapi.io/user',
          requestOptions
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      clearAll();
      checkSubmit = false;
      history.push('/user');
    } else {
      checkAll();
    }
  };

  const handlevalueChange = (value, name) => {
    //name is ID Of input
    dispatch({ type: 'SET_VALUE', payload: { value, name } });
  };

  const checkValue = (name) => {
    dispatch({ type: 'CKECK_VALUE', payload: name.target.id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const checkAll = () => {
    const valueName = [
      'firstName',
      'lastName',
      'address',
      'email',
      'phoneNumber',
    ];
    //call check all value
    valueName.forEach((element) =>
      dispatch({ type: 'CKECK_VALUE', payload: element })
    );
  };

  return (
    <div className='content'>
      <div className='login-background'>
        <h1>Resgister Form</h1>
        <div className='form-container'>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              {/* email */}
              <TextField
                value={email.value}
                id='email'
                onChange={handlevalueChange}
                onBlur={checkValue}
                label='Email'
                type='email'
              />
              {email.isHidden && (
                <InlineError message={email.errorMessage} fieldID='myFieldID' />
              )}

              {/*  name */}
              <FormLayout.Group condensed>
                <TextField
                  value={firstName.value}
                  label='First name'
                  id='firstName'
                  onChange={handlevalueChange}
                  onBlur={checkValue}
                />
                <TextField
                  label='Last Name'
                  id='lastName'
                  value={lastName.value}
                  onChange={handlevalueChange}
                  onBlur={checkValue}
                />
              </FormLayout.Group>

              {firstName.isHidden && !lastName.isHidden && (
                <FormLayout.Group condensed>
                  <InlineError
                    message={firstName.errorMessage}
                    fieldID='myFieldID'
                  />
                  <div style={{ opacity: 0 }}>
                    <InlineError message='   ' fieldID='myFieldID' />
                  </div>
                </FormLayout.Group>
              )}
              {!firstName.isHidden && lastName.isHidden && (
                <FormLayout.Group condensed>
                  <div style={{ opacity: 0 }}>
                    <InlineError message='   ' fieldID='myFieldID' />
                  </div>
                  <InlineError
                    message={lastName.errorMessage}
                    fieldID='myFieldID'
                  />
                </FormLayout.Group>
              )}
              {lastName.isHidden && firstName.isHidden && (
                <FormLayout.Group condensed>
                  <InlineError
                    message={firstName.errorMessage}
                    fieldID='myFieldID'
                  />
                  <InlineError
                    message={lastName.errorMessage}
                    fieldID='myFieldID'
                  />
                </FormLayout.Group>
              )}

              {/*  address */}
              <TextField
                label='Address'
                value={address.value}
                id='address'
                onChange={handlevalueChange}
                onBlur={checkValue}
              />
              {address.isHidden && (
                <div className='form_messError'>
                  <InlineError
                    message={address.errorMessage}
                    fieldID='myFieldID'
                  />
                </div>
              )}

              {/*  phone */}
              <TextField
                label='Phone number'
                value={phoneNumber.value}
                id='phoneNumber'
                onChange={handlevalueChange}
                onBlur={checkValue}
              />
              {phoneNumber.isHidden && (
                <InlineError
                  message={phoneNumber.errorMessage}
                  fieldID='myFieldID'
                />
              )}

              {!loading ? (
                <Button submit>Submit</Button>
              ) : (
                <Button submit>waiting...</Button>
              )}
            </FormLayout>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
