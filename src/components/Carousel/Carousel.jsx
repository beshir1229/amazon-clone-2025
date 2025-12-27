import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={true}>
        {img.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </Carousel>

      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
