import {useState} from "react";
import "./App.css";

function App() {
    const [todoList, setTodoList] = useState([
        {id: 0, content: "123"},
        {id: 1, content: "코딩 공부하기"},
        {id: 2, content: "잠 자기"},
    ]);

    return (
        <div className="todo-app">
            <header className="todo-header">
                <h1>Todo App</h1>
            </header>
            <TodoList todoList={todoList} setTodoList={setTodoList}/>
            <hr/>
            <TodoInput todoList={todoList} setTodoList={setTodoList}/>
        </div>
    );
}

function TodoInput({todoList, setTodoList}) {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="todo-input">
            <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <button
                className="add-button"
                onClick={() => {
                    const newTodo = {id: Number(new Date()), content: inputValue, completed: false};
                    const newTodoList = [...todoList, newTodo];
                    setTodoList(newTodoList);
                    setInputValue("");
                }}
            >
                추가하기
            </button>
        </div>
    );
}

function TodoList({todoList, setTodoList}) {
    return (
        <ul>
            {todoList.map((todo) => (
                <Todo key={todo.id} todo={todo} setTodoList={setTodoList}/>
            ))}
        </ul>
    );
}

function Todo({todo, setTodoList}) {
    const [inputValue, setInputValue] = useState(todo.content);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                    setTodoList((prev) =>
                        prev.map((el) =>
                            el.id === todo.id ? {...el, completed: !el.completed} : el
                        )
                    );
                }}
            />
            {isEditing ? (
                <input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
            ) : (
                <span>{todo.content}</span>
            )}
            {isEditing ? (
                <button
                    className="save-button"
                    onClick={() => {
                        setTodoList((prev) =>
                            prev.map((el) =>
                                el.id === todo.id ? {...el, content: inputValue} : el
                            )
                        );
                        setIsEditing(false);
                    }}
                >
                    저장
                </button>
            ) : (
                <button className="edit-button" onClick={() => setIsEditing(true)}>수정</button>
            )}
            <button
                className="delete-button"
                onClick={() => {
                    setTodoList((prev) => {
                        return prev.filter((el) => el.id !== todo.id);
                    });
                }}
            >
                삭제
            </button>
        </li>
    );
}

export default App;
