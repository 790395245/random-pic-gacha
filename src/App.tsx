import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Header from "./components/Header";
import Home from "./pages/Home";
import Collection from "./pages/Collection";

const queryClient = new QueryClient();

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1890ff',
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 flex flex-col items-center">
          <div className="w-[1440px] max-w-full bg-white min-h-screen shadow-sm flex flex-col">
            <Header />
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </ConfigProvider>
);

export default App;