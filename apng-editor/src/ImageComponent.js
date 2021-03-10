import { useState } from "react";

export default function ImageComponent(props) {
  const [imageURL, setImageURL] = useState("");
  const imageCanvas = document.createElement("canvas");
  const img = document.createElement("img");
  imageCanvas.width = props.width;
  imageCanvas.height = props.height;
  const ctx = imageCanvas.getContext("2d");
  img.onload = () => {
    ctx.drawImage(img, props.frame.left, props.frame.top);
    setImageURL(imageCanvas.toDataURL());
  };
  img.src = URL.createObjectURL(props.frame.imageData);
  return (
    <img src={imageURL} alt="" width={props.width} height={props.height}></img>
  );
}