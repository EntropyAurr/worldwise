import { Link } from "react-router-dom";
import PageNav from "../../components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>HOME</h1>
      <Link to="/pricing">Go to Pricing</Link>
    </div>
  );
}

export default Homepage;
