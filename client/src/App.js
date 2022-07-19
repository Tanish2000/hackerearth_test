import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Home from './components/Home';
import AddCard from './components/AddCard';
import CardShow from './components/CardShow';
import Edit from "./components/Edit"

const styles = {
  bgcolor: '#cfe8fc',
  minHeight: '100vh',
  padding : '5px',
}

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters={true} sx={styles}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/show/:id' element={<CardShow />} exact />
            <Route path='/new' element={<AddCard />} exact />
            <Route path='/:id/edit' element={<Edit />} exact />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
