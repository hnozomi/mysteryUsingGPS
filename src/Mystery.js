import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Question } from "./const/Question";
import { CompleteDialog } from "./CompleteDialog";
import { ContainsResult } from "./ContainsResult";
import { useCurrentPosition } from "./hooks/useCurrenPosition";

// 謎解きの画面が表示されている
// 表示のコンポーネント

export const Mystery = () => {
  const [number, setNumber] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({ isOpen: false, answer: null });
  const { checkCurrentPosition } = useCurrentPosition();

  const getMysteryNumber = () => {
    const mysteryNumber = localStorage.getItem("MysteryNumber");
    if (mysteryNumber === null) {
      localStorage.setItem("MysteryNumber", 0);
    } else {
      setNumber(mysteryNumber);
    }
  };

  const countUpMysteryNumber = async () => {
    setLoading(true);
    const coordinate = Question[number].coordinate;
    const result = await checkCurrentPosition(coordinate);

    if (result) {
      setLoading(false);
      if (number > 1) {
        setCompleted(true);
      } else {
        setOpen({ ...open, isOpen: true, answer: "correct" });
        setNumber(parseInt(number) + 1);
        localStorage.setItem("MysteryNumber", parseInt(number) + 1);
      }
    } else {
      setLoading(false);
      setOpen({ ...open, isOpen: true, answer: "incorrect" });
    }
  };

  useEffect(() => {
    getMysteryNumber();
  }, []);

  const handleClose = () => {
    setCompleted(false);
    localStorage.removeItem("MysteryNumber");
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  if (completed) {
    return <CompleteDialog open={completed} handleClose={handleClose} />;
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff" }} open={open} onClick={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 1 }}>位置情報取得中</Typography>
        </Box>
      </Backdrop>
    );
  }

  return open.isOpen ? (
    <ContainsResult
      open={open.isOpen}
      handleClose={handleClose1}
      answer={open.answer}
    />
  ) : (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {`謎解き${Question[number].mysteryNumber}`}
        </Typography>
        <Typography sx={{ mb: 2 }}>以下の場所へ向かえ</Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {`謎解き${Question[number].mystery}`}
          </Typography>
        </Paper>
        <Typography sx={{ mt: 2 }}>
          目的地に到着したらボタンを押してください
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "flex", justifyContent: "flex-end" }}>
        <Button onClick={countUpMysteryNumber} variant="outlined" size="small">
          到着
        </Button>
      </CardActions>
    </Card>
  );
};
