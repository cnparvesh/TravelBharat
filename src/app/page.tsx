import HeroSection from "@/components/sections/HeroSection";
import PopularStates from "@/components/sections/PopularStates";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import Categories from "@/components/sections/Categories";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularStates />
      <FeaturedDestinations />
      <Categories />
      <WhyChooseUs />
    </>
  );
}
