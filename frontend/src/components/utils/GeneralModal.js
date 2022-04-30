import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function GeneralModal({ opened, handleClose, data, action }) {
  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="modal-modal-title" variant="h6" component="h2">
        {data.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="modal-modal-description" sx={{ mt: 2 }}>
          {data.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={action} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
