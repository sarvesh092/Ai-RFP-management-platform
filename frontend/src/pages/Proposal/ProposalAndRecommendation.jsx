import React, { useState, useEffect, useCallback } from "react";
import { Typography, Tag, Space, Button, Skeleton } from "antd";
import { FileTextOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProposalsApi,
  getRfpByIdApi,
  getVendorsApi,
} from "../../api/api.call";
import ParseVendorProposal from "./Subscreens/ParseVendorProposal";
import CompareAndRecommendation from "./Subscreens/CompareAndRecommendation";

const { Text } = Typography;

const ProposalAndRecommendation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rfp, setRfp] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [rfpRes, vendorsRes] = await Promise.all([
          getRfpByIdApi(id),
          getVendorsApi(),
        ]);

        setRfp(rfpRes.data);
        setVendors(vendorsRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const loadProposals = useCallback(async () => {
    if (!rfp) return;
    try {
      const res = await getProposalsApi(rfp._id);
      setProposals(res.data);
    } catch (error) {
      console.error(error);
      setProposals([]);
    }
  }, [rfp]);

  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton active />
      </div>
    );
  }

  if (!rfp) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
        <FileTextOutlined
          style={{ fontSize: 48, color: "#d9d9d9", marginBottom: 16 }}
        />
        <Text type="secondary">
          Please select or generate an RFP to view proposals.
        </Text>
        <Button
          type="primary"
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-500 border-blue-600"
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex items-start">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          className="p-0 text-gray-500 hover:text-blue-600"
        >
          Back to Dashboard
        </Button>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
            <FileTextOutlined style={{ fontSize: "20px" }} />
          </div>
          <div>
            <Text strong className="block text-base text-gray-800">
              {rfp.title || "Untitled RFP"}
            </Text>
            <Space size="small">
              <Text type="secondary" className="text-xs">
                RFP ID:
              </Text>
              <Tag className="m-0 bg-gray-50 border-gray-200 text-gray-500 font-mono">
                {rfp._id}
              </Tag>
            </Space>
          </div>
        </div>
      </div>

      <ParseVendorProposal
        rfp={rfp}
        vendors={vendors}
        onProposalParsed={loadProposals}
      />

      <CompareAndRecommendation rfp={rfp} proposals={proposals} />
    </div>
  );
};

export default ProposalAndRecommendation;
