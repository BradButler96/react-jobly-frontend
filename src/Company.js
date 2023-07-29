import { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import { Card, CardBody, CardTitle, CardImg, CardText, Button } from "reactstrap";
import JoblyApi from './JoblyApi'
import { v4 as uuid } from 'uuid';
import FlashMsg from './FlashMsg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


const Company = ({ currUser, apply }) => {
    const { id } = useParams()

    const [companyInfo, setCompanyInfo] = useState([])
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const getCompanyInfo = async () => {
            const res = await JoblyApi.getCompany(id)
            setCompanyInfo(res)

            const compJobs = await JoblyApi.getJobsByCompany(id)
            setJobs(compJobs)
        };
        getCompanyInfo()
    }, [])

    
    return (
        <>
        <Card className='mx-auto col-10'>
            <CardBody className='col-8 mx-auto'>
                <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                    {companyInfo.name}
                </CardTitle>
                <CardImg className='my-4' src={companyInfo.logoUrl} />
                <div className='company-info my-3'>
                    <div className='d-flex text-start'>
                        <p className='h4 d-inline my-auto'>Total Employees:</p>
                        <p className='h5 align-items-center d-inline ms-2 mb-0 mt-auto'>{companyInfo.numEmployees}</p>
                    </div>
                    <div className='d-flex row text-start'>
                        <p className='h4 mt-3'>About Us</p>
                        <p className='h6 col-12'>{companyInfo.description}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
        <ul style={{listStyleType: 'none', padding: 0}}>
            {jobs.length > 0 
            ? jobs.map((j) => {
                return (
                    <li key={uuid()}>
                        <Card className='mx-auto my-5 col-10'>
                            <CardBody className='col-8 mx-auto'>
                            <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                                {j.title}
                            </CardTitle>
                                {j.salary !== null ? <p className='salary-p'>Salary: ${j.salary}</p> : <p>Salary: N/A</p>}
                                {j.equity !== null ? <p className='equity-p'>Equity: {j.equity}%</p> : <p>Equity: N/A</p>}
                                {currUser.applications.indexOf(j.id) !== -1 
                                ? <Button
                                    className="apply-btn col-6"
                                    size='lg'
                                    color='success'
                                    disabled
                                ><FontAwesomeIcon icon={faCircleCheck} className='mx-1' /></Button>
                                : <Button
                                    className="apply-btn col-6"
                                    size='lg'
                                    color='primary'
                                    outline
                                    onClick={() => apply(j.id)}
                                >Apply</Button>}
                            </CardBody>
                        </Card>
                    </li>
                )
            }) 
            : <h2>No jobs available...</h2>}
        </ul>

        </>
    )
}

export default Company