import { useEffect, useState } from "react";

export const useCurrentPosition = () => {
  const [check, setCheck] = useState(false);

  const checkCurrentPosition = async (destination) => {
    console.log("checkCurrentPosition開始");

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
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
        lat: 34.708247925096686,
        lng: 135.53259437140576
      },
      {
        lat: 34.70758517026514,
        lng: 135.53197981135864
      }
    ];

    let position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    console.log(position.coords.latitude, "position.coords.latitude,");
    console.log(position.coords.longitude, "position.coords.longitude,");

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
      position.coords.latitude,
      position.coords.longitude
    );

    const squareDestination = new google.maps.Polygon({
      paths: destination1
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
