import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "#000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalWrapper({ open, handleClose, children }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-full flex justify-end">
              <Button onClick={()=>handleClose()} className="!text-white">
                <ClearIcon />
              </Button>
            </div>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
