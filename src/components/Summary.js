import { useEffect, useState } from "react";
import axios from "axios";
const Summary = (props) => {
  const [details, setDetails] = useState("");
  useEffect(() => {
    let stringInput = props.reviewsString.replace(/(\r\n|\n|\r)/gm, "");

    axios
      .post(
        "https://worker-white-mud-ba28.placeinsights.workers.dev/",
        {
          text: stringInput,
        },
        { headers: { "Content-Type": "application/json", Accept: "*/*" } }
      )
      .then((res) => {
        setDetails(res.data.summary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (details == "") {
    return (
      <p className="bg-indigo-700 bg-opacity-15 p-8 m-4 h-[290px] text-center text-white">
        Please wait generating AI based summary based on google reviews
      </p>
    );
  }
  return (
    <div className="bg-indigo-700 bg-opacity-15 p-8 m-4 h-[290px]">
      <p className="text-lg font-bold mb-3">AI Summary of reviews</p>
      <p>
        <span className="text-xl text-purple-300">{details}</span>
      </p>
    </div>
  );
};

export default Summary;
