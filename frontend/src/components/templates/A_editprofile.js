import React, {Component} from 'react';
import axios from 'axios';


export default class EditA extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            username: this.props.location.state.username,
            id: this.props.location.state.id,
            institutionName: this.props.location.state.institutionName,
            startYear: this.props.location.state.startYear,
            endYear: this.props.location.state.endYear,
            skills:this.props.location.state.skills
        }
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeinstitutionName = this.onChangeinstitutionName.bind(this);
        this.onChangestartYear = this.onChangestartYear.bind(this);
        this.onChangeendYear = this.onChangeendYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeusername(event) {
        this.setState({ username: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeinstitutionName(event) {
        this.setState({ institutionName: event.target.value });
    }
    onChangestartYear(event) {
        this.setState({ startYear: event.target.value });
    }
    onChangeendYear(event) {
        this.setState({ endYear: event.target.value });
    }
    onChangeskills(event) {
        this.setState({ skills: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            institutionName: this.state.institutionName,
            startYear: this.state.startYear,
            endYear: this.state.endYear,
            skills: this.state.skills,
        }
        console.log(edit);
        let token = localStorage.getItem('token');
        console.log(token);
        // console.log(edit);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }   

        axios.post('http://localhost:4000/recruiters/recruiterprofile/edit', edit, {headers: headers})
            .then(response => {
                console.log(response.data.message);
                this.props.history.push("/");
                window.location.reload();
            })
            .catch(err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
                console.log(err.response);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeusername}
                               />  
                         <label>Email-ID: </label>
                        <input type="string" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               /> 
                         <label>Institution Name: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.institutionName}
                               onChange={this.onChangeinstitutionName}
                               /> 
                         <label>Start Year </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.startYear}
                               onChange={this.onChangestartYear}
                               /> 
                         <label>End Year </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.endYear}
                               onChange={this.onChangeendYear}
                               />
                         <label>Skills </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.skills}
                               onChange={this.onChangeskills}
                               /> 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Profile" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}