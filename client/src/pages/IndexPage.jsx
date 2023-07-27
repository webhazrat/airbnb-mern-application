import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/places")
        .then((respnse) => respnse.json())
        .then((data) => {
          setPlaces(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="px-5 py-5">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={`/place/${place._id}`} key={place._id}>
              <div className="bg-gray-300 rounded-xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-xl object-cover aspect-[4/3.5]"
                    src={`http://localhost:5000/uploads/${place.photos[0]}`}
                    alt=""
                  />
                )}
              </div>
              <div className="mt-2 flex justify-between gap-3 items-start">
                <div>
                  <div className="text-[15px] font-medium">{place.address}</div>
                  <p className="capitalize text-gray-500">{place.title}</p>
                  <p className="text-gray-500">
                    {place.checkIn} to {place.checkOut}
                  </p>
                  <p className="mt-1">
                    <strong className="text-[16px]">${place.price}</strong>{" "}
                    night
                  </p>
                </div>
                <span className="flex gap-1 justify-end items-center">
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
                  4.94
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;
