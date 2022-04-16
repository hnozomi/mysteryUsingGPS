import { useEffect, useState } from "react";

export const useCurrentPosition = () => {
  const [check, setCheck] = useState(false);
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();
  // const [accuracy, setAccuracy] = useState(101);

  const checkCurrentPosition = async (destination) => {
    console.log("checkCurrentPosition開始");

    const options = {
      enableHighAccuracy: true,
      maximumAge: 0
      // timeout: 10000
    };

    const destination1 = [
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

    // let position = await new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(resolve, reject, options);
    // });
    // console.log(position.coords.latitude, "position.coords.latitude,");
    // console.log(position.coords.longitude, "position.coords.longitude,");

    let count = 0;
    let accuracy = 1000;
    let latitude = "";
    let longitude = "";
    let message = "";

    const watchCurrentPosition = async () => {
      count = parseInt(count) + 1;
      let position1 = await new Promise((resolve, reject) => {
        navigator.geolocation.watchPosition(resolve, reject, options);
      });
      // alert(position1.coords.accuracy, "position1.coords.accuracy,");
      // alert(position1.coords.latitude, "position1.coords.latitude,");
      // alert(position1.coords.longitude, "position1.coords.longitude,");
      // alert(count, "count");
      // setLatitude(position1.coords.latitude);
      // setLongitude(position1.coords.longitudev);
      accuracy = position1.coords.accuracy;
      latitude = position1.coords.latitude;
      longitude = position1.coords.longitude;
    };

    //accuracy 100でも意外に離れている。目的地の四角の隅っこの場合とか外れるかも
    // 50に変更してみる

    do {
      if (accuracy < 50) {
        break;
      }
      console.log(accuracy);
      console.log(50 < accuracy);

      if (5 < count) {
        message = "正確な位置情報の取得に失敗しました";
        alert(message);
        break;
      }
      console.log(count);
      console.log(count < 5);
      alert(accuracy + "test実行" + count);
      await watchCurrentPosition();
    } while (50 < accuracy);

    alert(accuracy + "accuracy,");
    alert(latitude + "latitude,");
    alert(longitude + "longitude,");
    // console.log(accuracy, "accuracy,");
    // console.log(latitude, "latitude,");
    // console.log(longitude, "longitude,");

    // console.log(position1);
    // console.log(position1.coords.accuracy, "position1.coords.accuracy,");
    // console.log(position1.coords.latitude, "position1.coords.latitude,");
    // console.log(position1.coords.longitude, "position1.coords.longitude,");
    // alert(position1.coords.accuracy, "position1.coords.accuracy,");
    // alert(position1.coords.latitude, "position1.coords.latitude,");
    // alert(position1.coords.longitude, "position1.coords.longitude,");

    // const test = () => {
    //   navigator.geolocation.clearWatch(position1);
    //   console.log(position1.coords.latitude, "test");
    //   console.log(position1.coords.longitude, "test");
    // };
    // setTimeout(test, 8000);

    // console.log(position1.coords.latitude, "position1.coords.latitude,");
    // console.log(position1.coords.longitude, "position.1coords.longitude,");

    // navigator.geolocation.getCurrentPosition(
    //   function async(position) {
    //     const pos = new google.maps.LatLng(
    //       position.coords.latitude,
    //       position.coords.longitude
    //     );

    //     console.log(position.coords.latitude, position.coords.longitude);

    //     const squareDestination = new google.maps.Polygon({
    //       paths: destination1
    //     });

    //     const test = google.maps.geometry.poly.containsLocation(
    //       pos,
    //       squareDestination
    //     );
    //     console.log(test, "test");
    //     // ? setCheck(true)
    //     // : setCheck(false);
    //     // ? alert("true" + position.coords.latitude + position.coords.longitude)
    //     // : alert(
    //     //     "false" + position.coords.latitude + position.coords.longitude
    //     //   );
    //     // ? setShowBtn(true)
    //     // : setShowBtn(false);
    //   },
    //   function (error) {
    //     console.log(error);
    //   },
    //   options
    // );

    const pos = new google.maps.LatLng(
      latitude,
      longitude
      // position1.coords.latitude,
      // position1.coords.longitude
    );

    const squareDestination = new google.maps.Polygon({
      paths: destination
    });

    const isContains = google.maps.geometry.poly.containsLocation(
      pos,
      squareDestination
    );

    console.log(isContains, "return check");
    return isContains;
  };

  console.log("checkCurrentPosition");
  return { checkCurrentPosition };
};
