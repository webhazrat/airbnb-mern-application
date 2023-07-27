import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import PlaceImage from "../components/PlaceImage";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/user-places", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaces(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <AccountNav />
      <div className="py-5">
        <div className="text-center">
          <Link
            to={`/account/places/new`}
            className="inline-flex items-center gap-1 py-2 px-4 bg-primary text-white rounded-full"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-5 px-5 flex flex-col gap-5">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={`/account/places/${place._id}`}
                className="flex gap-4 cursor-pointer bg-gray-100 rounded-md p-4"
                key={place._id}
              >
                <div className="h-32 basis-48 shrink-0 bg-gray-300 rounded-md">
                  <PlaceImage
                    place={place}
                    className={`w-full h-full object-cover rounded-md`}
                  />
                </div>
                <div>
                  <h2 className="text-[16px] font-medium">{place.address}</h2>
                  <h3 className="my-1">{place.title}</h3>
                  <p className="text-sm mt-2 text-gray-500">
                    {place.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
