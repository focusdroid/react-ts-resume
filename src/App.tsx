import React  from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
function App(props: any) {
  return <div className="apps">
    <Outlet />
  </div>
}

export default App;
