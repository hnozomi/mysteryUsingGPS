import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const ContainsResult = (props) => {
  const { open, handleClose, answer } = props;
  console.log(answer);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-titlze"
      aria-describedby="alert-dialog-description"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/image/正解.png"
          alt="正解"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            正解!
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};
