import { useRef, useState, useReducer } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const inputRef = useRef();

  const reducer = (posts, action) => {
    switch (action.type) {
      case "ADD_POST":
        return [...posts, action.payload];
      case "TOGGLE_POST":
        return posts.map((post, idx) =>
          idx === action.payload ? { ...post, toggle: !post.toggle } : post
        );
      default:
        return posts;
    }
  };

  const [posts, dispatch] = useReducer(reducer, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_POST", payload: { name, toggle: true } });
    setName("");
  };

  const handleToggle = (idx) => {
    dispatch({ type: "TOGGLE_POST", payload: idx });
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter post name"
        />
      </form>
      <div className="posts-container">
        {posts.map((post, idx) => (
          <div className="post-div" key={idx}>
            <h1>{post.toggle ? post.name : "This is the hidden content"}</h1>
            <button onClick={() => handleToggle(idx)}>Toggle</button>
          </div>
        ))}
      </div>
      <button onClick={handleFocus}>Get Back to Writing</button>
    </div>
  );
}

export default App;