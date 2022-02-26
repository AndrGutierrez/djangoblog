import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  Grid,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
