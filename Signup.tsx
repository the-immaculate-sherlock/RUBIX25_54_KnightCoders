import React, { useState } from 'react';
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
  border: 5px solid #ddd;
  border-radius: 40px;
  box-shadow: 10px 15px 20px rgba(119, 141, 169, 1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-family: Tahoma;
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
  border-radius: 25px;
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
  text-align: center;
  margin-bottom: 1rem;
`;

const LinkText = styled.span`
  color: #2575fc;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// SignUp Component
function SignUp() {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make the API call to signup endpoint
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful! You can now log in.');
        navigate('/login'); // Redirect to login page
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignup = () => {
    // Redirect to your backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign Up Now</Title>
        <SmallText>Let's get you started!</SmallText>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
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
          <Input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <GoogleButton onClick={handleGoogleSignup}>
          <img src="https://img.icons8.com/color/20/google-logo.png" alt="Google" />
          Sign Up with Google
        </GoogleButton>
        <SmallText>
          Already have an account?{' '}
          <LinkText onClick={() => navigate('/login')}>Log In</LinkText>
        </SmallText>
      </FormWrapper>
    </Container>
  );
}

export default SignUp;
