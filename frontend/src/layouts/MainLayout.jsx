import { Layout } from "antd";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: 24,
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div className="demo-logo-vertical flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mx-0">
            AI
          </div>
          <span className="font-semibold text-lg text-gray-800">
            AI RFP Platform
          </span>
        </div>
      </Header>
      <Content
        style={{
          margin: "24px auto",
          padding: "0 24px",
          maxWidth: 1400,
          width: "100%",
          minHeight: 280,
          overflowY: "auto",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
