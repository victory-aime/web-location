"use client";

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import ShopCategories from "./components/ShopCategories";
import OurProduct from "./components/OurProduct";

const PublicHome = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ShopCategories />
      <OurProduct />
      <Footer />
    </div>
  );
};

export default PublicHome;
