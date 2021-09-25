/* Package Imports */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/navigation/header';
import Home from './container/home/home';
import Register from './container/register/register';
import { DataProvider } from './context/dataContext';


function App() {

  return (
    <BrowserRouter>
    <DataProvider>
    <Header/>
    <div className="container-fluid px-0 d-flex t-app-wrapper">
      <Home/>
      <Route path="/register" component={Register} exact/>
    </div>
    </DataProvider>
    </BrowserRouter>
  );
}

export default App;