import React from "react";
import Typography from "@material-ui/core/Typography";

const HeaderComponent = () => {
  return (
    <div className="header-component">
      <Typography variant="h3" gutterBottom style={{ padding: "2rem 1rem 2rem 9rem" }}>
        Trello React App
      </Typography>
    </div>
  );
};

export default HeaderComponent;
