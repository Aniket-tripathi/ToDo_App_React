import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap styles
import Container from "react-bootstrap/Container"; // Bootstrap container
import Row from "react-bootstrap/Row"; // Bootstrap row
import Col from "react-bootstrap/Col"; // Bootstrap column
import Button from "react-bootstrap/Button"; // Bootstrap button
import InputGroup from "react-bootstrap/InputGroup"; // Bootstrap input group
import FormControl from "react-bootstrap/FormControl"; // Bootstrap form control
import ListGroup from "react-bootstrap/ListGroup"; // Bootstrap list group
import { CSSTransition, TransitionGroup } from "react-transition-group"; // For animations
import "./App.css"; // Import custom CSS for animations

// Main App Component
function App() {
  // State for the user input and list of notes
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  // Updates user input state as they type
  const updateInput = (value) => {
    setUserInput(value);
  };

  // Adds a new item to the list if input is not empty
  const addItem = () => {
    if (userInput.trim() !== "") {
      const newUserInput = {
        id: Math.random(), // Generates a unique ID for each item
        value: userInput,
      };
      setList([...list, newUserInput]); // Adds new item to the list
      setUserInput(""); // Clears the input field
    }
  };

  // Deletes an item based on its unique ID
  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList); // Sets updated list without the deleted item
  };

  // Edits an item: prompts the user to update the note text
  const editItem = (index) => {
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      const updatedList = [...list];
      updatedList[index].value = editedTodo; // Updates the specified item
      setList(updatedList); // Sets updated list
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      {/* Title Row */}
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 5px #aaa",
        }}
      >
        <span style={{ borderBottom: "4px solid #6c63ff", paddingBottom: "5px" }}>
          Fun Notes
        </span>
      </Row>
      <hr style={{ borderTop: "3px solid #6c63ff", width: "60%" }} />

      {/* Input Row */}
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup className="mb-3" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <FormControl
              placeholder="What's on your mind? ✍️"
              size="lg"
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
              style={{
                borderRadius: "10px 0 0 10px",
                borderColor: "#6c63ff",
                animation: "pulse 1.5s infinite", // Input pulse animation
              }}
            />
            {/* ADD Button */}
            <Button
              variant="dark"
              style={{
                borderRadius: "0 10px 10px 0",
                backgroundColor: "#6c63ff",
                borderColor: "#6c63ff",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "0.3s", // Smooth transition for hover effect
              }}
              onClick={addItem}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a52e5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c63ff")}
            >
              ADD
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* List Display Row */}
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <TransitionGroup component={ListGroup}>
            {/* Map over list to display each item */}
            {list.map((item, index) => (
              <CSSTransition key={item.id} timeout={500} classNames="fade">
                <ListGroup.Item
                  style={{
                    background: "linear-gradient(120deg, #f093fb, #f5576c)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    marginBottom: "10px",
                    transition: "transform 0.2s", // Hover animation
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  {/* Display note text */}
                  {item.value}
                  <span>
                    {/* Delete Button */}
                    <Button
                      variant="light"
                      style={{ marginRight: "10px", fontWeight: "bold" }}
                      onClick={() => deleteItem(item.id)}
                    >
                      🗑️ Delete
                    </Button>
                    {/* Edit Button */}
                    <Button
                      variant="light"
                      style={{ fontWeight: "bold" }}
                      onClick={() => editItem(index)}
                    >
                      ✏️ Edit
                    </Button>
                  </span>
                </ListGroup.Item>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
