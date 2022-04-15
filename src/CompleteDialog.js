import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const CompleteDialog = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Congratulations"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          あなたはすべての謎を解き明かすことに成功しました。
          これからも好奇心のままに生きよう
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          終了する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
