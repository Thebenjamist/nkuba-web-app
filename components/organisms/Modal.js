import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 240,
  backgroundColor: "secondary.main",
  boxShadow: 24,
  p: 2,
};

export default function BasicModal({ children, open, setOpen, title }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              textAlign: "center",
              fontWeight: 800,
              color: "primary.main",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {children}
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
