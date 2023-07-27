import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotoUpload from "../components/PhotoUpload";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlaceNewPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      fetch(`http://localhost:5000/places/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update place
      try {
        const response = await fetch(`http://localhost:5000/place/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          setRedirect(true);
          console.log(`Place updated successful`);
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // new place
      try {
        const response = await fetch("http://localhost:5000/place", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          setRedirect(true);
          console.log(`New place added successful`);
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNav />
      <div className="max-w-2xl mx-auto mt-5 py-5">
        <form className="space-y-6" onSubmit={savePlace}>
          <div>
            <label htmlFor="title" className="label-control mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="address" className="label-control mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>
          <PhotoUpload
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
          />
          <div>
            <label htmlFor="description" className="label-control mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="" className="label-control mb-2">
              Perks
            </label>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              <Perks selected={perks} onChange={setPerks} />
            </div>
          </div>

          <div>
            <label htmlFor="extra-info" className="label-control mb-2">
              Extra info
            </label>
            <textarea
              id="extra-info"
              rows="4"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="form-control"
            ></textarea>
          </div>

          <div>
            <label className="label-control mb-2">Check in & out times</label>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div>
                <label htmlFor="check-in">Check in time</label>
                <input
                  type="text"
                  id="check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="check-out">Check out time</label>
                <input
                  type="text"
                  id="check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="guests">Max number of guests</label>
                <input
                  type="number"
                  id="guests"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="price">Price per night </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default PlaceNewPage;
