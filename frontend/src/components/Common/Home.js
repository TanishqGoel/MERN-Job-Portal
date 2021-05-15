import React, {Component} from 'react';
// import axios from 'axios';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Welcome to Adept!
           </div>
        )
    }
}