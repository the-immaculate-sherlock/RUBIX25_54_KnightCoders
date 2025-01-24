import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled.div`
  background: #0D1B2A;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const FormWrapper = styled.div`
  background: #E0E1DD;
  border-radius: 40px;
  border: 5px solid #ddd;
  box-shadow: 10px 15px 20px rgba(119, 141, 169, 1);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  &:focus {
    border-color: #6a11cb;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin: 1rem 0;
  border: none;
  background: #0D1B2A;
  color: white;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    background: #415A77;
  }
`;

const GoogleButton = styled(Button)`
  background: #ffffff;
  color: #333;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #f7f7f7;
  }
`;

const SmallText = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  color: #555;
  margin-bottom: 1rem;
  text-align: center;
`;

const LinkText = styled.span`
  color: #2575fc;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// Login Component
export default function Login() {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // Make the API call to login endpoint
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // Save JWT token
      localStorage.setItem('token', data.token);
      alert('Login successful!');

      // Fetch protected route data
      try {
        const protectedResponse = await fetch('http://localhost:5000/protected-route', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (protectedResponse.ok) {
          const protectedData = await protectedResponse.json();
          console.log('Protected route data:', protectedData);
          // Handle protected data (e.g., display it, store it, etc.)
        } else {
          console.error('Failed to fetch protected data.');
          alert('Failed to fetch protected data.');
        }
      } catch (error) {
        console.error('Error fetching protected route:', error);
      }

      // Redirect to dashboard
      navigate('/homepage');
    } else {
      alert(data.message || 'Login failed!');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred. Please try again.');
  }
};


  const handleGoogleLogin = () => {
    // Redirect to your backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Log In</Title>
        <SmallText>Welcome back</SmallText>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <GoogleButton onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/color/20/google-logo.png" alt="Google" />
          Log In with Google
        </GoogleButton>
        <SmallText>
          Forgot your password?{' '}
          <LinkText onClick={() => alert('Reset password feature coming soon!')}>Reset Here</LinkText>
        </SmallText>
        <SmallText>
          Don't have an account?{' '}
          <LinkText onClick={() => navigate('/signup')}>Sign Up</LinkText>
        </SmallText>
      </FormWrapper>
    </Container>
  );
}
