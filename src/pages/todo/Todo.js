import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import TodoMapComp from "./TodoMapComp";

const Todo = () => {
  const loadTodos = () => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  };

  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [error, setError] = useState("");
  const [todo, setTodo] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const handleAdd = () => {
    if (!inputValue.trim()) {
      setError("Todo is required");
      return;
    }
    if (todo.length >= 5 && edit === null) {
      setError("You can only add up to 5 todos");
      return;
    }
    if (edit !== null) {
      const updated = [...todo];
      updated[edit] = inputValue;
      setTodo(updated);
      setEdit(null);
    } else {
      setTodo([...todo, inputValue]);
    }
    setInputValue("");
    setError("");
  };

  const handleDel = (id) => {
    const updated = todo.filter((_, index) => index !== id);
    setTodo(updated);
    setError("");
  };

  const handleEdit = (id) => {
    setInputValue(todo[id]);
    setEdit(id);
    setError("");
  };

  const clear = () => {
    if (window.confirm("Are you sure you want to clear all todos?")) {
      localStorage.removeItem("todos");
      setTodo([]);
      setError("");
      setInputValue("");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Todo App
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={7}>
          <TextField
            fullWidth
            label="Add Todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            size="small"
          />
        </Grid>
        <Grid item xs={6} sm={2.5}>
          <Button fullWidth variant="contained" onClick={handleAdd}>
            {edit !== null ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item xs={6} sm={2.5}>
          <Button fullWidth variant="outlined" color="error" onClick={clear}>
            Clear All
          </Button>
        </Grid>
      </Grid>

      {todo.length === 0 && (
        <Typography
          variant="body1"
          align="center"
          mt={2}
          color="text.secondary"
        >
          No Todos...
        </Typography>
      )}
      <TodoMapComp
        todo={todo}
        handleDel={handleDel}
        handleEdit={handleEdit}
        edit={edit}
      />
      {/* <Box mt={3}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todo.map((item, index) => (
            <li key={index} style={{ marginBottom: 12 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 1 }}
              >
                <Typography>
                  {item}{" "}
                  {edit === index && (
                    <span style={{ color: "orange" }}>(Editing)</span>
                  )}
                </Typography>
                <Box>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{ mr: 1 }}
                    onClick={() => handleDel(index)}
                  >
                    Del
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      </Box> */}
    </Box>
  );
};

export default Todo;
