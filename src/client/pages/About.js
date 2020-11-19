import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const About = ({hello, setHello}) => {
    return (
        <div>
            <h1>About</h1>
            <Link to="/">Home</Link>
            <br/>
            {hello}
            <button type="button" onClick={() => console.log('about page')}>Hello</button>
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