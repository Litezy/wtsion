import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeneralPages } from "./utils/pageLinks";
import PageLayout from "./Layouts/PageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          {GeneralPages.map((page, ind) => (
            <Route key={ind} path={page.path} element={<page.component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
