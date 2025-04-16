import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Homepage from "./pages/Homepage";
// import AppLayout from "./pages/AppLayout";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/index.html                   0.46 kB │ gzip:   0.30 kB
// dist/assets/index-CrkhS_ta.css   31.44 kB │ gzip:   5.38 kB
// dist/assets/index-DIpiKLEi.js   565.99 kB │ gzip: 166.85 kB

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                {/* React Router will automatically navigate to /cities as a default child route of the app path; Replaces the current entry in the history stack instead of pushing a new one onto it. */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                {/* useParams will return an object with the key named: id */}
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
