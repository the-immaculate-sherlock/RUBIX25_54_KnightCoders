import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Search, HelpCircle, User } from 'lucide-react';
import backgroundImage from './hfinal.jpg'; // Import your background image

export default function LandingPage() {
  return (
    <div style={styles.pageWrapper}>
      <Header showAuthButtons={true} />
      <main style={styles.mainContent}>
  <div style={styles.typewriterText}>
    Welcome to HomeHeaven!
  </div>
  <p style={styles.descriptionText}>
    Discover the best homes, housing programs, and government aid programs tailored to your needs.
  </p>
  <div style={styles.buttonContainer}>
    <Link to="/homepage" style={styles.getStartedButton}>
      Get Started
    </Link>
  </div>
</main>

      <section style={styles.featuresSection}>
  <div style={styles.featuresContainer}>
    <h2 style={styles.featuresHeading}>Features</h2>
    <div style={styles.featuresRow}>
      <FeatureCard
        title="Find Housing"
        description="Explore a variety of housing options that suit your budget and lifestyle."
        icon={<Search style={styles.featureIcon} />}
      />
      <FeatureCard
        title="Government Aid"
        description="Learn about programs and assistance available for affordable housing."
        icon={<HelpCircle style={styles.featureIcon} />}
      />
      <FeatureCard
        title="Personalized Dashboard"
        description="Access your saved searches, applications, and recommendations."
        icon={<User style={styles.featureIcon} />}
      />
    </div>
  </div>
</section>

      <footer style={styles.footer}>
        <p>© 2025 HomeHaven. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  pageWrapper: {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start', // Align to the left slightly
  textAlign: 'left',
  padding: '0 16px 0 48px', // Add more left padding to shift content slightly to the right
  },
  typewriterWrapper: {
    flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start', // Align to the left slightly
  textAlign: 'left',
  padding: '0 16px 0 48px', // Add more left padding to shift content slightly to the right
  
  },
  '@keyframes typing': {
    from: { width: '0' },
    to: { width: '100%' },
  },
  '@keyframes blink': {
    '50%': { borderColor: 'transparent' },
  },
  
  buttonContainer: {
    marginTop: '24px',
  },
  getStartedButton: {
    backgroundColor: '#0D1B2A',
    color: '#E0E1DD',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1B263B',
    },
  },
  featuresSection: {
    padding: '40px 16px',
  },
  featuresContainer: {
    maxWidth: '1120px',
    margin: '0 auto',
    textAlign: 'center',
  },
  featuresHeading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginBottom: '24px',
  },
  featuresRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    color: '#0D1B2A',
  },
  footer: {
    backgroundColor: '#E0E1DD',
    color: '#0D1B2A',
    padding: '16px',
    textAlign: 'center',
  },
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div style={styles.featureCard}>
    <div style={styles.featureIconContainer}>{icon}</div>
    <h3 style={styles.featureTitle}>{title}</h3>
    <p style={styles.featureDescription}>{description}</p>
  </div>
);

styles.featuresSection = {
  padding: '64px 16px',
  // backgroundColor: '#F0F4FA', // Light background color for the section
};

styles.featuresContainer = {
  maxWidth: '1120px',
  margin: '0 auto 0 0', // Align the container to the left
  textAlign: 'left',
  padding: '16px',
  // backgroundColor: '#FFFFFF', // Optional: Add a different background to the container
  borderRadius: '8px', // Add some rounding to the container
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
};

styles.featuresRow = {
  display: 'flex',
  justifyContent: 'flex-start', // Align boxes to the extreme left
  alignItems: 'flex-start',
  gap: '24px',
  flexWrap: 'wrap',
};

styles.featureCard = {
  padding: '24px',
  backgroundColor: '#D9E6F2', // Background color for individual cards
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  flex: '1 1 30%',
};




styles.featureIconContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
};

styles.featureTitle = {
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#0D1B2A',
  marginBottom: '8px',
};

styles.featureDescription = {
  color: '#0D1B2A',
};

styles.descriptionText = {
  color: '#0D1B2A',
  fontSize: '1.5rem',
  fontFamily: "'Poppins', sans-serif", // Clean and modern font
  marginTop: '24px',
  maxWidth: '48rem',
  lineHeight: '1.6', // Better readability
};
const globalStyles = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes moveIn {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
`;

// Add this dynamically to the document head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

styles.typewriterText = {
  fontSize: '5rem', // Increased font size
  fontWeight: 'bold',
  color: '#0D1B2A',
  fontFamily: "'Pacifico', cursive", // Stylish font
  animation: 'fadeIn 2s ease-out, moveIn 2s ease-in', // Animations for the text
};
