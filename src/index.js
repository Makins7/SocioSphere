import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/js/all';
import Home from './pages/Home';
import { Container } from 'reactstrap';
import Navigation from './components/Navigation';
import GalleryComponent from './news-feed/GalleryComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SocialReducer from './redux/SocialReducer';
import Login from './pages/Login';
import { combineReducers } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css'; // install bootstrap



const MyStore = createStore(
  // 1st argument: Reducer(s)
  SocialReducer,
  
  /* combineReducers({
  //   user: UserReducer,
  //   comment: CommentReducer
   })*/
  // 2nd argument: Enhancers/Middleware
  {}
);

/*
  View -> Action -> Dispatcher -> Middleware -> [Reducer -> State]
  [] = Store
*/

// Start the React Root
// creating a container to start our React Tree
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <Provider store={MyStore}>
    <BrowserRouter>
      <Navigation />
      <Container className="mt-2">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<GalleryComponent />} /> {/* Each route represents a unique page on your site */}
        </Routes>

      </Container>
    </BrowserRouter>
  </Provider>
);
