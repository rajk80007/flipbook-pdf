import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const FlipBook = ({ pdfUrl }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    console.log(numPages);
  };

  const  goToPage = (page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    // Reset page when PDF is changed
    setPageNumber(1);
  }, [pdfUrl]);

  return (
    <div className="flipbook-container">
      <div className="flipbook-nav flex w-[800px]">
        <button onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber <= 1}
        className='btn'>
          Previous
        </button>
        <span>Page {pageNumber} of {totalPages}</span>
        <button onClick={() => goToPage(pageNumber + 1)} 
            className='btn'>
          Next
        </button>
      </div>
      <div className="pdf-viewer">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl}
          onLoadSuccess={onLoadSuccess} 
          initialPage={pageNumber-1}
          className="flex w-full h-screen overflow-auto"/>
          
        </Worker>
      </div>
    </div>
  );
};

export default FlipBook;
