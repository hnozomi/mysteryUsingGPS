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
import { ErrorMessage } from "./const/ErrorMessage";
import { CompleteDialog } from "./CompleteDialog";
import { IsContainsDialog } from "./IsContainsDialog";
import { useCurrentPosition } from "./hooks/useCurrenPosition";

// 謎解きの画面が表示されている
// 表示のコンポーネント

export const Mystery = () => {
  const [number, setNumber] = useState(0);
  const [error, setError] = useState({ status: false, message: "" });
  const [completed, setCompleted] = useState(false);
  const [open, setOpen] = useState({ isOpen: false, answer: null });
  const { checkCurrentPosition, loading } = useCurrentPosition();

  // 画面表示時点で謎解き番号を取得する
  // 関数に分ける必要ある?
  useEffect(() => {
    getMysteryNumber();
  }, []);

  // 謎解きの問題番号を取得する
  const getMysteryNumber = () => {
    const mysteryNumber = localStorage.getItem("MysteryNumber");
    if (mysteryNumber === null) {
      localStorage.setItem("MysteryNumber", 0);
    } else {
      setNumber(mysteryNumber);
    }
  };

  // 正解かチェックする
  // 正解なら謎解き番号をカウントアップする
  const countUpMysteryNumber = async () => {
    const coordinate = Question[number].coordinate;

    const result = await checkCurrentPosition(coordinate).catch((err) => {
      const message = ErrorMessage.find(
        (error) => error.errorCode === err.code
      );

      setError({ ...error, status: true, message: message.errorMessage });
    });

    if (result) {
      if (number > 1) {
        setCompleted(true);
      } else {
        setOpen({ ...open, isOpen: true, answer: "correct" });
        setNumber(parseInt(number) + 1);
        localStorage.setItem("MysteryNumber", parseInt(number) + 1);
      }
    } else {
      setOpen({ ...open, isOpen: true, answer: "incorrect" });
    }
  };

  // 完了画面を閉じる
  const handleCloseCompleteDialog = () => {
    setCompleted(false);
    localStorage.removeItem("MysteryNumber");
  };

  // 正解か不正解ダイアログを閉じる
  const handleCloseResultDialog = () => {
    setOpen(false);
  };

  // ローカルストレージから謎解き番号を削除する
  const deleteLocalStorage = () => {
    localStorage.removeItem("MysteryNumber");
  };

  if (error.status) {
    return <div>{error.message}</div>;
  }

  if (completed) {
    return (
      <CompleteDialog
        open={completed}
        handleClose={handleCloseCompleteDialog}
      />
    );
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff" }} open={true}>
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
    <IsContainsDialog
      open={open.isOpen}
      handleClose={handleCloseResultDialog}
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
          <img
            src={`/image/${number}.png`}
            alt="謎解き"
            width="100%"
            height="200"
          />
        </Paper>
        <Typography sx={{ mt: 2 }}>
          目的地に到着したらボタンを押してください
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "flex", justifyContent: "flex-end" }}>
        <Button onClick={deleteLocalStorage} variant="outlined" size="small">
          リセットする
        </Button>
        <Button onClick={countUpMysteryNumber} variant="outlined" size="small">
          到着
        </Button>
      </CardActions>
    </Card>
  );
};
