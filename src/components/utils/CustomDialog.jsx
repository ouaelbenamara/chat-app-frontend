import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function CustomDialog({ message, isOpen ,type}) {
  const [open, setOpen] = useState(isOpen);
    useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);

  return (
    <Dialog
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      open={open}
      onClose={() => {
        setOpen(false);
   
      }}
    >
      <DialogTitle id="dialog-title">{type}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {

            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
