import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

const LoginPage = React.lazy(() => import('./pages/Login'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const AnimalForm = React.lazy(() => import('./pages/AnimalForm'));
const ListPage = React.lazy(() => import('./pages/ListPage'));
const AnimalDetails = React.lazy(() => import('./pages/AnimalPage'));
const FormUpdate = React.lazy(() => import('./components/FormComponents/FormUpdate'));
const LandingParallax = React.lazy(() => import('./components/Landing'))

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<span />}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path="/add-animal" element={<AnimalForm />} />
            <Route path="/" element={
              <ListPage>
                <LandingParallax />
              </ListPage>} />
            <Route path='/:id' element={<AnimalDetails />} />
            <Route path='/update-form/:id' element={<FormUpdate />} />

          </Routes>
          <Footer />
        </Suspense>
      </Router>

    </>
  );
}

export default App;