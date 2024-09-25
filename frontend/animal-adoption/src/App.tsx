// src/App.tsx or wherever you define your routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalForm from './Components/FormTest';
import MedicalForm from './Components/FormTestMedical';
import AnimalDetails from './Components/AnimalPage';
import AnimalsList from './Components/List';
import FormUpdate from './Components/FormUpdate';
import Navbar from './Components/Navbar';

const App = () => (
  <>

    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-animal" element={<AnimalForm onSuccess={() => console.log("Success")} />} />
        <Route path="/animals/:id" element={<MedicalForm onSuccess={() => console.log("Success Medical")} />} />
        <Route path="/" element={<AnimalsList />} />
        <Route path='/:id' element={<AnimalDetails />} />
        <Route path='/update-form/:id' element={<FormUpdate onSuccess={() => console.log("Success Update")} />} />
        {/* Other routes */}
      </Routes>
    </Router>
  </>
);

export default App