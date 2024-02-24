import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import './app.css'

// Components
import StickyNavbar from './components/NavigationBar'
import Signin from './components/Signin';


export function App() {
  return (
    <>
    <Router>
      <StickyNavbar/>
      <Routes>
        <Route exact path='/signin' element={<Signin/>}/>
        <Route exact path='/hod' element={<>Hello Hod</>}/>
      </Routes>
    </Router>
    </>
  )
}
