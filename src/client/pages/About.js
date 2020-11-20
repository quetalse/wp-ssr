import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

const About = ({hello, setHello}) => {

    const request = async () => {
        const response = await axios.get('http://jsonplaceholder.typicode.com/photos');
        console.log(response)
    }

    return (
        <div>
            <h1>About</h1>
            <Link to="/">Home</Link>
            <br/>
            {hello}
            <button type="button" onClick={() => request()}>Hello</button>
        </div>
    )
}

const mapStateToProps = state => ({
    hello: state.hello
});

const mapDispatchToProps = {}

export default {
    component: connect(mapStateToProps,mapDispatchToProps)(About)
}