import React, { useState } from "react";
import { Card, Input, Button, Select, Typography, message } from "antd";
import { MessageOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { parseProposalApi } from "../../../api/api.call";

const { TextArea } = Input;
const { Text } = Typography;

const ParseVendorProposal = ({ rfp, vendors, onProposalParsed }) => {
  const [proposalText, setProposalText] = useState("");
  const [parsingVendorId, setParsingVendorId] = useState(null);
  const [loadingParse, setLoadingParse] = useState(false);

  const parseProposal = async () => {
    if (!proposalText || !rfp || !parsingVendorId) return;
    setLoadingParse(true);
    try {
      await parseProposalApi({
        rfpId: rfp._id,
        vendorId: parsingVendorId,
        text: proposalText,
      });

      setProposalText("");
      setParsingVendorId(null);
      if (onProposalParsed) {
        await onProposalParsed();
      }
      message.success("Vendor proposal parsed successfully and added to table");
    } catch (error) {
      console.error(error);
      message.error("Failed to parse proposal");
    } finally {
      setLoadingParse(false);
    }
  };

  return (
    <Card
      title={
        <>
          <MessageOutlined className="mr-2 text-blue-500" /> Parse Vendor
          Response
        </>
      }
      className="shadow-sm border-gray-100"
    >
      <div className="mb-4">
        <Text className="mb-2 block font-medium">Select Vendor</Text>
        <Select
          style={{ width: "100%", maxWidth: 400 }}
          placeholder="Select the vendor who sent this proposal"
          value={parsingVendorId}
          onChange={setParsingVendorId}
          options={vendors.map((v) => ({ label: v.name, value: v._id }))}
        />
      </div>

      <Text className="mb-2 block font-medium">Vendor Response</Text>
      <TextArea
        rows={5}
        className="mb-4"
        disabled={!parsingVendorId}
        placeholder="Paste vendor response here..."
        value={proposalText}
        onChange={(e) => setProposalText(e.target.value)}
        style={{ borderRadius: 8 }}
      />
      <Button
        type="primary"
        onClick={parseProposal}
        loading={loadingParse}
        disabled={!proposalText || !parsingVendorId}
        icon={<CheckCircleOutlined />}
      >
        Parse Response
      </Button>
    </Card>
  );
};

export default ParseVendorProposal;
