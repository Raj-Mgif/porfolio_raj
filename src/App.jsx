import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Roles from './components/Roles/Roles';
import TypographyCollage from './components/Roles/TypographyCollage';
import Work from './components/Work/Work';
import Skills from './components/Skills/Skills';
import Achievement from './components/Achievement/Achievement';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/Cursor/CustomCursor';
import GeminiChat from './components/GeminiChat/GeminiChat';

function App() {
  return (
    <Router>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Roles />
        <TypographyCollage />
        <Work />
        <Skills />
        <Achievement />
        <Contact />
      </main>
      <Footer />
      <GeminiChat />
    </Router>
  );
}

export default App;
