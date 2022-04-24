import { Mystery } from "./Mystery";

export const App = () => {
  return navigator.geolocation ? (
    <Mystery />
  ) : (
    <div>あなたの端末では、現在位置を取得できません。</div>
  );
};
