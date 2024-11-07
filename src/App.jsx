// src/App.jsx
import { useState } from "react";
import FlipBook from "./FlipBook";

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setIsUploading(true);
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      setIsUploading(false);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl; // Use the object URL created earlier
      link.download = pdfUrl.name; // Name the downloaded file as the uploaded file's name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the link element
    }
  };


  return (
    <div className="App bg-gray-50 min-h-screen flex items-center justify-center py-10">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">PDF to Flipbook Converter</h1>
        <p className="mt-2 text-lg text-gray-700">Upload a PDF to view it as a flipbook</p>
      </header>

      <div className="upload-section mb-10">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block mx-auto mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
        />
        {isUploading && (
          <p className="text-center text-blue-500 font-semibold">Uploading PDF...</p>
        )}
      </div>

      {/* Display the Flipbook when PDF is loaded */}
      {pdfUrl && <FlipBook pdfUrl={pdfUrl} />}

      {/* Download button */}
      {pdfUrl && (
        <div className="mt-10 text-center">
          <button
            onClick={handleDownload}
            className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
