import React, { useEffect, useState } from "react";
import axios from "axios";

// Layout HOC
import DefaultLayoutHoc from "../layout/Default.layout";

// Components
import HeroCarousel from "../components/HeroCarousel/HeroCarousel.Component";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import EntertainmentCardSlider from "../components/Entertainment/EntertainmentCard.Component";

const HomePage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [premierMovies, setPremierMovies] = useState([]);
  const [onlineStreamEvents, setOnlineStreamEvents] = useState([]);

  // get.apiName('/', async ()=>{})
  useEffect(() => {
    const requestPopularMovies = async () => {
      const getPopularMovies = await axios.get(
        "movie/popular?api_key=a84c0eddf5d894d7bdea9370c18793ff"
      );
      setPremierMovies(getPopularMovies.data.results);
    };
    requestPopularMovies();
  }, []);

  useEffect(() => {
    const requestTopRatedMovies = async () => {
      const getTopRatedMovies = await axios.get(
        "movie/top_rated?api_key=a84c0eddf5d894d7bdea9370c18793ff"
      );
      setRecommendedMovies(getTopRatedMovies.data.results);
    };
    requestTopRatedMovies();
  }, []);

  useEffect(() => {
    const requestUpcomingMovies = async () => {
      const getUpcomingMovies = await axios.get(
        "movie/upcoming?api_key=a84c0eddf5d894d7bdea9370c18793ff"
      );
      setOnlineStreamEvents(getUpcomingMovies.data.results);
    };
    requestUpcomingMovies();
  }, []);

  return (
    <>
      <HeroCarousel />

      <div className="container mx-auto px-4 md:px-12 my-8">
        <h1 className="text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3">
          The best of Entertainment
        </h1>
        <EntertainmentCardSlider />
      </div>

      <div className="container mx-auto px-4 md:px-12 my-8">
        <PosterSlider
          title="Recommended Movies"
          subtitle="List of recommonded movies"
          posters={recommendedMovies}
          isDark={false}
        />
      </div>

      <div className="bg-premier-800 py-12">
        <div className="container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3">
          <div className="hidden md:flex">
            <img src="" alt="Rupay" className="w-full h-full" />
          </div>
          <PosterSlider
            title="Premiers"
            subtitle="Brand new releases every Friday"
            posters={premierMovies}
            isDark={true}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-12 my-8">
        <PosterSlider
          title="Online Streaming Events"
          subtitle="Online Stream Events"
          posters={onlineStreamEvents}
          isDark={false}
        />
      </div>
    </>
  );
};

export default DefaultLayoutHoc(HomePage);