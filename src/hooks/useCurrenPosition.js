import { LoadScriptNext } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export const useCurrentPosition = () => {
  const [check, setCheck] = useState(false);
  const [judge, setJudge] = useState(true);
  const [loading, setLoading] = useState(false);
  const [res, setResult] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  let count = 0;
  let accuracy = 1000;
  let lati = "";
  let long = "";

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0
    // timeout: 100 //タイムアウト値を設けると指定秒数以内に反応がなくエラーになってしまう
  };

  const watchCurrentPosition = async () => {
    let position = await new Promise((resolve, reject) => {
      // navigator.geolocation.getCurrentPosition(resolve, reject, options);
      navigator.geolocation.watchPosition(resolve, reject, options);
    });

    // accuracy = position.coords.accuracy;
    // latitude = position.coords.latitude;
    // longitude = position.coords.longitude;

    alert(accuracy, "accuracy");
    // console.log(accuracy, "accuracy");

    count = count + 1;
  };

  const checkCurrentPosition1 = async (destination) => {
    // 論理和(||)は一つ以上trueがある場合にtrueを返す。
    // 論理積(&&)はすべてのオペランドがtrueの場合にtrueを返す
    const startTime = performance.now();
    console.log(startTime, "開始時刻");
    while (50 < accuracy && count < 5) {
      console.log("watch実行します");
      await watchCurrentPosition();
    }

    const endTime = performance.now();
    console.log(endTime, "終了時刻");

    alert((endTime - startTime) / 1000);

    // watchPositionすると何回結果を返したかidに入る
    //navigator.geolocation.clearWatch(id);
    //watchPositionしたあとに入れると1から進まなくなる
    //監視を解除するから2回目が始まらない？
    //期待するGPSと一致するまでずっと監視する場合、一致したら監視をやめるために使用
    //今回は実行された回数を監視しているため不要
    // function success(pos) {
    //   var crd = pos.coords;

    //   if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    //     console.log('Congratulation, you reach the target');
    //     navigator.geolocation.clearWatch(id);
    //   }
    // };

    const currentPosition = new google.maps.LatLng(latitude, longitude);

    const squareDestination = new google.maps.Polygon({
      paths: destination
    });

    const isContains = google.maps.geometry.poly.containsLocation(
      currentPosition,
      squareDestination
    );

    return isContains;
  };

  let watchId = 0;

  const test = async (destination, lati, long) => {
    console.log("test実行");
    console.log(lati, long);
    console.log(destination);
    const currentPosition = new google.maps.LatLng(lati, long);

    const squareDestination = new google.maps.Polygon({
      paths: destination
    });

    const isContains = google.maps.geometry.poly.containsLocation(
      currentPosition,
      squareDestination
    );

    console.log(isContains, "isC");
    setResult(isContains);

    return isContains;
  };

  const success = (position) => {
    count = count + 1;
    accuracy = position.coords.accuracy;
    lati = position.coords.latitude;
    long = position.coords.longitude;
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(accuracy, lati, long);
    alert(accuracy);

    if (accuracy < 50 || 5 < count) {
      console.log("clearが実行されました");
      alert(accuracy);
      navigator.geolocation.clearWatch(watchId);
      setJudge(false);
      const aaa = func(lati, long);
      aaa.then((bbb) => {
        console.log(bbb, "funcの結果bbb");
      });

      setLoading(false);
    }
  };

  const error = (err) => {
    console.log(err);
  };

  const watchTest = async () => {
    new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(success, error, options);
    });
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const checkCurrentPosition = async (destination) => {
    console.log("checkCurrentPositionが実行されました");
    setLoading(true);
    // const position = await new Promise((resolve, reject) => {
    //   watchId = navigator.geolocation.watchPosition(resolve, reject, options);
    // });

    watchId = navigator.geolocation.watchPosition(success, error, options);
    // sleep(5000);
    console.log(destination, latitude, longitude, "ccc");
    console.log(judge);
    // do {
    //   console.log("doします");
    //   sleep(5000);
    //   console.log("doしました");
    // } while (judge);

    const ccc = test(destination, latitude, longitude);
    ccc.then((ddd) => console.log(ddd));

    // count = count + 1;
    // alert(accuracy);

    // if (accuracy < 50 || 5 < count) {
    //   console.log("clearが実行されました");
    //   navigator.geolocation.clearWatch(watchId);
    //   setLoading(false);
    // }
    console.log("checkCurrentPositionが終了しました");
  };

  const destination = [
    {
      //家の周辺
      lat: 34.708389637880515,
      lng: 135.52999062069316
    },
    {
      lat: 34.70832632798597,
      lng: 135.53120618702619
    },
    {
      lat: 34.70762505226196,
      lng: 135.531211658692
    },
    {
      lat: 34.707681748196656,
      lng: 135.5301115637273
    }
  ];

  const func = async (lati, long) => {
    console.log("funcが起動");
    const res = await test(destination, lati, long);
    console.log(res, "idCOntains結果");
    // alert(res);
    alert(res);
    return res;
  };

  // useEffect(() => {
  //   func();
  // }, [judge]);

  console.log(loading, watchId, judge);
  return { checkCurrentPosition, loading, res };
};
