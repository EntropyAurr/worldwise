import React from "react";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const FLAG_API = "https://countryflagsapi.netlify.app/flag/";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const [lat, lng] = useURLPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          setCityName(data.city || data.locality || "");
          setCountryName(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          console.log("There was an error while fetching city data.");
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input id="cityName" value={cityName} onChange={(e) => setCityName(e.target.value)} />
        <span className={styles.flag}>
          <img className={styles.img} src={`${FLAG_API}/${emoji}.svg`} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
