import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import FlashMsg from './FlashMsg'


const Home = ({ currUser, flashMsg }) => {

    return (
        currUser.username !== '' ? (
            <div>
                {flashMsg.for === 'home' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> : null}
                <Card className='mx-auto col-10'>
                    <CardBody className='col-8 mx-auto'>
                        <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                            Hello, {currUser.username.charAt(0).toUpperCase() + currUser.username.slice(1)}
                        </CardTitle>
                            With hundreds of companies and jobs to browse from we're confident you will find something that works for you!
                    </CardBody>
                </Card>            
            </div>
        ) : (
            <section>
                {flashMsg.for === 'logout' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg} /> : null}

                <Card className='mx-auto col-10'>
                    <CardBody className='col-8 mx-auto'>
                        <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                            Welcome to Jobly!
                        </CardTitle>
                        <p>Please login or create an account below</p>
                        <Link to='/Login'>
                            <Button 
                                className='login-btn col-5 my-2 me-2' 
                                color="primary" 
                                size='lg'
                                outline
                            >Login</Button>
                        </Link> 
                        <Link to='/Signup'>
                            <Button 
                                className='login-btn col-5 my-2 ms-2' 
                                color="success" 
                                size='lg'
                                outline
                            >Register</Button>
                        </Link>
                    </CardBody>
                </Card>
            </section>
        )
    )
}

export default Home