"use client";

import React, { MouseEvent, ReactNode, useState } from "react";
import { Button, Menu } from "@mui/material";

interface DropdownPropsType {
  buttonComponent: ReactNode;
  menuComponent: ReactNode;
}

const Dropdown = ({ buttonComponent, menuComponent }: DropdownPropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {buttonComponent}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "#A8A29E",
            padding: "0.5rem",
          },
          "& .MuiMenu-list": {
            padding: "0",
          },
        }}
      >
        {menuComponent}
      </Menu>
    </div>
  );
};

export default Dropdown;
