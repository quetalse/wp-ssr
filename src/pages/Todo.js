import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchTodos } from "../store/actions";

const Todo = ({fetchTodos, todos}) => {

    useEffect(() => {
        fetchTodos();
    },[])

    return (
        <div>
        <h1>Todo</h1>
        <Link to="/">Home</Link>
        <br/>
        // <button type='button' onClick={()=> fetchTodos()}>Get</button>
        <br/>
        {todos.map(todo => (
            <p key={todo.id}>{todo.title}</p>
        ))}
    </div>
)
}

const mapStateToProps = state => ({
    todos: state.todos
});



const mapDispatchToProps = {fetchTodos}

export default {
    component: connect(mapStateToProps,mapDispatchToProps)(Todo)
}