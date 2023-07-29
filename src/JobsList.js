import { useState, useEffect } from "react";
import JoblyApi from './JoblyApi'
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import FlashMsg from './FlashMsg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


const JobsList = ({ currUser, apply, flashMsg }) => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const getJobList = async () => {
            const res = await JoblyApi.request('jobs')
            setJobs(res.jobs)
        };
        getJobList()
    }, [currUser.applications])

    return (
        <div>
            {flashMsg.for === 'apply' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> : null}
            <ul style={{listStyleType: 'none', padding: 0}}>
                {jobs.length === 0 ? null 
                : jobs.filter((e, i) => i <= 100).map(j => {
                    return (
                        <li key={uuid()}>
                            <Card className='mx-auto my-5 col-7'>
                                <CardBody className='col-8 mx-auto'>
                                <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                                    {j.title}
                                </CardTitle>
                                <CardText style={{ fontSize: 'x-large'}}>
                                    {j.companyName !== null ?
                                    <Link to={`/Companies/${j.companyHandle}`} style={{ textDecoration:'none', color: 'black' }}>
                                        {j.companyName}
                                    </Link>
                                    : null
                                    }
                                </CardText>
                                    {j.salary !== null ? <p className='salary-p'>Salary: ${j.salary}</p> : <p>Salary: N/A</p>}
                                    {j.equity !== null ? <p className='equity-p'>Equity: {j.equity}%</p> : <p>Equity: N/A</p>}

                                    {currUser.applications.indexOf(j.id) !== -1 
                                    ? <Button
                                        className="apply-btn col-6"
                                        size='lg'
                                        color='success'
                                        // outline
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
                        </li>)
                })}
            </ul>
        </div>
    )
}


export default JobsList
