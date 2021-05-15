import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

export default class RListings extends Component {
    
    constructor(props) {
        super(props);
        this.deleteJob = this.deleteJob.bind(this)
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
        axios.get('http://localhost:4000/recruiters/job/view', { headers: headers} )
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


    deleteJob(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/recruiters/job/delete/',{'id': id}, {headers: headers})
          .then(response => { console.log(response.data)});
    
        this.setState({
          listings: this.state.listings.filter(el => el._id !== id)
        })
    }

    deleteJob = this.deleteJob;

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Number of Applicants</th>
                            <th>Number of Positions </th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((job, i) => {
                            let left = 0;
                            // if(product.quantity > product.no_orders) left = product.quantity - product.no_orders; 
                            // else left = 0;
                            return (
                                <tr key={i} deleteJob = {this.deleteJob}>
                                    <td>{job.jobName}</td>
                                    <td>{job.Max_Applications} </td>
                                    <td>{job.Max_Positions} </td>
                                    <td> <Button variant="danger" onClick={() => {this.deleteJob(job._id) }}>Delete</Button></td>
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