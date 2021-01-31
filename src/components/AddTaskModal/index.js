import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    top: "40%",
    zIndex: 99,
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "22%",
    height: "20%",
    padding: "2rem 1rem",
    filter: "none",
    pointerEvents: 'auto',
  },
});

const AddTaskModal = ({
  handleInputChange,
  handleSubmit,
  handleClose,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Add new task
          </Typography>
          <TextareaAutosize
            aria-label="add new task"
            rowsMin={1}
            placeholder="Add new task here ..."
            onChange={(e) => handleInputChange(e)}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddTaskModal;
