import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";
import Home from "./pages/Home";
import Iplogs from "./pages/Iplogs";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ip-logs" element={<Iplogs />} />
            {/* {<Route path="blog" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> } */}
          </Route>
          {/* <Route path="/error" element={<Server_error />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
