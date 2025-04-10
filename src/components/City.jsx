import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../../contexts/CitiesContext";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

// Check if Intl is available
// console.log(typeof Intl); // Should print "object" or "function"
// console.log(new Intl.DateTimeFormat("en").format(new Date())); // Should print a formatted date
/* globals: { ...globals.browser, Intl: "readonly" }, add this line of code to eslintrc.config.js file*/

const FLAG_API = "https://countryflagsapi.netlify.app/flag/";

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
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <span className={styles.name}>
          <img className={styles.img} src={`${FLAG_API}/${emoji}.svg`} />
          <p>{cityName}</p>
        </span>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName}</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noopener noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
