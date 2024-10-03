// src/App.tsx or wherever you define your routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalForm from './Components/FormTest';
import AnimalDetails from './pages/AnimalPage';
import FormUpdate from './Components/FormUpdate';
import Navbar from './Components/Navbar';
import LoginPage from './Components/Login';
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