/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactLenis } from 'lenis/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SignatureIntroduction } from './components/SignatureIntroduction';
import { TheBlueberrysWorld } from './components/TheBlueberrysWorld';
import { MenuSection } from './components/MenuSection';
import { CafeExperience } from './components/CafeExperience';
import { FloralGarden } from './components/FloralGarden';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AtmosphericParticles } from './components/AtmosphericParticles';
import { CinematicSection } from './components/CinematicSection';
import { TransitionProvider } from './context/TransitionContext';
import { Preloader } from './components/Preloader';

export default function App() {
  return (
    <ReactLenis root>
      <TransitionProvider>
        <div className="bg-cafe-ivory min-h-screen text-cafe-text font-sans">
          
          <Preloader />
          <CustomCursor />
          <AtmosphericParticles />
          <Navigation />
          
          <main>
            <Hero />
            <CinematicSection>
              <SignatureIntroduction />
            </CinematicSection>
            <CinematicSection>
              <TheBlueberrysWorld />
            </CinematicSection>
            <CinematicSection>
              <MenuSection />
            </CinematicSection>
            <CafeExperience />
            <CinematicSection>
              <FloralGarden />
            </CinematicSection>
            <CinematicSection>
              <LocationSection />
            </CinematicSection>
          </main>
          <Footer />
        </div>
      </TransitionProvider>
    </ReactLenis>
  );
}
