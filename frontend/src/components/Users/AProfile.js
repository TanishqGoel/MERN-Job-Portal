import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


export default class ApplicantProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {profile: []};
        
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        // console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    

        axios.get('http://localhost:4000/applicants/' ,{ headers: headers} )
             .then(response => {
                //  console.log("hey");
                // console.log(response.data)
                this.setState({profile: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }

    render() {
        let user = localStorage.getItem('user_name');
        return (
            <div>
                <h2>{user}'s Profile:</h2>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Institution Name</th>
                            <th>Start Year</th>
                            <th>End Year</th>
                            <th>Skillset</th>
                            <th>Edit</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.profile.map((ApplicantProfile, i) => {          
                            return (
                                <tr key={i}>
                                    <td>{ApplicantProfile.username}</td>
                                    <td>{ApplicantProfile.email} </td>
                                    <td>{ApplicantProfile.institutionName} </td>
                                    <td>{ApplicantProfile.startYear} </td>
                                    <td>{ApplicantProfile.endYear} </td>
                                    <td>{ApplicantProfile.skills} </td>
                                    <th><Link to={{ pathname: './Applicantprofileedit', state: { 'id': ApplicantProfile._id, 
                                    'name':ApplicantProfile.name,'email':ApplicantProfile.email,'institutionName':ApplicantProfile.institutionName,
                                    'startYear':ApplicantProfile.startYear, 'endYear':ApplicantProfile.endYear,'sills':ApplicantProfile.skills} }}>Edit</Link></th>
        
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