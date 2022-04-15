import React, { useEffect, useRef, useState } from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";

function MapContainer(props) {
  console.log(props, "props");
  const refPoly = useRef(null);
  const style = {
    position: "absolute",
    width: "400px",
    height: "800px"
  };

  const containerStyle = {
    position: "absolute",
    width: "800px",
    height: "400px"
  };

  const [showBtn, setShowBtn] = useState(null);

  const triangleCoords = [
    // 目的地周辺の座標
    { lat: 34.70906765666587, lng: 135.5251162937242 },
    { lat: 34.709280074946676, lng: 135.52648923708142 },
    { lat: 34.70846622845433, lng: 135.52581988827916 }
    // { lat: 34.708804718802746, lng: 135.52943599272808 },
    // { lat: 34.70871295023499, lng: 135.5315066020221 },
    // { lat: 34.70739561602592, lng: 135.5304550926067 }
  ];

  const fetchCurrentPosition = () => {
    // 現在地を取得して、目的周辺の座標に含まれるかチェック
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position.coords.latitude, position.coords.longitude);
        var pos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const triangleCoords = [
          {
            latitude1: "34.710158113436485",
            longitude1: "135.5294508813912"
          },
          {
            latitude2: "34.709676901203395",
            longitude2: "135.52902783081885"
          },
          {
            latitude3: "34.70969509835557",
            longitude3: "135.5298370380183"
          }
        ];
        const bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords
        });
        console.log(refPoly.current.polygon);
        console.log(bermudaTriangle, "bermudaTriangle");

        google.maps.geometry.poly.containsLocation(pos, refPoly.current.polygon)
          ? console.log(true)
          : console.log(false);
        // ? setShowBtn(true)
        // : setShowBtn(false);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  // useEffect(() => {
  //   fetchCurrentPosition();
  // }, []);

  return (
    <div>
      {showBtn === true && (
        <button display="block" type="button">
          Showing Button!
        </button>
      )}
      <div>
        {console.log(props.google, "google")}
        <Map
          className="map"
          style={style}
          containerStyle={containerStyle}
          google={props.google}
          onReady={fetchCurrentPosition}
          initialCenter={{
            // 34.70916152885517, 135.52695192037382: まるよし付近
            // 34.70834082371034, 135.5305333493216: 家付近
            lat: 34.70834082371034,
            lng: 135.5305333493216
          }}
          style={{ height: "100%", position: "relative", width: "100%" }}
          zoom={17}
        >
          <Polygon
            ref={refPoly}
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          />
        </Map>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_KEY,
  libraries: ["geometry"]
})(MapContainer);
