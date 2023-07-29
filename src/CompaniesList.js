import { useState, useEffect } from "react";
import JoblyApi from './JoblyApi'
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { v4 as uuid } from 'uuid';
import FlashMsg from './FlashMsg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'




const CompaniesList = ({ flashMsg, setFlashMsg }) => {
    const initialState = {
        name: '',
        minEmployees: '',
        maxEmployees: ''
    }

    const [formData, setFormData] = useState(initialState);
    const [companies, setCompanies] = useState([])

    const toggleFilters = () => {
        const moreFilters = document.getElementById('numEmp-container')
        moreFilters.style.display === 'none' ? 
        moreFilters.style.display = '' : 
        moreFilters.style.display = 'none'
    }

    const search = async (filters) => {
        try {
            if (filters.name === '') delete filters.name
            if (filters.minEmployees === '') delete filters.minEmployees
            if (filters.maxEmployees === '')  delete filters.maxEmployees

            const res = await JoblyApi.filterCompanies(filters)
            res.length > 0 ? setCompanies(res) : setCompanies(companies)

            setFlashMsg({
                text: '',
                type: '',
                for: ''
            })
        } catch (err) {
            console.error(err)
            setFlashMsg({
                text: err[0],
                type: 'danger',
                for: 'compList'
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        search(formData)
        setFormData(initialState)
    }

    useEffect(() => {
        const getCompaniesList = async () => {
            const res = await JoblyApi.request('companies')
            setCompanies(res.companies)
        };
        getCompaniesList()
    }, [])
    
    return (
        <div>
            {flashMsg.for === 'compList' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> : null}
            <div className='filters-container'>

                <form className="form col-6 mx-auto" onSubmit={handleSubmit}>

                    <div className='name-container mt-5 mb-3'>
                        <input 
                            type='text'
                            name='name'
                            className="col-10 input-lg d-inline"
                            value={formData.name || ''}
                            onChange={handleChange}
                        />
                        <Button 
                            className="d-inline px-2"
                            size='sm'
                            color='none'
                            type='submit'
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                        <Button 
                            className='d-inline px-2' 
                            type='button' 
                            color='none'
                            onClick={(() => toggleFilters())}
                        >
                        <FontAwesomeIcon icon={faFilter} />
                    </Button>
                    </div>
                    

                    <div id='numEmp-container' className='text-center mb-4' style={{display: 'none'}}>
                        <h5 className='mx-auto'>Employee Count:</h5>
                        <div className='d-flex justify-content-center'>
                            <input 
                                type='number'
                                name='minEmployees'
                                className="col-1"
                                value={formData.minEmployees || ''}
                                onChange={handleChange}
                            />
                            <div className='d-inline'>
                                <p className='d-inline mx-3'> - </p>
                            </div>
                            <input 
                                type='number'
                                name='maxEmployees'
                                className="col-1"
                                value={formData.maxEmployees || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
            </div>

            
            <ul style={{listStyleType: 'none', padding: 0}}>
                {companies.length === 0 ? null 
                : companies.map(c => {
                    return (
                        <li className='mx-auto' key={uuid()}>
                            <Card className='mx-auto my-5 col-7'>
                                <CardBody className='col-8 mx-auto'>
                                    <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                                        <Link to={`/companies/${c.handle}`} style={{ textDecoration: 'none', color: 'black' }}>{c.name}</Link>
                                    </CardTitle>
                                    <CardText>
                                        Total Employees: {c.numEmployees}              
                                    </CardText>
                                </CardBody>
                            </Card>
                        </li>
                    )
                })}
            </ul>


        </div>
    )
}

export default CompaniesList