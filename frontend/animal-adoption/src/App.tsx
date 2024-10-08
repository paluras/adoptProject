import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming this is your navbar component

// Lazy load components
const LoginPage = React.lazy(() => import('./pages/Login'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const AnimalForm = React.lazy(() => import('./pages/AddAnimalFormPage'));
const ListPage = React.lazy(() => import('./pages/ListPage'));
const AnimalDetails = React.lazy(() => import('./pages/AnimalPage'));
const FormUpdate = React.lazy(() => import('./components/FormComponents/FormUpdate'));


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

            <Route path="/" element={<ListPage />} />
            <Route path='/:id' element={<AnimalDetails />} />
            <Route
              path='/update-form/:id'
              element={<FormUpdate onSuccess={() => console.log("Success Update")} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;