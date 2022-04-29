import { useState } from "react";

export const useCurrentPosition = () => {
  let count = 0;
  let accuracy = 1000;
  let latitude = "";
  let longitude = "";
  let message = "";

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0
    // timeout: 10000　//タイムアウト値を設けると指定秒数以内に反応がなくエラーになってしまう
  };

  const watchCurrentPosition = async () => {
    count = parseInt(count) + 1;

    let position = await new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject, options);
    });

    let positions = new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject, options);
    });

    positions.then((position) => {
      console.log(position);
    });

    // console.log(position);
    accuracy = position.coords.accuracy;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  };

  const checkCurrentPosition = async (destination) => {
    // do {
    //   if (accuracy < 50) {
    //     break;
    //   }

    //   if (5 < count) {
    //     message = "正確な位置情報の取得に失敗しました";
    //     alert(message);
    //     break;
    //   }
    //   await watchCurrentPosition();
    // } while (50 < accuracy);

    // 論理和(||)は一つ以上trueがある場合にtrueを返す。
    // 論理積(&&)はすべてのオペランドがtrueの場合にtrueを返す
    let id;
    while (50 < accuracy && count < 5) {
      id = await watchCurrentPosition();
    }

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

  return { checkCurrentPosition };
};
