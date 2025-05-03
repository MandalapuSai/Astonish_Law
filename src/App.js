import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import CarouselSlider from "./components/CarouselSlider/CarouselSlider";
import HomeReview from "./components/HomeReview/HomeReview";
import HomeBlog from "./components/HomeBlog/HomeBlog";
import HomeCategory from "./components/HomeCategory/HomeCategory";
import AboutUs from "./components/AboutUs/AboutUs";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import Contact from "./components/Contact/Contact";
import OurCase from "./components/OurCase/OurCase";
import OurCaseDetail from "./components/OurCaseDetail/OurCaseDetail";
import Event from "./components/Event/Event";
import EventDetail from "./components/EventDetail/EventDetail";
import Resources from "./components/Resources/Resources";
import Enquiry from "./components/Enquiry/Enquiry";

import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import AdminSideBar from "./components/admin/AdminSideBar/AdminSideBar";
import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
import AdminCarousel from "./components/admin/AdminCarousel/AdminCarousel";
import AdminCases from "./components/admin/AdminCases/AdminCases";
import AdminBlog from "./components/admin/AdminBlog/AdminBlog";
import AdminEvent from "./components/admin/AdminEvent/AdminEvent";
import AdminContact from "./components/admin/AdminContact/AdminContact";
import AdminAds from "./components/admin/AdminAds/AdminAds";

const Layout = ({ children }) => {
  const location = useLocation();

  const noHeaderFooterPaths = ["/admin-login"];

  const hideHeaderFooter =
    location.pathname.startsWith("/admin-side-bar") ||
    noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <ToastContainer autoClose={1000} />
        <Layout>
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <CarouselSlider />
                  <Home />
                  <HomeCategory />
                  <HomeReview />
                  <HomeBlog />
                </>
              }
            />
            {/* About Us Route */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-case" element={<OurCase />} />
            <Route
              path="/our-case-details/:title"
              element={<OurCaseDetail />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:category/:id" element={<BlogDetail />} />
            <Route path="/event" element={<Event />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<Enquiry />} />

            {/* admin-login's */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-side-bar" element={<AdminSideBar />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="carousel" element={<AdminCarousel />} />
              <Route path="cases" element={<AdminCases />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="event" element={<AdminEvent />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="ads" element={<AdminAds />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
