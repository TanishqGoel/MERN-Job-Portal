import React, {Component} from 'react';
import axios from 'axios';


export default class Edit extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            username: this.props.location.state.username,
            id: this.props.location.state.id,
            email: this.props.location.state.email,
            Bio: this.props.location.state.Bio,
            contactNumber:this.props.location.state.contactNumber
        }
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangecontactNumber = this.onChangecontactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeusername(event) {
        this.setState({ username: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeBio(event) {
        this.setState({ Bio: event.target.value });
    }
    onChangecontactNumber(event) {
        this.setState({ contactNumber: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            username: this.state.name,
            email: this.state.email,
            contactNumber: this.state.contact,
            Bio: this.state.bio,
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
                         <label>Contact: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.contactNumber}
                               onChange={this.onChangecontactNumber}
                               /> 
                         <label>Bio: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.Bio}
                               onChange={this.onChangeBio}
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