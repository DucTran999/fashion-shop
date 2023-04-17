import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

import { PrimaryLayout } from "./layouts";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            // Finding the matched route
            publicRoutes.map((route, index) => {
              // Get Layout
              let Layout = PrimaryLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              // Get Page
              let Page = route.component;

              // Render
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
