    import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

export default class AListings extends Component {
    
    constructor(props) {
        super(props);
        this.state = {listings: []}
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log("First",token)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    
        console.log(headers['Authorization'])
        axios.get('http://localhost:4000/applicants/job/view', { headers: headers} )
             .then(response => {
                console.log(response.data)
                this.setState({listings: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }


    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Recruiter Name</th>
                            <th>Salary </th>
                            <th>Duration</th>
                            <th>Deadline of Application</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((job, i) => {
                            let left = 0;
                            // if(product.quantity > product.no_orders) left = product.quantity - product.no_orders; 
                            // else left = 0;
                            return (
                                <tr key={i}>
                                    <td>{job.jobName}</td>
                                    <td>{job.recruiter} </td>
                                    <td>{job.Salary} </td>
                                    <td>{job.Duration} </td>
                                    <td>{job.Deadline} </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}