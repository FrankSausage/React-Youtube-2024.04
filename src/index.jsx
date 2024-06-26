import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import NotFound from './pages/NotFound';
import reportWebVitals from './reportWebVitals';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ProtectedRoute from './pages/ProtectedRoute';
import ViewRecord from './pages/ViewRecord';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children:[
      { index: true, element: <Videos /> },
      { path: 'videos', element: <Videos /> },
      { path: 'videos/:keyword', element: <Videos /> },
      { path: 'videos/watch/:videoId', element: <VideoDetail /> },
      { path: 'signUp', element: <SignUp /> },
      { path: 'signIn', element: <SignIn /> },
      { path: 'videos/record', element: <ProtectedRoute><ViewRecord /></ProtectedRoute> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
