import { useState, useEffect } from "react";
import { useParams, Link  } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, CardLink, CardImg, Button } from "reactstrap";
import JoblyApi from './JoblyApi'


const Job = () => {
    const { id } = useParams()

    const [jobInfo, setJobInfo] = useState([])

    useEffect(() => {
        const getJobInfo = async () => {
            const res = await JoblyApi.getJob(id)
            console.log(res)
            setJobInfo(res)
        };
        getJobInfo()
    }, [])

    return (
        
        <>{jobInfo.length === 0 ? null : (
        <Card className='mx-auto col-10'>
            <CardBody className='col-8 mx-auto'>
                <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                    {jobInfo.title}
                </CardTitle>
                <CardText style={{ fontSize: 'x-large'}}>
                    Company: <Link to={`/Companies/${jobInfo.company.handle}`} style={{ textDecoration:'none', color: 'black' }}>
                        {jobInfo.company.name}
                    </Link>
                </CardText>
                {jobInfo.salary != null ? <p className='salary-p'>Salary: ${jobInfo.salary}</p> : <p>Salary: N/A</p>}
                {jobInfo.equity != null ? <p className='equity-p'>Equity: {jobInfo.equity}%</p> : <p>Equity: N/A</p>}
            </CardBody>
        </Card>
        )}</>
    )
}

export default Job