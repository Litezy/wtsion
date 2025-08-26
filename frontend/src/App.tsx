import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GeneralPages } from "./utils/pageLinks";
import PageLayout from "./Layouts/PageLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PageLayout />}>
          {GeneralPages.map((page, ind) => (
            <Route key={ind} path={page.path} element={<page.component />} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
