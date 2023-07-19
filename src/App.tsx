import React, { FC, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

const TopPage: FC = () => {
  return (
    <>
      <SearchForm />
      <h1>top</h1>
    </>
  );
};

const SearchForm: FC = () => {
  const navigate = useNavigate();
  const inputElement = useRef<HTMLInputElement>(null);

  const onClickSearchButton = () => {
    if (inputElement != null) {
      const inputKeyword = inputElement.current;
      navigate(`/result/?q=${inputKeyword?.value}`);
    }
  };

  return (
    <div>
      <input type="text" ref={inputElement} />
      <button type="button" onClick={onClickSearchButton}>
        search
      </button>
    </div>
  );
};

const Result: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);

  return (
    <>
      <SearchForm />
      <div className="result">
        <h1>search result</h1>
        <p>q: {query.get('q')}</p>
        <button onClick={() => navigate('/')}>top</button>
      </div>
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
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/result/" element={<Result />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
