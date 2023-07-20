import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
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
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const [photoList, setPhotoList] = useState([]);
  const queryString = query.get('q')?.toString() || '';

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${queryString}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => setPhotoList(data.results));
  }, [queryString]);

  return (
    <>
      <SearchForm />
      <div className="result">
        <h1>search result, query: {queryString}</h1>
        <div className="photo-list">
          {photoList.map((photo: any) => (
            <a href={photo.links.html} key={photo.id}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </a>
          ))}
        </div>
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
