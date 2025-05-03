export const BASE_URL = "https://astonishlaw.digispheretech.in";

// AdminSignin
export const Admin_Login = BASE_URL + "/admin/adminlogin";

// Carousel
export const CAROUSEL_API = {
  ADD: `${BASE_URL}/carousel/addcarousel`,
  GET_ALL: `${BASE_URL}/carousel/getallcarousel`,
  UPDATE: `${BASE_URL}/carousel/updateCarousel`,
  DELETE: `${BASE_URL}/carousel/deletecarousel`,
};

// Cases
export const CASES_API = {
  ADD_CASES: `${BASE_URL}/case/addcase`,
  GET_ALL_CASES: `${BASE_URL}/case/getallcases`,
  UPDATE_CASES: `${BASE_URL}/case/updatecase`,
  DELETE_CASES: `${BASE_URL}/case/deletecase`,
};

// Events
export const EVENT_API = {
  ADD_EVENT: `${BASE_URL}/event/addEvent`,
  GET_ALL_EVENT: `${BASE_URL}/event/getAllEvents`,
  UPDATE_EVENT: `${BASE_URL}/event/updateevent`,
  DELETE_EVENT: `${BASE_URL}/event/deleteEvent`,
};

// Add Management
export const ADS_API = {
  ADD_ADS: `${BASE_URL}/ads/addAds`,
  GET_ALL_ADS: `${BASE_URL}/ads/getallads`,
  UPDATE_ADS: `${BASE_URL}/ads/UpdateAds`,
  DELETE_ADS: `${BASE_URL}/ads/deleteads`,
};

// Contact
export const CONTACT_API = {
  ADD_CONTACT: `${BASE_URL}/contact/addcontact`,
  GET_ALL_CONTACT: `${BASE_URL}/contact/getallcontact`,
  UPDATE_CONTACT: `${BASE_URL}/contact/updateContacts`,
  DELETE_CONTACT: `${BASE_URL}/contact/deletecontact`,
  USER_SIDE_GET_CONTACT: `${BASE_URL}/contact/getcontactlatest`,
};
