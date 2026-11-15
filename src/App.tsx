import { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { siteData } from '../data/site.js';
import { GlobalCanvas } from './components/background/GlobalCanvas';
import { SiteLayout } from './components/layout/SiteLayout';
import { CinematicPreloader } from './components/preloader/CinematicPreloader';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { MenuPage } from './pages/MenuPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PreparedPage } from './pages/PreparedPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { VisitContactPage } from './pages/VisitContactPage';

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleRevealStart = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsRevealed(true);
    setShowPreloader(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        {showPreloader && (
          <CinematicPreloader
            onRevealStart={handleRevealStart}
            onComplete={handlePreloaderComplete}
          />
        )}
        <GlobalCanvas />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage isRevealed={isRevealed} />} />
            <Route
              path="/about"
              element={<PreparedPage {...siteData.pages.about} />}
            />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route
              path="/private-dining"
              element={<PreparedPage {...siteData.pages.privateDining} />}
            />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route
              path="/visit"
              element={
                <VisitContactPage
                  eyebrow={siteData.pages.visit.eyebrow}
                  title={siteData.pages.visit.title}
                  summary={siteData.pages.visit.summary}
                />
              }
            />
            <Route
              path="/faq"
              element={<PreparedPage {...siteData.pages.faq} />}
            />
            <Route
              path="/gift-cards"
              element={<PreparedPage {...siteData.pages.giftCards} />}
            />
            <Route
              path="/careers"
              element={<PreparedPage {...siteData.pages.careers} />}
            />
            <Route
              path="/contact"
              element={
                <VisitContactPage
                  eyebrow={siteData.pages.contact.eyebrow}
                  title={siteData.pages.contact.title}
                  summary={siteData.pages.contact.summary}
                />
              }
            />
            <Route
              path="/privacy"
              element={<PreparedPage {...siteData.pages.privacy} />}
            />
            <Route
              path="/terms"
              element={<PreparedPage {...siteData.pages.terms} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
