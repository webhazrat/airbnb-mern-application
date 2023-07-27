import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { UserContextProvider } from "./contexts/UserContext";
import PlacesPage from "./pages/PlacesPage";
import PlaceNewPage from "./pages/PlaceNewPage";
import BookingsPage from "./pages/BookingsPage";
import PlacePage from "./pages/PlacePage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlaceNewPage />} />
          <Route path="/account/places/:id" element={<PlaceNewPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
