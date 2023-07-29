import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import FlashMsg from './FlashMsg'
import ProfileEditForm from './ProfileEditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


const Profile = ({ editUser, currUser, flashMsg }) => {

    const toggleForm = () => {
        const formContainer = document.getElementById('form-container')
        formContainer.style.display === 'none' ? 
        formContainer.style.display = '' : 
        formContainer.style.display = 'none'

        const infoContainer = document.getElementById('info-container')
        infoContainer.style.display === 'none' ? 
        infoContainer.style.display = '' : 
        infoContainer.style.display = 'none'
    }

    
    
    return (
        <div>
            {flashMsg.for === 'edited' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> : null}
            <Card className='mx-auto col-10'>
                <span className='text-end'>
                    <Button
                        className="edit-profile-btn"
                        size='sm'
                        color='none'
                        onClick={() => toggleForm()}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </span>

                <CardBody className='col-10 mx-auto'>
                    <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                        {currUser.username}
                    </CardTitle>
                    <div id='info-container' className='text-start'>
                        <p><b>Username:</b> {currUser.username}</p>
                        <p><b>Name:</b> {currUser.firstName} {currUser.lastName}</p>
                        <p><b>Email:</b> {currUser.email}</p>   
                    </div>
                    
                    <div id='form-container' style={{display: 'none'}}>
                        <ProfileEditForm currUser={currUser} editUser={editUser} toggleForm={toggleForm} />
                    </div>
                </CardBody>
            </Card>   
        </div>
    )
}

export default Profile