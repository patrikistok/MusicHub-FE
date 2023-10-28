import {  Button } from "reactstrap";

export const HomePage = () => {
    const audio = new Audio("/christmas.mp3")

    const start = () => {
      audio.play()
    }

    return (
    <div>
        Hello there!
    </div>
  );
};