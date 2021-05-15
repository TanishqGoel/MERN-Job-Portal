import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            type: 'Applicant'
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password:this.state.password,
            type:this.state.type
        }
        axios.post('http://localhost:4000/users/register', newUser)
            //  .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
            //  ;
        if(this.state.type==="Applicant")
        {
            axios.post('http://localhost:4000/applicants/register', newUser)
             .then(res => {alert("Created\t" + res.data.username);console.log(res.data)})
             ;
        }
        else if(this.state.type==="Recruiter")
        {
            axios.post('http://localhost:4000/recruiters/register', newUser)
             .then(res => {alert("Created\t" + res.data.username);console.log(res.data)})
             ;
        }

        this.setState({
            username: '',
            email: '',
            password:'',
            type:'Applicant'
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select className="form-control" value={this.state.type} 
                               onChange={this.onChangeType}>
                                <option value ="Applicant">Applicant</option>
                                <option value ="Recruiter">Recruiter</option>
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}