import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AddPersonTab from "./components/AddPersonTab";
import RetrieveDataTab from "./components/RetrieveDataTab";
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState("addTab");
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#dbeafe] p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg">
          <button
            className={`px-6 py-3 w-full transition-all duration-300 ${
              activeTab === "addTab" ? "bg-indigo-700" : "bg-indigo-500"
            }`}
            onClick={() => setActiveTab("addTab")}
          >
            Add New Tab
          </button>

          <button
            className={`px-6 py-3 w-full transition-all duration-300 ${
              activeTab === "retrieve" ? "bg-indigo-700" : "bg-indigo-500"
            }`}
            onClick={() => setActiveTab("retrieve")}
          >
            Retrieve Information
          </button>
        </div>

        <div className="p-6">
          {activeTab === "addTab" ? <AddPersonTab/> : <RetrieveDataTab/>}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
