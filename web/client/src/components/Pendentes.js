import React, { Fragment, useState, useEffect } from "react";


const Pendentes = () => {
  const [todos, setTodos] = useState([]);


  async function getTodos() {
    const res = await fetch("http://localhost:3000/todos");

    const todoArray = await res.json();

    setTodos(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Pendentes;