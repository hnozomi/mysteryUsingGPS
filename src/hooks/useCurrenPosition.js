import { useState } from "react";

export const useCurrentPosition = () => {
  const [loading, setLoading] = useState(false);
  let count = 0;

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0
    // timeout: 10 //タイムアウト値を設けると指定秒数以内に反応がなくエラーになってしまう
  };

  const checkCurrentPosition = async (destination) => {
    setLoading(true);

    const position = await new Promise((resolve, reject) => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          count = count + 1;
          const { accuracy, latitude, longitude } = position.coords;
          if (accuracy < 50 || 5 < count) {
            navigator.geolocation.clearWatch(watchId);
            const currentPosition = new google.maps.LatLng(latitude, longitude);

            const squareDestination = new google.maps.Polygon({
              paths: destination
            });

            const isContains = google.maps.geometry.poly.containsLocation(
              currentPosition,
              squareDestination
            );

            setLoading(false);
            resolve(isContains);
          }
        },
        (err) => {
          reject(err);
        },
        options
      );
    });

    return position;
  };

  return { checkCurrentPosition, loading };
};
