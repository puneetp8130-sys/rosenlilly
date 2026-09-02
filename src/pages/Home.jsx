import React from "react";

import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import BestSelling from "../components/home/BestSelling";
import Offers from "../components/home/Offers";
import Reviews from "../components/home/Reviews";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <BestSelling />
      <Offers />
       <Reviews />
    </>
  );
};

export default Home;