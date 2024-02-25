import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import { Signin } from './pages/Signin/Signin';
import { Signup } from './pages/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { Movie } from './pages/Movie/Movie';
import { Profile } from './pages/Profile/Profile';
import { Tickets } from './pages/Tickets/Tickets';
import { SearchMovie } from './pages/SearchMovie/SearchMovie';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/movie' element={<Movie/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/Tickets' element={<Tickets/>}></Route>
          <Route path='/search' element={<SearchMovie/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
