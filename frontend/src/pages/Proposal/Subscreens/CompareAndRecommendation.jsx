import React, { useState } from "react";
import {
  Card,
  Button,
  Table,
  Typography,
  Empty,
  Tag,
  Space,
  message,
} from "antd";
import { BarChartOutlined, BulbOutlined } from "@ant-design/icons";
import { recommendVendorApi } from "../../../api/api.call";

const { Title, Text, Paragraph } = Typography;

const CompareAndRecommendation = ({ rfp, proposals = [] }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loadingRec, setLoadingRec] = useState(false);

  const getRecommendation = async () => {
    if (!proposals.length || !rfp) return;
    setLoadingRec(true);
    try {
      const res = await recommendVendorApi(rfp._id);
      setRecommendation(res.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to get recommendation");
    } finally {
      setLoadingRec(false);
    }
  };
//   console.log(proposals);
  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendor",
      render: (text, record) => (
        <Text strong style={{ color: "#1677ff" }}>
          {text || record.vendorId?.name || "Unknown"}
        </Text>
      ),
    },
    {
      title: "Items",
      key: "items",
      width: 300,
      render: () => (
        <Text style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>
          {rfp?.items
            ?.map((i) => `- ${i.name} x${i.quantity} (${i.specs})`)
            .join("\n")}
        </Text>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "price",
      render: (price) =>
        price ? (
          <Text strong>${price.toLocaleString()}</Text>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
      sorter: (a, b) => (a.totalPrice || 0) - (b.totalPrice || 0),
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryDays",
      key: "delivery",
      render: (days) => (days ? `${days} Days` : "N/A"),
      sorter: (a, b) => (a.deliveryDays || 0) - (b.deliveryDays || 0),
    },
    {
      title: "Payment Terms",
      dataIndex: "paymentTerms",
      key: "payment",
      render: (terms) => terms || "N/A",
    },
    {
      title: "Warranty Period",
      dataIndex: "warranty",
      key: "warranty",
      render: (warranty) => warranty || "N/A",
    },
  ];

  return (
    <div className="space-y-6 flex flex-col gap-6">
      <Card
        title={
          <>
            <BarChartOutlined className="mr-2 text-blue-500" /> Compare
            Proposals
          </>
        }
        className="shadow-sm border-gray-100"
      >
        {proposals.length === 0 ? (
          <Empty
            description="No proposals yet. Parse a response above."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <Table
            dataSource={proposals}
            columns={columns}
            rowKey="_id"
            pagination={false}
            bordered
            size="middle"
            scroll={{ x: true }}
          />
        )}
      </Card>

      <Card
        title={
          <>
            <BulbOutlined className="mr-2 text-purple-500" /> AI Recommendation
          </>
        }
        className="shadow-sm border-gray-100"
      >
        <div className="mb-4">
          <Button
            type="primary"
            onClick={getRecommendation}
            disabled={!proposals.length}
            loading={loadingRec}
            className="bg-purple-600 hover:bg-purple-500 border-purple-600"
            icon={<BulbOutlined />}
          >
            Recommend Best Vendor
          </Button>
        </div>

        {recommendation && (
          <div className="mt-4 p-5 bg-purple-50 rounded-lg border border-purple-100">
            <Title level={4} style={{ color: "#531dab", marginBottom: 8 }}>
              Recommended Vendor:{" "}
              <span className="underline">
                {recommendation.recommendedVendor}
              </span>
            </Title>
            <Paragraph className="text-gray-700 text-base">
              {recommendation.reasoning}
            </Paragraph>

            <Text strong className="block mb-2 text-purple-800">
              Key Considerations:
            </Text>
            <Space direction="vertical">
              {recommendation.considerations.map((c, i) => (
                <Tag
                  color="purple"
                  key={i}
                  className="px-3 py-1 text-sm border-0 bg-purple-100 text-purple-800"
                >
                  {c}
                </Tag>
              ))}
            </Space>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CompareAndRecommendation;
