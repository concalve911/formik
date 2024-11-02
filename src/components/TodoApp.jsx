import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default () => {
  const [todos, setTodos] = useState([]);

  const validateTodo = (values) => {
    const errors = {};
    if (!values.todo) {
      errors.todo = "this field is empty";
    } else if (values.todo.length < 5) {
      errors.todo = "min lenght is 5 numbers";
    }
    return errors;
  };

  const addTodo = (values, { resetForm }) => {
    setTodos([...todos, values.todo]);
    resetForm();
  };

  const removeTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="todo">
      <h1>TODO List</h1>
      <Formik
        initialValues={{ todo: "" }}
        validate={validateTodo}
        onSubmit={addTodo}
      >
        {() => (
          <Form>
            <Field
              name="todo"
              placeholder="Enter your task"
              className="todo__input"
            />
            <ErrorMessage name="todo" component="div" className="todo__error" />
            <button type="submit" className="todo__button">
              ADD
            </button>
          </Form>
        )}
      </Formik>
      <ul className="todo__list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              onClick={() => removeTodo(index)}
              className="todo__delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
