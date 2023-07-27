import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`http://localhost:5000/places/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlace(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="fixed top-0 min-w-full min-h-screen bg-white">
        <div className="flex items-center justify-between p-5">
          <button onClick={() => setShowAllPhotos(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div className="flex gap-4">
            <a href="#" className="flex gap-1 items-center underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Share
            </a>
            <a href="#" className="flex gap-1 items-center underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Save
            </a>
          </div>
        </div>
        <div className="py-5 h-[calc(100vh_-_61px)] overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-3">
              {place?.photos?.length > 0 &&
                place.photos.map((photo, index) => (
                  <img
                    key={photo}
                    className={`w-full h-full ${
                      index % 3 === 0 ? `col-span-2` : ``
                    }`}
                    src={`http://localhost:5000/uploads/${photo}`}
                    alt={"photo"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-5">
      <h1 className="text-2xl font-semibold text-gray-700">{place.title}</h1>

      <div className="my-4 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            4.9
          </span>

          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            Superhost
          </span>

          <a
            target="_blank"
            href={`https://google.com/maps/place/${place.address}`}
            className="underline"
          >
            {place.address}
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="flex gap-1 items-center underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Share
          </a>
          <a href="#" className="flex gap-1 items-center underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Save
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-4 grid-rows-2 gap-2">
          {(place.photos.length > 0 || place.photos.length < 5) &&
            place.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setShowAllPhotos(true)}
                className={`${
                  index === 0 ? "row-span-2 col-span-2" : ""
                } hover-overlay`}
              >
                <img
                  key={photo}
                  className={`${
                    index === 0 ? "rounded-none sm:rounded-s-xl" : ""
                  } object-cover aspect-square ${
                    index === 2 ? "rounded-tr-xl" : ""
                  } ${index === 4 ? "rounded-br-xl" : ""}`}
                  src={`http://localhost:5000/uploads/${photo}`}
                  alt="photo"
                />
              </button>
            ))}
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute z-20 bottom-5 right-5 py-2 px-4 flex items-center gap-1 bg-white rounded-md shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          Show all photos
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mr-0 md:mr-10">
          <h2 className="text-lg font-semibold mb-3">Description</h2>
          {place.description}
          <hr className="my-5" />
          <p className="text-gray-600">{place.extraInfo}</p>

          <hr className="my-5" />

          <h2 className="text-lg font-semibold mb-3">What this place offers</h2>
          {place.perks.map((perk) => (
            <p key={perk} className="capitalize my-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {perk}
            </p>
          ))}
        </div>

        <BookingWidget place={place} />
      </div>
    </div>
  );
};

export default PlacePage;
