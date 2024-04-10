import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { useState } from "react";
import axios from "axios";
import Summary from "./Summary";
import Rating from "./Rating";
import Header from "./Header";

const Search = () => {
  const [address, setaddress] = useState("");
  const [placedetails, setPlaceDetails] = useState(null);
  const [placeinfo, setPlaceInfo] = useState(null);

  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState("");

  const handleChange = (address) => {
    setError(false);
    setaddress(address);
  };

  const handleSelect = (address) => {
    setPlaceInfo(null);
    setPlaceDetails(null);
    setReviews("");
    geocodeByAddress(address)
      .then((results) => {
        setPlaceDetails(results[0]);
        axios
          .get(
            `https://places.googleapis.com/v1/places/${results[0]["place_id"]}?fields=id,displayName,reviews,rating&key=AIzaSyCi3PgAFmkyU04VM04WwoVx4klFrOmQZyo`
          )
          .then((res) => {
            setPlaceInfo(res.data);
            setTimeout(function () {
              if (res.data.reviews !== undefined) {
                getSummary(res.data.reviews);
              }
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then((latLng) => null)
      .catch((error) => setError(true));
  };

  const getSummary = (reviews) => {
    let reviewsString = "";

    for (let i = 0; i < reviews.length; i++) {
      let review = reviews[i]["originalText"]["text"];
      reviewsString += review;
    }
    setReviews(reviewsString);
  };

  if (error) {
    return <p>Sorry there was an error while processing your request.</p>;
  }

  return (
    <div>
      <div className="border-b py-8 border-black bg-slate-900 bg-opacity-70 relative">
        <div className="absolute right-3 mt-6">
          <span className="bg-slate-300 bg-opacity-10 text-slate-500 px-2 py-1 rounded mr-1">
            #devto
          </span>
          <span className="bg-slate-300 bg-opacity-10 text-slate-500 px-2 py-1 rounded mr-1">
            #cloudlare
          </span>
          <span className="bg-slate-300 bg-opacity-10 text-slate-500 px-2 py-1 rounded mr-1">
            #sentimentanalysis
          </span>
          <span className="bg-slate-300 bg-opacity-10 text-slate-500 px-2 py-1 rounded">
            #AI summary
          </span>
        </div>
        <div className="w-[300px] lg:w-[600px] pl-6">
          <Header />
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="w-full">
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className:
                      "location-search-input border-2 border-purple-500 p-2 rounded w-full bg-[#0B2447] text-white",
                  })}
                />
                <div className="autocomplete-dropdown-container absolute w-[300px] lg:w-[600px] z-10">
                  {loading && <div className="text-slate-400">Loading...</div>}
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? "suggestion-item--active p-2 text-white"
                      : "suggestion-item p-2 text-white";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#8644A2", cursor: "pointer" }
                      : {
                          backgroundColor: "rgba(0, 0, 0, 0.80)",
                          cursor: "pointer",
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>

      {placeinfo !== null ? (
        <>
          <div className="flex text-white mt-4">
            <div className="m-4 ml-6  h-[140px]  w-[40%] bg-cyan-700 bg-opacity-15 flex justify-center flex-col items-center text-center">
              <p className="text-xl font-semibold mb-1">
                {placeinfo.displayName.text}
              </p>
              <p className="text-sm px-2">{placedetails.formatted_address}</p>
            </div>
            <div className="p-4 w-[60%] mr-3">
              {reviews !== "" ? <Rating reviewsString={reviews} /> : null}
            </div>
          </div>
          <div className="flex w-full  text-slate-200">
            <div className="m-4 ml-6 h-[290px] p-4 w-[40%] overflow-y-auto bg-slate-700 bg-opacity-15">
              <p className="text-white sticky -top-4 bg-purple-900 bg-opacity-70 -m-4 p-4">
                User Reviews
              </p>

              <div className="mt-6">
                {placeinfo.reviews.map((review, i) => {
                  return (
                    <p key={i} className="border-b mb-2 pb-2">
                      {review.originalText.text}
                      <small className="block">
                        {review.relativePublishTimeDescription}
                      </small>
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-[60%] mr-3">
              {reviews !== "" ? <Summary reviewsString={reviews} /> : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Search;
