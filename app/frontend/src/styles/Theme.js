// Defines the visual theme for the application using Styled Components' ThemeProvider

export const theme = {
  colors: {
    primary: '#5A4B3A', // Muted, earthy brown
    secondary: '#8c7d6b', // Softer brown
    accent: '#A4B892', // Muted green
    background: '#F5F2ED', // Soft cream/off-white
    surface: '#FFFFFF',
    text: '#3D352E', // Dark charcoal/brown for text
    subtleText: '#8c7d6b',
    border: '#D4C9B8', // Light, earthy border color
    error: '#C75D5D',
  },
  fonts: {
    heading: "'Lora', serif",
    body: "'Montserrat', sans-serif",
  },
  fontSizes: {
    small: '0.875rem',  // 14px
    medium: '1rem',      // 16px
    large: '1.25rem',    // 20px
    xlarge: '1.75rem',   // 28px
    xxlarge: '2.5rem',   // 40px
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },
  shadows: {
    soft: '0 4px 6px rgba(0, 0, 0, 0.05)',
    medium: '0 8px 15px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: '8px',
  transition: 'all 0.3s ease-in-out',
};