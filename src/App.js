import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './NavBar'
import RoutesList from './RoutesList'
import useLocalStorage from './useLocalStorage'
import JoblyApi from './JoblyApi'

import './App.css';

function App() {
  const flashInitState = {
    text: '',
    type: '',
    for: ''
  }
  const userInitState = {
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: '',
    applications: []
  }

  const [flashMsg, setFlashMsg] = useState(flashInitState)
  const [localUser, setLocalUser] = useLocalStorage('user', userInitState)
  const [currUser, setCurrUser] = useState(localUser)
  const [applied, setApplied] = useState(localUser.applications)

  const register = async (userInfo) => {
    try{
      await JoblyApi.register(userInfo.user)
      const user = await JoblyApi.getUserInfo(userInfo.user.username)
      setLocalUser(user)

      setFlashMsg({
        text: `Welcome ${userInfo.user.username}`,
        type: 'success',
        for: 'home'
      })

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'registration'
      })
    }
  }

  const login = async (userInfo) => {
    try {

      await JoblyApi.login(userInfo.user)
      const user = await JoblyApi.getUserInfo(userInfo.user.username)

      setLocalUser(user)

      setFlashMsg({
        text: `Welcome ${userInfo.user.username}`,
        type: 'success',
        for: 'home'
      })

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'login'
      })
    }
  }

  const logout = async () => {

    await JoblyApi.logout()
    setLocalUser(userInitState)

    setFlashMsg({
      text: 'See you later!',
      type: 'info',
      for: 'logout'
    })
  }

  const editUser = async (edited) => {
    try{
      const newInfo = {}
      const currentInfo = await JoblyApi.getUserInfo(currUser.username)

      edited.info.firstName === '' ? newInfo['firstName'] = currentInfo.firstName : newInfo['firstName'] = edited.info.firstName
      edited.info.lastName === '' ? newInfo['lastName'] = currentInfo.lastName : newInfo['lastName'] = edited.info.lastName
      edited.info.email === '' ? newInfo['email'] = currentInfo.email : newInfo['email'] = edited.info.email

      const user = await JoblyApi.editProfile(currUser.username, newInfo)
      setLocalUser(user)

      setFlashMsg({
        text: 'Edits successfully submitted',
        type: 'success',
        for: 'edited'
      })
    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'edited'
      })
    }
  }

  const apply = async (id) => {
    try {
      await JoblyApi.apply(currUser.username, id)
      setApplied([id, ...applied])

    } catch (err) {
      let msg;
      err[0] === 'duplicate key value violates unique constraint "applications_pkey"' ||
      err[0] === "duplicate key value violates unique constraint \"applications_pkey\""
      ? msg = "You've already applied for this job" 
      : msg = err[0]

      setFlashMsg({
        text: msg,
        type: 'danger',
        for: 'apply'
      })
    }
  }

  useEffect(() => {
    const setState = () => {
      setCurrUser(localUser)
      JoblyApi.token = localUser.token
    }
    setState()
  }, [localUser])

  useEffect(() => {
    const setApplied = () => {
      setLocalUser({ ...localUser, applications: applied})
    }
    setApplied()
  }, [applied])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currUser={currUser} />
        <RoutesList 
          register={register}
          login={login}
          logout={logout}
          editUser={editUser}
          currUser={currUser} 
          flashMsg={flashMsg}
          setFlashMsg={setFlashMsg}
          apply={apply}
        /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
