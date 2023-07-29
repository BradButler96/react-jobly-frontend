import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home'
import NewUser from './NewUser'
import UserLogin from './UserLogin'
import UserLogout from './UserLogout'
import Profile from './Profile'
import JobsList from './JobsList'
import CompaniesList from './CompaniesList'
import Company from './Company'

const RoutesList = ({ register, login, logout, editUser, currUser, flashMsg, setFlashMsg, apply }) => {
    return (
            <Routes>
                <Route exact={true} path="/" element={<Home 
                                                        currUser={currUser} 
                                                        flashMsg={flashMsg} 
                                                      />} />
      
                <Route exact={true} path="/Signup" element={<NewUser 
                                                                register={register} 
                                                                currUser={currUser} 
                                                                flashMsg={flashMsg} 
                                                            />} />
    
                <Route exact={true} path="/Login" element={<UserLogin  
                                                                currUser={currUser} 
                                                                login={login} 
                                                                flashMsg={flashMsg} 
                                                            />} />
                
                <Route exact={true} path="/Logout" element={<UserLogout logout={logout} />} />

                <Route exact={true} path="/Profile" element={<Profile 
                                                                editUser={editUser}
                                                                currUser={currUser} 
                                                                flashMsg={flashMsg} 
                                                            />} />

                <Route exact={true} path="/Jobs" element={<JobsList 
                                                            currUser={currUser} 
                                                            apply={apply}
                                                            flashMsg={flashMsg} 
                                                          />} />
                <Route exact={true} path="/Companies" element={<CompaniesList
                                                                    flashMsg={flashMsg} 
                                                                    setFlashMsg={setFlashMsg}
                                                                />} />
                <Route exact={true} path="/Companies/:id" element={<Company 
                                                                        currUser={currUser} 
                                                                        apply={apply}
                                                                     />} />
                <Route exact={true} path="*" element={<Navigate to='/' />} />
            </Routes>
      );
}

export default RoutesList