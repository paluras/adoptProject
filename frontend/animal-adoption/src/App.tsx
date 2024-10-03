// src/App.tsx or wherever you define your routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalForm from './components/FormComponents/FormTest';
import AnimalDetails from './pages/AnimalPage';
import FormUpdate from './components/FormComponents/FormUpdate';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import ListPage from './pages/ListPage';

const App = () => (
  <>

    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path="/add-animal" element={<AnimalForm />} />
        <Route path="/" element={<ListPage />} />
        <Route path='/:id' element={<AnimalDetails />} />
        <Route path='/update-form/:id' element={<FormUpdate onSuccess={() => console.log("Success Update")} />} />
        {/* Other routes */}
      </Routes>
    </Router>
  </>
);

export default App