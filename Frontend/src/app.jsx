import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

// import './app.css'

// Components
import StickyNavbar from './components/NavigationBar'
import Signin from './components/Signin';
import Rooms from './components/Rooms'
import HodPage from "./components/Hodpage";
import PrincipalPage from "./components/PrinciplePage";
import Commitee from "./components/Student";
import UpcomingEvents from "./components/UpcommingEvents";



export function App() {
  return (
    <>
    <Router>
      <StickyNavbar/>
      <Routes>
        <Route exact path='/signin' element={<Signin/>}/>
        <Route exact path='/hod' element={<HodPage/>}/>
        <Route exact path='/principle' element={<PrincipalPage/>}/>
        <Route exact path='/commitee' element={<Commitee/>}/>
        <Route exact path='/student' element={<>hello ji</>}/>
        <Route exact path='/upcomingevents' element={<UpcomingEvents/>}/>
        <Route exact path='/roombooking' element={<Rooms/>}/>
      </Routes>
    </Router>
    </>
  )
}
