import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {SignIn} from './pages/SignIn'
import {SignUp} from './pages/SignUp'
import {Navbar} from './components/Navbar'
import {Fandom} from './components/Fandom'
import {AddFanFic} from './components/AddFanFic'
import {FanFicPage} from './pages/FanFicPage'

export const useRoutes = isAuthenticated => {
  // if (isAuthenticated) {
  //   return (
  //     <Switch>
  //       <Route path="/list" exact>
        
  //       </Route>
  //       <Redirect to="/list" />
  //     </Switch>
  //   )
  // }
  return (
    <>
    <Switch>
      <Route path="/addFanFic" exact>
        <AddFanFic />
      </Route>
      <Route path="/fanfic/:id" component={FanFicPage} exact>
      </Route>
      <Route path="/login" exact>
        <SignIn />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>      
      <Route path="/" exact>
        <Fandom />
      </Route>
      <Redirect to="/" />
    </Switch>
    </>
  )
}