import { Link } from "react-router-dom";
import PageNav from "../../components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>HOME</h1>
      <Link to="/app">Go to AppLayout</Link>
    </div>
  );
}

export default Homepage;
