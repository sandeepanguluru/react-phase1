import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";

const TodoMapComp = (props) => {
  const { todo, handleDel, handleEdit, edit } = props;
  return (
    <Box mt={3}>
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
    </Box>
  );
};

export default TodoMapComp;

TodoMapComp.propTypes = {
  todo: PropTypes.array.isRequired,
  handleDel: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  edit: PropTypes.number,
};

