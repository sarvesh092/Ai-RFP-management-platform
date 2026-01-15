import { useState } from "react";
import RfpAndVendor from "./pages/RfpAndVendor";
import ProposalAndRecommendation from "./pages/ProposalAndRecommendation";

const App = () => {
  const [rfp, setRfp] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h1 style={{ marginBottom: 30, color: "#ffff" }}>
        AI-Powered RFP Management System
      </h1>

      <RfpAndVendor
        rfp={rfp}
        setRfp={setRfp}
        vendors={vendors}
        setVendors={setVendors}
        selectedVendors={selectedVendors}
        setSelectedVendors={setSelectedVendors}
      />

      {rfp && (
        <ProposalAndRecommendation
          rfp={rfp}
          selectedVendors={selectedVendors}
        />
      )}
    </div>
  );
};

export default App;
