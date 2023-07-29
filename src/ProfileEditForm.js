import React, { useState } from "react";
import { Button } from "reactstrap";


const ProfileEditForm = ({ currUser, editUser, toggleForm }) => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
    }
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editUser({ 
            info: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            } 
        });
        toggleForm()
        setFormData(initialState)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
             <div className='form-label-container text-start mt-4 row'>
                <div className='form-label-input-container text-start col-6'>
                    <div className='form-input-container col-11 d-flex'>
                        <label className="h5 me-auto" htmlFor='firstName'>
                            First Name
                        </label>
                    </div>
                    <div className='form-input-container col-12 d-flex'>
                        <input 
                            type='text'
                            name='firstName'
                            className="col-11 input-lg me-auto"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='form-label-input-container text-start col-6 ms-auto'>
                    <div className='form-input-container col-11 d-flex ms-auto'>
                        <label className="col-12 h5" htmlFor='lastName'>
                            Last Name
                        </label>
                    </div>
                    <div className='form-input-container col-12 d-flex ms-auto'>
                        <input 
                            type='text'
                            name='lastName'
                            className="col-11 input-lg ms-auto"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className='form-input-container text-start my-4'>
                <label className="col-12 h5" htmlFor='email'>
                    Email
                </label>
                <input 
                    type='email'
                    name='email'
                    className="col-12 input-lg me-auto"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </div>
        
            <Button 
                className='edit-btn col-4 me-4 my-2' 
                color="success" 
                size='lg'
                outline
            >Submit</Button>
            <Button 
                className='cancel-btn col-4 ms-4 my-2' 
                color="danger" 
                size='lg'
                outline
                onClick={() => toggleForm()}
            >Cancel</Button>
        </form>
    )
}

export default ProfileEditForm