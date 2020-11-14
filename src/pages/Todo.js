import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import { requestTodos } from "../store/actions";

const Todo = ({todos}) => {

    // console.log('INSIDE TODO')
    // console.log('todos todos', todos)
    //
    // useEffect(() => {
    //     console.log('INSIDE TODO')
    //     // fetchTodos();
    // },[])


    const dispatch = useDispatch();

    return (
        <div>
        <h1>Todo</h1>
        <Link to="/">Home</Link>
        <br/>
        // <button type='button' onClick={()=> dispatch(requestTodos())}>Get</button>
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



const mapDispatchToProps = {requestTodos}

export default {
    component: connect(mapStateToProps,mapDispatchToProps)(Todo)
}