import './App.css'
import { Nav } from './components/Nav';
import { Route, useLocation } from 'wouter';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { SearchLayout } from './components/SearchLayout';
import { OwnerLayout } from './components/OwnerLayout';
import { useState } from 'react';
import { FavouritesList } from './components/FavouritesList';
import { MataGatosProvider } from './context/mataGatosContext';
import { FavouritesOwnersProvider } from './context/favouritesOwnersContext';
import { ProLayout } from './components/ProLayout';

function App() {
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [location] = useLocation();

  // Función para obtener el título según la ruta actual
  const getPageTitle = () => {
    switch (location) {
      case '/owners':
        return 'Owners';
      case '/search':
        return 'Search';
      case '/pro':
        return 'Soy Pro';
      default:
        return 'Home';
    }
  };

  const handleShowFavoritesModal = () => {
    setShowFavoritesModal(true);
  };

  return (
    <MataGatosProvider>
      <FavouritesOwnersProvider>
        <main className="h-full min-h-screen flex flex-col font-monserrat">
          <Nav title={getPageTitle()}  showFavoritesModal={handleShowFavoritesModal} />
          {
            showFavoritesModal && (
              <FavouritesList onClose={() => setShowFavoritesModal(false)} />
            )
          }
            <Route path="/">
              <Home />
            </Route>
            <Route path="/search">
              <SearchLayout />
            </Route>
            <Route path="/owners">
              <OwnerLayout />
            </Route>
            <Route path="/pro">
              <ProLayout />
            </Route>
          <Footer />
        </main>
      </FavouritesOwnersProvider>
    </MataGatosProvider>
  )
}

export default App
