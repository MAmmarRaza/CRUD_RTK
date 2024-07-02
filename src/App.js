import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import About from './component/About';
import NewNotes from './component/NewNotes';


function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Users />} /> */}
          {/* <Route exact path="/create" element={<InsertUsers />} /> 
          <Route exact path="/update/:id" element={<UpdateUsers />} />  */}
          {/* <Route exact path="/" element={<About />} /> */}
          <Route exact path="/" element={<NewNotes />} />
          {/* <Route exact path="/about" element={<About />} /> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
