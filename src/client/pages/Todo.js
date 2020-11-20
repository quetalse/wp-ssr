import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
// import { sagaFetchTodos } from "../../store/actions/todos";

const Todo = ({todos}) => {
    console.log('todos', todos)
    const dispatch = useDispatch();

    return (
        <div>
        <h1>Todo</h1>
        <Link to="/">Home</Link>
        <br/>
        // <button type='button' onClick={()=> {}}>Get</button>
        <br/>
        {todos.data.map(todo => (
            <p key={todo.id}>{todo.title}</p>
        ))}
    </div>
)
}

const mapStateToProps = state => ({
    todos: state.todos
});

// const mapDispatchToProps = {sagaFetchTodos}

export default {
    component: connect(mapStateToProps, null)(Todo)
}