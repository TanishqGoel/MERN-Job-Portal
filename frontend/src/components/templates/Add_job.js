import React, {Component} from 'react';
import axios from 'axios';

export default class AddJob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            jobName: '',
            Max_Applications:'',
            Max_Positions:'',
            Deadline:'',
            Posting:'',
            Skillset:'',
            Type_of_job:"Full-time",
            Duration:'',
            Salary: ''
        }
        this.onChangejobName = this.onChangejobName.bind(this);
        this.onChangeMax_Applications = this.onChangeMax_Applications.bind(this);
        this.onChangeMax_Positions = this.onChangeMax_Positions.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangePosting = this.onChangePosting.bind(this);
        this.onChangeSkillset = this.onChangeSkillset.bind(this);
        this.onChangeType_of_job = this.onChangeType_of_job.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangejobName(event) {
        this.setState({ jobName: event.target.value });
    }

    onChangeMax_Applications(event) {
        this.setState({ Max_Applications: event.target.value });
    }

    onChangeMax_Positions(event) {
        this.setState({ Max_Positions: event.target.value });
    }
    onChangeDeadline(event) {
        this.setState({ Deadline: event.target.value });
    }
    onChangePosting(event) {
        this.setState({ Posting: event.target.value });
    }
    onChangeSkillset(event) {
        this.setState({ Skillset: event.target.value });
    }
    onChangeType_of_job(event) {
        this.setState({ Type_of_job: event.target.value });
    }

    onChangeDuration(event) {
        this.setState({ Duration: event.target.value });
    }
    onChangeSalary(event) {
        this.setState({ Salary: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            jobName:this.state.jobName,
            Max_Applications:this.state.Max_Applications,
            Max_Positions:this.state.Max_Positions,
            Deadline:this.state.Deadline,
            Posting:this.state.Posting,
            Skillset:this.state.Skillset,
            Type_of_job:this.state.Type_of_job,
            Duration:this.state.Duration,
            Salary: this.state.Salary,
        }

        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        console.log(newJob);
        axios.post('http://localhost:4000/recruiters/job/add', newJob, {headers: headers})
            .then(res => 
                {
                    alert("Job successfully added");
                    console.log(res.data)
                })
            .catch(function(error) {
                if(error.response.data.message)
                    alert(error.response.data.message);
                console.log(error);
            })
        this.setState({
            jobName: '',
            Max_Applications:'',
            Max_Positions:'',
            Deadline:'',
            Skillset:'',
            Type_of_job:"Full-time",
            Duration:'',
            Salary: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.jobName}
                               onChange={this.onChangejobName}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Maximum Applications: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.Max_Applications}
                               onChange={this.onChangeMax_Applications}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Maximum Positions: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.Max_Positions}
                               onChange={this.onChangeMax_Positions}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="text" min="1"
                               className="form-control" 
                               value={this.state.Deadline}
                               onChange={this.onChangeDeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Posting: </label>
                        <input type="text" min="1"
                               className="form-control" 
                               value={this.state.Posting}
                               onChange={this.onChangePosting}
                               />  
                    </div>
                    <div className="form-group">
                        <label>SkillSets: </label>
                        <input type="text" min="1"
                               className="form-control" 
                               value={this.state.Skillset}
                               onChange={this.onChangeSkillset}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Type of Job: </label>
                        <select className="form-control" value={this.state.Type_of_job} 
                               onChange={this.onChangeType_of_job}>
                                <option value ="Full-time">Full-time</option>
                                <option value ="Part-time">Part-time</option>
                                <option value ="Work from Home">Work from Home</option>
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.Duration}
                               onChange={this.onChangeDuration}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.Salary}
                               onChange={this.onChangeSalary}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add listing" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}