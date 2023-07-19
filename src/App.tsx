import React, { FC } from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

const TopPage: FC = () => {
  return <h1>TopPage</h1>;
};
const About: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>About</h1>
      <button onClick={() => navigate(-1)}>戻る</button>
    </>
  );
};
const Page404: FC = () => {
  return <h1>404</h1>;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li>
            <NavLink to="/">Top</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
