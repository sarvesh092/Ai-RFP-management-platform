import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import GenerateRfp from "./pages/Generate-RFPs/GenerateRfp";
import ProposalAndRecommendation from "./pages/Proposal/ProposalAndRecommendation";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<GenerateRfp />} />
          <Route
            path="/proposals/:id?"
            element={<ProposalAndRecommendation />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
