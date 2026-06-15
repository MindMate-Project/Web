import { useEffect, useState } from "react";
import "./ImageSlider.css";
import img1 from "../../images/img1.webp";
import img2 from "../../images/img2.webp";
import img3 from "../../images/img3.webp";
import img4 from "../../images/img4.webp";

const images = [img1, img2, img3, img4];

function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt="slider" />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
