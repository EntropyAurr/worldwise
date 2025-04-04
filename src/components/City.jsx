import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";

// Check if Intl is available
// console.log(typeof Intl); // Should print "object" or "function"
// console.log(new Intl.DateTimeFormat("en").format(new Date())); // Should print a formatted date
/* globals: { ...globals.browser, Intl: "readonly" }, add this line of code to eslintrc.config.js file*/

const formatDate = (date) => {
  if (!date) return "Invalid Date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <>
      <h1>City {id}</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
    </>
  );

  // return (
  //   <div className={styles.city}>
  //     <div className={styles.row}>
  //       <h6>City name</h6>
  //       <h3>
  //         <span>{emoji}</span> {cityName}
  //       </h3>
  //     </div>

  //     <div className={styles.row}>
  //       <h6>You went to {cityName}</h6>
  //       <p>{formatDate(date || null)}</p>
  //     </div>

  //     {notes && (
  //       <div className={styles.row}>
  //         <h6>Your notes</h6>
  //         <p>{notes}</p>
  //       </div>
  //     )}

  //     <div className={styles.row}>
  //       <h6>Learn more</h6>
  //       <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer">
  //         Check out {cityName} on Wikipedia &rarr;
  //       </a>
  //     </div>
  //   </div>
  // );
}

export default City;
