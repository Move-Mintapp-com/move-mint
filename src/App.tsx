import { Suspense, lazy, useEffect, useState } from 'react';
import MoveMintSite from './site/MoveMintSite';

/* The public marketing site is what move-mintapp.com serves.
   The original in-app prototype is preserved at #app and is code-split, so
   visitors to the website never download it. */
const AppPrototype = lazy(() => import('./AppPrototype'));

const isAppRoute = () => window.location.hash.startsWith('#app');

export default function App() {
  const [showApp, setShowApp] = useState(isAppRoute);

  useEffect(() => {
    const sync = () => setShowApp(isAppRoute());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  if (showApp) {
    return (
      <Suspense fallback={null}>
        <AppPrototype />
      </Suspense>
    );
  }
  return <MoveMintSite />;
}
