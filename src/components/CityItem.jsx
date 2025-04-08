import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";

const formatDate = (date) => {
  if (!date) return "Invalid Date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const FLAG_API = "https://countryflagsapi.netlify.app/flag/";

function CityItem({ city }) {
  const { cityName, date, emoji, icon, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <img className={styles.img} src={`${FLAG_API}/${emoji}.svg`} />
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.icon}>{icon}</span>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
