import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import { useCities } from "../../contexts/CitiesContext";
import { useURLPosition } from "../hooks/useURLPosition";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const FLAG_API = "https://countryflagsapi.netlify.app/flag";

function Form() {
  const [lat, lng] = useURLPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [icon, setIcon] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if (!data.countryCode) throw new Error("That doesn't seem to be a city. Please click somewhere else!");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      icon,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking somewhere on the map!" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.city}>
        <div className={styles.row}>
          <label htmlFor="cityName">City Name</label>
          <div className={styles.flag}>
            <input id="cityName" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            <img className={styles.img} src={`${FLAG_API}/${emoji}.svg`} />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="icon">Icon</label>
          <input id="icon" className={styles.icon} value={icon} onChange={(e) => setIcon(e.target.value)} />
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
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
