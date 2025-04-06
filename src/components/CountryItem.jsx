import styles from "./CountryItem.module.css";

const FLAG_API = "https://countryflagsapi.netlify.app/flag/";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img className={styles.img} src={`${FLAG_API}/${country.emoji}.svg`} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
