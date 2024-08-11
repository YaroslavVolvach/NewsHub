import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import { fetchUserProfile } from '@/utils/user-api';
import styles from '@/components/LoginForm.module.css';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${BaseAPI}/user/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.access);
        localStorage.setItem('refreshToken', result.refresh);
        localStorage.setItem('isAuthenticated', 'true');

        const { username, is_admin } = await fetchUserProfile();
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', JSON.stringify(is_admin));

        window.location.replace('/');
      } else {
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>LoginForm</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && (
          <span className={styles.error}>{errors.username.message}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
