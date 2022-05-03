import { useEffect, useState } from "react";

export const useCurrentPosition = () => {
  const [check, setCheck] = useState(false);
  let count = 0;
  let accuracy = 1000;
  let latitude = "";
  let longitude = "";

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

    accuracy = position.coords.accuracy;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

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

  const test = async (destination) => {
    console.log("test実行", watchId);
    navigator.geolocation.clearWatch(watchId);

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

  const getAccuracy = (position) => {
    accuracy = position.coords.accuracy;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(accuracy, latitude, longitude);
  };

  const checkCurrentPosition = async (destination) => {
    const position = await new Promise((resolve, reject) => {
      watchId = navigator.geolocation.watchPosition(resolve, reject, options);
      console.log(watchId, "AAA");
    });

    console.log("position実行");
    count = count + 1;
    console.log(count);
    alert(accuracy);

    // setInterval(() => getAccuracy(position), 1000);

    if (accuracy < 50 || 5 < count) {
      console.log("clearが実行されました");
      navigator.geolocation.clearWatch(watchId);
    }

    console.log(watchId);

    return false;
  };

  return { checkCurrentPosition };
};
