import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { UserContext } from "../contexts/UserContext";

const BookingWidget = ({ place }) => {
  const { user } = useContext(UserContext);

  let d = new Date();
  let today = format(d, "yyyy-MM-dd");
  let tommorrow = format(d.setDate(d.getDate() + 1), "yyyy-MM-dd");

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tommorrow);
  const [numberOfGuests, setNumberOfGuests] = useState(place.maxGuests);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const grandTotal = place.price * numberOfNights;
  const serviceFee = (grandTotal * 15) / 100;
  const total = grandTotal + serviceFee;

  useEffect(() => {
    setName(user.name);
  }, [user]);

  const reserve = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("To reserve this please login first");
    } else {
      const data = {
        place: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price: total,
      };
      try {
        const response = await fetch("http://localhost:5000/booking", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const result = await response.json();
          alert("Booking added successful");
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="rounded-xl bg-white shadow-lg p-5 border border-gray-100 sticky top-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-lg">
            <span className="text-2xl font-semibold">${place.price}</span> night
          </h2>
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
            4.94
          </span>
        </div>

        <div className="grid grid-cols-2 border border-gray-600 rounded-xl">
          <div className="py-2 px-3 border-r border-gray-600">
            <p className="uppercase text-[11px] font-bold">Check-in</p>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="py-2 px-3">
            <p className="uppercase text-[11px] font-bold">Check-Out</p>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="col-span-2 py-2 px-3 border-t border-gray-600">
            <p className="uppercase text-[11px] font-bold">Guests</p>
            <input
              type="text"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className="text-sm"
            />
          </div>
        </div>

        {numberOfNights > 0 && (
          <div className="mt-4">
            <div className="mb-2">
              <label htmlFor="name" className="label-control">
                Your Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control "
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="label-control">
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control "
                />
              </div>
            </div>
          </div>
        )}

        <button type="button" onClick={reserve} className="my-4 btn-primary">
          Reserve
        </button>

        <div className="flex flex-col gap-2">
          <p className="flex justify-between items-center">
            <span className="underline">
              ${place.price} x{" "}
              {numberOfNights > 0 && (
                <span>
                  {numberOfNights} {numberOfNights > 1 ? "nights" : "night"}
                </span>
              )}
            </span>{" "}
            <span>${grandTotal}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="underline">Airbnb service fee</span>{" "}
            <span>${serviceFee}</span>
          </p>

          <hr className="my-3" />

          <h3 className="font-bold flex justify-between items-center">
            Total before taxes <span>${total}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
