import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  List,
  Checkbox,
  Typography,
  message,
  Space,
  Select,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SendOutlined,
  RobotOutlined,
  PlusOutlined,
  HistoryOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  generateRfpApi,
  getVendorsApi,
  addVendorApi,
  sendRfpApi,
  getAllRfpsApi,
} from "../../api/api.call";

const { TextArea } = Input;
const { Text } = Typography;

const GenerateRfp = () => {
  const navigate = useNavigate();
  const [rfp, setRfp] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [addingVendor, setAddingVendor] = useState(false);
  const [rfpList, setRfpList] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sending, setSending] = useState(false);

  // console.log(rfp);
  // console.log(vendors);
  // console.log(selectedVendors);

  const loadVendors = async () => {
    try {
      const res = await getVendorsApi();
      setVendors(res.data);
    } catch (error) {
      console.error("Failed to load vendors", error);
    }
  };

  const loadRfpHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await getAllRfpsApi();
      setRfpList(res.data);
    } catch (error) {
      console.error("Failed to load RFP history", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadVendors();
    loadRfpHistory();
  }, []);

  const generateRfp = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await generateRfpApi(text);
      setRfp(res.data);
      message.success("RFP Generated Successfully!");
      loadRfpHistory();
    } catch (error) {
      console.error(error);
      message.error("Failed to generate RFP");
    } finally {
      setLoading(false);
    }
  };

  const addVendor = async () => {
    if (!vendorName || !vendorEmail) return;
    setAddingVendor(true);
    try {
      await addVendorApi({ name: vendorName, email: vendorEmail });
      await loadVendors();
      setVendorName("");
      setVendorEmail("");
      message.success("Vendor added successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to add vendor");
    } finally {
      setAddingVendor(false);
    }
  };

  const sendRfpToVendors = async () => {
    if (!rfp || !selectedVendors.length) return;
    setSending(true);
    try {
      await sendRfpApi(rfp._id, selectedVendors);
      message.success("RFP sent to selected vendors");
    } catch (error) {
      console.error(error);
      message.error("Failed to send RFP");
    } finally {
      setSending(false);
    }
  };

  const toggleVendorSelection = (id) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors((prev) => prev.filter((vId) => vId !== id));
    } else {
      setSelectedVendors((prev) => [...prev, id]);
    }
  };

  const handleHistorySelect = (id) => {
    const selected = rfpList.find((r) => r._id === id);
    if (selected) {
      setRfp(selected);
      message.info("Loaded previous RFP");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 space-y-6">
        <Card
          title={
            <>
              <RobotOutlined className="mr-2 text-blue-500" /> Generate RFP
            </>
          }
          className="shadow-sm border-gray-100 h-full flex flex-col"
          styles={{
            body: { flex: 1, display: "flex", flexDirection: "column" },
          }}
        >
          <div className="mb-6">
            <Text
              type="secondary"
              className="mb-2 block flex items-center gap-2"
            >
              <HistoryOutlined /> Previous Generated RFPs
            </Text>
            <Select
              showSearch
              style={{ width: "100%", cursor: "pointer" }}
              placeholder="Select a previously generated RFP"
              onChange={handleHistorySelect}
              value={rfp?.title}
              loading={loadingHistory}
              options={rfpList.map((r) => ({
                value: r._id,
                label: r.title,
              }))}
            />
            <Divider>Or Generate New</Divider>
          </div>

          <div className="mb-4">
            <Text type="secondary" className="mb-2 block">
              Tell us what you need, and we'll generate an RFP for you.
            </Text>
            <TextArea
              rows={6}
              placeholder="Describe your procurement needs in detail..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mb-4 resize-none"
              style={{ borderRadius: 8 }}
            />
            <Button
              type="primary"
              icon={<RobotOutlined />}
              onClick={generateRfp}
              loading={loading}
              disabled={!text}
              block
              size="large"
              style={{ borderRadius: 8 }}
            >
              Generate RFP
            </Button>
          </div>

          {rfp && (
            <div className="flex-1 overflow-auto mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <Text strong>Generated Content:</Text>
              </div>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono flex-1">
                {JSON.stringify(rfp, null, 2)}
              </pre>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  block
                  type="default"
                  onClick={() => navigate(`/proposals/${rfp._id}`)}
                  icon={<FileTextOutlined />}
                  className="border-blue-200 text-blue-600 hover:text-blue-700 hover:border-blue-400"
                >
                  Parse Vendor Proposals for this RFP
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="flex-1 lg:max-w-md space-y-6">
        <Card
          title={
            <>
              <UserOutlined className="mr-2 text-blue-500" /> Vendors
            </>
          }
          className="shadow-sm border-gray-100 h-full flex flex-col"
          styles={{
            body: { flex: 1, display: "flex", flexDirection: "column" },
          }}
        >
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
            <Text strong className="mb-3 block">
              Add New Vendor
            </Text>
            <Space orientation="vertical" className="w-full">
              <Input
                placeholder="Vendor Name"
                prefix={<UserOutlined className="text-gray-400" />}
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              />
              <Input
                placeholder="Vendor Email"
                prefix={<MailOutlined className="text-gray-400" />}
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
              />
              <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                onClick={addVendor}
                loading={addingVendor}
                disabled={!vendorName || !vendorEmail}
              >
                Add to List
              </Button>
            </Space>
          </div>

          <div className="flex-1 overflow-auto">
            <Text strong className="mb-3 block">
              Select Vendors to Send RFP
            </Text>
            <List
              itemLayout="horizontal"
              dataSource={vendors}
              renderItem={(vendor) => (
                <List.Item
                  className="hover:bg-gray-50 transition-colors rounded-lg px-2 cursor-pointer"
                  onClick={() => toggleVendorSelection(vendor._id)}
                >
                  <List.Item.Meta
                    avatar={
                      <Checkbox
                        checked={selectedVendors.includes(vendor._id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleVendorSelection(vendor._id)}
                      />
                    }
                    title={<Text strong>{vendor.name}</Text>}
                    description={
                      <Text type="secondary" className="text-xs">
                        {vendor.email}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
            {vendors.length === 0 && (
              <div className="text-center p-4 text-gray-400">
                No vendors found
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Button
              type="primary"
              block
              size="large"
              disabled={!rfp || selectedVendors.length === 0 || sending}
              onClick={sendRfpToVendors}
              icon={<SendOutlined />}
              className="bg-blue-600"
            >
              {sending ? "Sending..." : `Send RFP (${selectedVendors.length})`}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GenerateRfp;
