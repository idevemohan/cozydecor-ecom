import React from "react";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import Furniture from "./Furniture/Furniture";
import Lamps from "./Lamps/Lamps";
import HomeDecors from "./HomeDecors/HomeDecors";
import TopProducts from "./TopProducts/TopProducts";
import Banner from "./Banner/Banner";
import NewsLetter from "./NewsLetter/NewsLetter";

const Home = () => {
  console.log("🏠 Home loaded"); // still useful for debugging
  return (
    <div>
      <Hero />
      <Products />
      <Furniture />
      <Lamps />
      <HomeDecors />
      <TopProducts />
      <Banner />
      <NewsLetter />
    </div>
  );
};

export default Home;
