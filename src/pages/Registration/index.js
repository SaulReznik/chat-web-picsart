import { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { API_URL } from '../../config';
import styles from './Registration.module.css';

let cx = classNames.bind(styles);

const Registration = () => {
  const [fields, setFields] = useState({
    username: '',
    password: ''
  });

  const { push } = useHistory();

  const handleFieldChange = useCallback(
    e => {
      e.preventDefault();
      const { name, value } = e.target;

      setFields(prevstate => ({
        ...prevstate,
        [name]: value
      }));
    },
    [setFields]
  );

  const validation = () =>
    fields.username.length < 3 || fields.password.length < 8;

  const handleRegistrationSubmit = useCallback(
    async e => {
      e.preventDefault();

      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      });

      const body = await response.json();
      console.log('Sign up response body --->', body);
      push('/login');
    },
    [push, fields]
  );

  return (
    <div className={cx('form-container')}>
      <form className={cx('form')} onSubmit={e => handleRegistrationSubmit(e)}>
        <h2>Register</h2>
        <input
          className={cx('input')}
          name="username"
          value={fields.username}
          placeholder="username"
          onChange={e => handleFieldChange(e)}
        />
        <input
          className={cx('input')}
          name="password"
          type="password"
          value={fields.password}
          placeholder="password"
          onChange={e => handleFieldChange(e)}
        />
        <input
          disabled={validation()}
          className={cx('submit')}
          type="submit"
          value="Register"
        />
        <span>
          Already have an account? <Link to="/login">Log in</Link>
        </span>
      </form>
    </div>
  );
};

export default Registration;
