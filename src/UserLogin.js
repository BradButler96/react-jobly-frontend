import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import LoginForm from './LoginForm'
import FlashMsg from './FlashMsg'


const UserLogin = ({ currUser, login, flashMsg }) => {
    return (
        currUser.username !== '' ? <Navigate to='/' /> : (
            <div>
                {flashMsg.for === 'login' || flashMsg.for === 'logout' ? 
                <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> 
                : null}
   
                <Card className='mx-auto col-10'>
                    <CardBody className='col-8 mx-auto'>
                        <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                            Login Below:
                        </CardTitle>
                        <LoginForm login={login} />    
                        <Link to='/SignUp'><small>Need an account? Register here!</small></Link>
                    </CardBody>
                </Card>  
            </div>
        )
    )
}

export default UserLogin