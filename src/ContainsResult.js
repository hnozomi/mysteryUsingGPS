import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const ContainsResult = (props) => {
  const { open, handleClose, answer } = props;

  let image;
  let text;

  if (answer === "correct") {
    image = "/image/正解.png";
    text = "次の場所を目指しましょう";
  } else if (answer === "incorrect") {
    image = "/image/不正解.png";
    text = "もう少し考えましょう";
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-titlze"
      aria-describedby="alert-dialog-description"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="230" image={image} alt="結果" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
};
