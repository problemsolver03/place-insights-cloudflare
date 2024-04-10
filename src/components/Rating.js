import { useState, useEffect } from "react";
import axios from "axios";

const Rating = (props) => {
  const [details, setDetails] = useState(null);
  const [errors, setError] = useState(false);
  useEffect(() => {
    let stringInput = props.reviewsString.replace(/(\r\n|\n|\r)/gm, "");
    setError(false);
    axios
      .post(
        "https://worker-polished-haze-f57e.placeinsights.workers.dev",
        {
          review: stringInput,
        },
        { headers: { "Content-Type": "application/json", Accept: "*/*" } }
      )
      .then((res) => {
        const obj = {
          positive: "",
          negative: "",
        };

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["label"] === "NEGATIVE") {
            obj["negative"] = (res.data[i]["score"] * 100).toFixed(2);
          } else if (res.data[i]["label"] === "POSITIVE") {
            obj["positive"] = (res.data[i]["score"] * 100).toFixed(2);
          }
        }
        setDetails({ ...obj });
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  if (details === null && errors === false) {
    return (
      <p className="bg-indigo-700 bg-opacity-15 h-[140px] p-8 text-center">
        Please wait generating AI based rating.
      </p>
    );
  }

  if (errors) {
    <p className="bg-indigo-700 bg-opacity-15 h-[140px] p-8 text-center">
      Sorry we could not generate an AI based rating
    </p>;
  }
  return (
    <div className="bg-indigo-700 bg-opacity-15 h-[140px] p-8">
      <p className="text-lg font-bold mb-2 -mt-2">AI Sentiment of the place</p>
      <div className="flex justify-between mb-1">
        <span>Positive : {details.positive}%</span>
        <span>Negative : {details.negative}%</span>
      </div>

      <div className="relative w-[100%]">
        <p
          className={`bg-green-500  absolute h-[26px] z-10`}
          style={{ width: details.positive + "%" }}
        ></p>
        <p className={`bg-red-400 w-full absolute h-[26px]`}></p>
      </div>
    </div>
  );
};

export default Rating;
