import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css"; // Create this file for custom CSS animations

function App() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newUserInput = {
        id: Math.random(),
        value: userInput,
      };
      setList([...list, newUserInput]);
      setUserInput("");
    }
  };

  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  const editItem = (index) => {
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      const updatedList = [...list];
      updatedList[index].value = editedTodo;
      setList(updatedList);
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
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
                animation: "pulse 1.5s infinite",
              }}
            />
            <Button
              variant="dark"
              style={{
                borderRadius: "0 10px 10px 0",
                backgroundColor: "#6c63ff",
                borderColor: "#6c63ff",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "0.3s",
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
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <TransitionGroup component={ListGroup}>
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
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  {item.value}
                  <span>
                    <Button
                      variant="light"
                      style={{ marginRight: "10px", fontWeight: "bold" }}
                      onClick={() => deleteItem(item.id)}
                    >
                      🗑️ Delete
                    </Button>
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
