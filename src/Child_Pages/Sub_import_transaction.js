// import ipaddress from "../Components/IpAddress";
// import { redirect } from "react-router-dom";
// import AuthContext from "../Components/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext, useRef } from "react";
// import "../Components/Style.css";
// import html2canvas from "html2canvas";
// import { renderToStaticMarkup } from "react-dom/server";

// import jsPDF from "jspdf";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import FileSaver from "file-saver"; // This library is used for saving the file
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import dgdcImage from "../Images/report.jpeg";
// import Pagination from 'react-bootstrap/Pagination';
// import "../Parent_Pages/parent.css";
// import { CardBody, Label } from "reactstrap";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowsToEye, faBorderAll, faFileAlt, faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";

// import {
//   faCheck,
//   faSave,
//   faTimes,
//   faSyncAlt,
//   faFileExcel,
//   faFilePdf,
//   faPrint,
// } from "@fortawesome/free-solid-svg-icons";
// import { Table } from "react-bootstrap";
// import { Line, PDFDownloadLink, pdf } from "@react-pdf/renderer";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image,
// } from "@react-pdf/renderer";
// import { BlobProvider } from "@react-pdf/renderer";
// import { setActiveLink } from "react-scroll/modules/mixins/scroller";
// import { toast } from "react-toastify";
// const CustomHeader = () => {
//   return (
//     <View style={styles.header}>
//       <Image src={dgdcImage} style={styles.headerImage} />
//     </View>
//   );
// };





// const styles = StyleSheet.create({
//   centeredTextContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom:7,
//   },
//   rightText: {
//     fontSize: 10,
//     textAlign: "right", // Center text horizontally
//   },
//   centeredText: {
//     fontSize: 10,
//     textAlign: "center", // Center text horizontally
//   },
//   headerText: {
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   page: {
//     paddingTop: 18,
//     paddingBottom: 60,
//     paddingHorizontal: 30,
//   },
//   header: {
//     marginBottom: 5,
//   },
//   heading: {
//     fontSize: 10,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",
//   },

//   leftColumn: {
//     width: "100%",
//     paddingTop: 9,
//   },
//   headingwithbox: {
//     fontSize: 10,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",

//     // Add padding for space between text and border
//   },
//   viewheadingwithbox: {
//     border: "1px solid black",
//     padding: 5,
//   },
//   paragraph: {
//     fontSize: 10,
//     marginBottom: 5,
//   },
//   headingwithborder: {
//     fontSize: 10,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",
//     borderBottom: "1px solid black",
//     // Add padding for space between text and border
//   },
//   image: {
//     width: 306,
//     height: 100,
//     marginBottom: 0,
//     marginLeft: 117,
//     justifyContent: "center",
//   },

//   dateSize: {
//     fontSize: 8,
//   },
//   normaltext: {
//     fontSize: 10,
//     marginTop: 18,
//     fontWeight: "bold",
//   },
//   line: {
//     width: "100%", // Adjust the width of the line
//     marginTop: 4, // Adjust the space above the line
//     marginBottom:5, // Adjust the space below the line
//     borderTop: "0.2pt solid black", // Style the line
//   },

//   tableRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   tableCell: {
//     border: "0.3px solid #000",
//     padding: 1,
//     flexWrap: "wrap",
//     width: 52,
//     textAlign:'center',
//     fontSize: 7,
//   },
//   tableCellHeader: {
//     fontWeight: "bold",
//     flexWrap: "wrap",
//     width: 52,
//     fontWeight: "bold",
//     fontSize: 9,
//     textAlign:'center',
//   },
//   table: {
//     width: "100%",
//     marginBottom: 4,
//     flexWrap: "wrap",
//   },
// });


// const PAGE_BREAK_ROWS = 10; // Adjust this based on how many rows fit on one page


// export default function Sub_import_transaction() {
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     login,
//     logout,
//   } = useContext(AuthContext);

//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);
//   const [ReordList, setReordList] = useState([]);

//   const totalSirNoCount = ReordList.length;

//   const totaleImpNoOfPackages = ReordList.reduce(
//     (total, item) => total + item.nop,
//     0
//   );


//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);

//   const today = new Date();
//   const [JarListDtlDGDC, setJarListDtlDGDC] = useState([]);

//   const formatedDate = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${day}/${month}/${year}`;
//   };


//   function fetchExporterName(companyId, branchId, partyId) {
//     // Make an Axios GET request to retrieve the company name based on companyId
//     return axios
//       .get(
//         `http://${ipaddress}importsub/findPartyName/${companyId}/${branchId}/${partyId}`
//       )
//       .then(function (response) {
//         return response.data; // Return the retrieved company name
//       })
//       .catch(function (error) {
//         console.error("Error fetching company name:", error);
//         return ""; // Return an empty string or handle the error as needed
//       });
//   }










//   const MyPDFDocument = ({ sbCount, noOfPackages, ReordList }) => (
//     <Document>
//       {Array.from({
//         length: Math.ceil(ReordList.length / PAGE_BREAK_ROWS),
//       }).map((_, pageIndex) => (
//         <Page key={pageIndex} size="A4" style={styles.page}>
//           <CustomHeader />
//           <View>
//             <Text style={styles.centeredText}>
//               Date: {formatedDate(searchCriteria.sirDate)}
//             </Text>
//             <Text style={styles.centeredText}>
//               Status:{searchCriteria.dgdcStatus}
//               {"\n\n"}
//             </Text>

//             <Text style={styles.headerText}>
//               Subcontract Import Transaction
//             </Text>
//           </View>

//           <View style={styles.table}>
//             {" "}
//             <View style={styles.tableRow}>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap", width: 31 },
//                 ]}
//               >
//                 Sl.No.
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap", width: 63 },
//                 ]}
//               >
//                 SIR Date
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap", width: 63 },
//                 ]}
//               >
//                 SIR No
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap" },
//                 ]}
//               >
//                 Parcel Type
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap", width: 63 },
//                 ]}
//               >
//                 Importer Name
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap", width: 31 },
//                 ]}
//               >
//                 NOP
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   { flexWrap: "wrap" },
//                 ]}
//               >
//                 Invoice No
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   { flexWrap: "wrap" },
//                 ]}
//               >
//                 Challan No
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   { flexWrap: "wrap" },
//                 ]}
//               >
//                 BE REQUEST ID
//               </Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   {  flexWrap: "wrap", width: 72 },
//                 ]}
//               >
//                 Current Status
//               </Text>
//             </View>
//             {ReordList.slice(
//               pageIndex * PAGE_BREAK_ROWS,
//               (pageIndex + 1) * PAGE_BREAK_ROWS
//             ).map((item, index) => (
//               <View style={styles.tableRow} key={index}>
//                 <Text style={{ ...styles.tableCell, width: 31 }}>
//                   {index + 1 + pageIndex * PAGE_BREAK_ROWS}
//                 </Text>
//                 <Text style={{ ...styles.tableCell, width: 63 }}>
//                   {formatedDate(item.sirDate)}
//                 </Text>
//                 <Text style={{ ...styles.tableCell, width: 63 }}>
//                   {item.sirNo}
//                 </Text>
//                 <Text style={{ ...styles.tableCell }}>{item.importType}</Text>
//                 <Text style={{ ...styles.tableCell, width: 63 }}>
//                   {getpartyId[item.exporter]}
//                 </Text>
//                 <Text style={{ ...styles.tableCell, width: 31 }}>
//                   {item.nop}
//                 </Text>
//                 <Text style={{ ...styles.tableCell }}>{item.invoiceNo}</Text>
//                 <Text style={{ ...styles.tableCell }}>{item.challanNo}</Text>
//                 <Text style={{ ...styles.tableCell }}>{item.requestId}</Text>
//                 <Text style={{ ...styles.tableCell, width: 72 }}>
//                   {item.dgdcStatus}
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* Display the "Total" row only on the last page */}
//           {pageIndex === Math.ceil(ReordList.length / PAGE_BREAK_ROWS) - 1 && (
//             <View style={styles.tableRow}>
//               <Text style={{ ...styles.tableCell, width: 31 }}>Total</Text>
//               <Text style={{ ...styles.tableCell, width: 63 }}></Text>
//               <Text
//                 style={[
//                   styles.tableCell,
//                   styles.tableCellHeader,
//                   { width: 63 },
//                 ]}
//               >
//                 {sbCount}
//               </Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell, width: 63 }}></Text>
//               <Text style={{ ...styles.tableCell, width: 31 }}>
//                 {noOfPackages}
//               </Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell, width: 72 }}></Text>
//             </View>
//           )}
//           <View>
//             <Text style={styles.rightText}>{"\n\n"}(For DGDC LIMITED)</Text>
//           </View>
//         </Page>
//       ))}
//     </Document>
//   );


//   const initialSearchCriteria = {
//     companyId: companyid,
//     branchId: branchId,
//     dgdcStatus: "",
//     sirDate: new Date(),
//   };



//   const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);

 

//   useEffect(() => {
//     getlist();
//   }, []);

//   const getlist = () => {
//     axios
//       .get(`http://${ipaddress}jardetail/dgdcstatus/${companyid}`)
//       .then((response) => {
//         setJarListDtlDGDC(response.data);
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const handleShow = () => {
//     axios
//       .get(`http://${ipaddress}importsub/importSubTransaction`, {
//         params: searchCriteria,
//       })
//       .then((response) => {
//         setReordList(response.data);

//         toast.success("Data  Found !", {
//           position: "top-center",
//           autoClose: 540, // Duration in milliseconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
        
//       })
//       .catch((error) => {
//         toast.error("Data Not Found !", {
//           position: "top-center",
//           autoClose: 540, // Duration in milliseconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setReordList([]);
//         console.error("GET list error:", error);
//       });
//   };

//   const handleRest = () => {
//     setSearchCriteria({
//       ...searchCriteria,
//       dgdcStatus: "", // Clear the dgdcStatus
//       sirDate: new Date(), // Set sbDate to today's date
//     });
//   };

//   function fetchCompanyName(companyId) {
//     // Make an Axios GET request to retrieve the company name based on companyId
//     return axios
//       .get(`http://${ipaddress}importsub/findCompanyname/${companyId}`)
//       .then(function (response) {
//         return response.data; // Return the retrieved company name
//       })
//       .catch(function (error) {
//         console.error("Error fetching company name:", error);
//         return ""; // Return an empty string or handle the error as needed
//       });
//   }

//   function fetchBranchName(companyId, branchId) {
//     // Make an Axios GET request to retrieve the branch name based on branchId
//     return axios
//       .get(
//         `http://${ipaddress}importsub/findBranchName/${companyId}/${branchId}`
//       )
//       .then(function (response) {
//         return response.data; // Return the retrieved branch name
//       })
//       .catch(function (error) {
//         console.error("Error fetching branch name:", error);
//         return ""; // Return an empty string or handle the error as needed
//       });
//   }

//   const generateXLS = async () => {
//     const modifiedRecordList = await Promise.all(
//       currentItems.map(async (item, index) => {
//         // const companyname = await fetchCompanyName(item.companyId);
//         // const branchname = await fetchBranchName(item.companyId, item.branchId);
//         const partyName = await fetchExporterName(
//           item.companyId,
//           item.branchId,
//           item.exporter
//         );
//         return {
//           "Sr.No": index + 1,
//           // "Company Name": companyname,
//           // "Branch Name": branchname,
//           "SIR Date": formatedDate(item.sirDate) || "",
//           "SIR No": item.sirNo || "",
//           "PARCEL TYPE": item.importType || "",
//           "Importer Names": getpartyId[item.exporter] || "",
//           "NO OF PKGS": item.nop || "",
//           "INVOICE NO": item.invoiceNo || "", // Modify this to the actual field name
//           "CHALLON NO": item.challanNo || "",
//           "BE REQUEST ID": item.requestId || "",
//           "CURRENT STATUS": item.dgdcStatus || "",
//         };
//       })
//     );

//     // Calculate the total "SIR No" and "No of Pkgs"
//     const totalSIRNo = modifiedRecordList.reduce(
//       (total, item) => total + (item["SIR No"] ? 1 : 0),
//       0
//     );

//     const totalNoOfPkgs = modifiedRecordList.reduce(
//       (total, item) => total + (item["NO OF PKGS"] || 0),
//       0
//     );
//     const distanceRow = {
//       "Sr.No": "",
//       // "Company Name": "",
//       // "Branch Name": "",
//       "SIR Date": "",
//       "SIR No": "",
//       "PARCEL TYPE": "",
//       "Importer Names": "",
//       "NO OF PKGS": "",
//       "INVOICE NO": "", // Modify this to the actual field name
//       "CHALLON NO": "",
//       "BE REQUEST ID": "",
//       "CURRENT STATUS": "",
//     };
//     // Add a total row
//     const totalRow = {
//       "Sr.No": "Total ",
//       // "Company Name": "",
//       // "Branch Name": "",
//       "SIR Date": "",
//       "SIR No": totalSIRNo,
//       "PARCEL TYPE": "",
//       "Importer Names": "",
//       "NO OF PKGS": totalNoOfPkgs,
//       "INVOICE NO": "", // Modify this to the actual field name
//       "CHALLON NO": "",
//       "BE REQUEST ID": "",
//       "CURRENT STATUS": "",
//     };

//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet([
//       distanceRow,
//       ...modifiedRecordList,
//       distanceRow, // Insert the distance row
//       totalRow, // Insert the total row
//     ]);

//     // Add headers for all fields
//     const headers = Object.keys(modifiedRecordList[0]);
//     headers.forEach((header, index) => {
//       worksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
//         t: "s",
//         v: header,
//         s: { font: { bold: true } },
//       };
//     });

//     // Set column widths based on data
//     const colWidths = headers.map((header) => ({
//       wch: header.length + 2, // You can adjust the width as needed
//     }));

//     worksheet["!cols"] = colWidths;

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sub_Import_Register");
//     const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
//     const blob = new Blob([s2ab(xlsFile)], {
//       type: "application/vnd.ms-excel",
//     });
//     saveAs(blob, "Sub_import_transaction.xls");
//   };

//   const s2ab = (s) => {
//     const buf = new ArrayBuffer(s.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
//     return buf;
//   };

//   const sbCount = ReordList.filter(
//     (item) => item.sbNo !== null && item.sbNo !== ""
//   ).length;

//   const noOfPackages = ReordList.reduce((total, item) => {
//     if (item.nop !== null && !isNaN(item.nop)) {
//       return total + parseInt(item.nop, 10);
//     }
//     return total;
//   }, 0);

//   const handlePrint = () => {
//     const isoDate = new Date().toISOString();
//     const date = new Date(isoDate);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear().toString();
  
//     const printWindow = window.open("", "_blank");
//     printWindow.document.open();
  
//     const recordsPerPage = 16;
//     const recordChunks = splitArrayIntoChunks(ReordList, recordsPerPage);
  
//     recordChunks.forEach((chunk, chunkIndex) => {
//       if (chunkIndex > 0) {
//         // Insert a page break before the new page
//         printWindow.document.write('<div style="page-break-before: always;"></div>');
//       }
  
//       // Create a new page
//       printWindow.document.write(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <title>Import Sub Transaction Report</title>
    
//         <style>
//           @page {
//             margin: 1cm;
//           }
    
//           .printable-area {
//             font-family: Arial, sans-serif;
//           }
    
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
    
//           td {
//             border: 1px solid #dddddd;
//             text-align: center;
//             padding: 1px;
//             font-size: 10px;
//           }
    
//           th {
//             border: 1px solid #dddddd;
//             background-color: #f2f2f2;
//             text-align: center;
//             font-size: 12px;
//           }
    
//           .header img {
//             max-width: auto;
//             max-height: auto;
//           }
    
//           #page-header {
//             position: static;
//             top: 0;
//             left: 0;
//             right: 0;
//             text-align: center;
//           }
//         </style>
//         </head>
//         <body>
//         <div id="page-header">
//         <img src="${dgdcImage}" alt="Header Image" style="max-width: 306px; display: block; margin: 0 auto;"></br>
//         <div style="text-align: center;">
//         <div style="font-size: 12px;">
//         <strong>Date : ${formatedDate(searchCriteria.sirDate)}</strong></br>
//         <strong>Status : ${searchCriteria.dgdcStatus}</strong>
//         </div>
//         </div>
//         </div>
//         <div class="content">
//         <div style="font-size: 12px;padding-bottom;0px;"> <strong>Subcontract Import Transaction Report</strong></div>
//         <table>
//           <thead>
//             <tr>
//               <th>Sr.No</th>
//               <th>Sir Date</th>
//               <th>Sir No</th>
//               <th>Importer Name</th>
//               <th>NOP</th>
//               <th>Invoice No</th>
//               <th>Challan No</th>
//               <th>BE REQUEST ID</th>
//               <th>Current Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${chunk.map((item, index) => `
//               <tr>
//                 <td>${chunkIndex * recordsPerPage + index + 1}</td>
//                 <td>${formatedDate(item.sirDate) || ''}</td>
//                 <td>${item.sirNo || ''}</td>
//                 <td>${getpartyId[item.exporter] || ''}</td>
//                 <td>${item.nop || ''}</td>
//                 <td>${item.invoiceNo || ''}</td>
//                 <td>${item.challanNo || ''}</td>
//                 <td>${item.requestId || ''}</td>
//                 <td>${item.dgdcStatus || ''}</td>
//               </tr>
//             `).join("")}
//           </tbody>
//         </table>
//         </div>
//         <div>
//         <p style="float: right; margin-right: 20px; margin-top: 4px; font-size: 12px;">(For DGDC LIMITED)</p>
//         </div>
//         </body>
//         </html>
//       `);
//     });
  
//     printWindow.document.close();
//     printWindow.print();
//     printWindow.onafterprint = () => printWindow.close();
//   };
  
//   // Function to split an array into chunks of a specified size
//   function splitArrayIntoChunks(array, chunkSize) {
//     const chunks = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       chunks.push(array.slice(i, i + chunkSize));
//     }
//     return chunks;
//   }

//   const handlePDFDownload = async () => {
//     const pdfBlob = await pdf(
//       <MyPDFDocument {...{ sbCount, noOfPackages, ReordList }} />
//     ).toBlob();
//     saveAs(pdfBlob, "Sub_Import_Transaction.pdf");
//   };

  

//   const [partys, setPartys] = useState([]);

//   const [getpartyId, setGetpartyId] = useState({});

//   const fetchPartyNames = async () => {
//     try {
//       const response = await fetch(
//         `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
//       );
//       const data = await response.json();
//       const namesMap = {};
//       data.forEach((party) => {
//         namesMap[party.partyId] = party.partyName;
//       });
//       setGetpartyId(namesMap);
//       setPartys(data);
//     } catch (error) {
//       console.error("Error fetching party names:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPartyNames();
//   }, []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page

//   // Calculate the total number of pages based on the number of items and items per page
//   const totalPages = Math.ceil(ReordList.length / itemsPerPage);

//   // Calculate the index range for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // Slice the data for the current page
//   const currentItems = ReordList.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   return (
//     <div className="Container">
//    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//         icon={faFileAlt}
//         style={{
//           marginRight: '8px',
//           color: 'black', // Set the color to golden
//         }}
//       />Subcontract Import Transaction</h5>
//       <Card
//         style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
//       >
//         <div>
//           <Form>
//             <Row>
//               <Col sm={4}>
//                 <label className="forlabel">Select Date</label>
//                 <div>
//                   <DatePicker
//                     selected={searchCriteria.sirDate} // Set the selected date to BillGDate
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     onChange={(date) => {
//                       if (date) {
//                         setSearchCriteria({ ...searchCriteria, sirDate: date });
//                       } else {
//                         setSearchCriteria({ ...searchCriteria, sirDate: null });
//                       }
//                     }}
//                     dateFormat="dd/MM/yyyy"
//                     value={searchCriteria.sirDate}
//                     className="form-control border-right-0 inputField"
//                     customInput={<input style={{ width: '100%' }} />}
//                     maxDate={new Date()}

//                   />
//                 </div>
//               </Col>
//               <Col sm={4}>
//                 <div className="form-group">
//                   <label className="forlabel">DGDC Status</label>
//                   <select
//                     name="selectedDGDCStatus"
//                     className="form-control"
//                     value={searchCriteria.dgdcStatus}
//                     onChange={(e) =>
//                       setSearchCriteria({
//                         ...searchCriteria,
//                         dgdcStatus: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="" disabled>
//                       Select DGDC Status
//                     </option>
//                     {JarListDtlDGDC.map((item) => (
//                       <option key={item.jarDtlDesc} value={item.jarDtlDesc}>
//                         {item.jarDtlDesc}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </Col>
//               <Col sm={4}>
//                 <div style={{ marginTop: 23 }}>
//                   <button
//                     className="btn btn-outline-primary btn-margin"
//                     onClick={handleShow}
//                     type="button"
//                   >
//                       <FontAwesomeIcon icon={faArrowsToEye} style={{ marginRight: '5px' }} />
//                     Show
//                   </button>
//                   <button
//                     className="btn btn-outline-danger btn-margin"
//                     type="button"
//                     onClick={handleRest}
//                     style={{ marginLeft: "10px" }}
//                   >
//                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                     Reset
//                   </button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </div>

//         {ReordList.length !== 0 && (
//           <CardBody style={{ marginTop: "10" }}>
//             <div className="text-end" style={{ marginTop: 23 }}>
//               <button
//                 className="btn btn-outline-primary btn-margin"
//                 type="button"
//                 onClick={handlePrint}
//               >
//                 <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
//                 Print
//               </button>
//               <button
//                 className="btn btn-outline-danger btn-margin"
//                 type="button"
//                 style={{ marginLeft: "10px" }}
//                 onClick={generateXLS}
//               >
//                  <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
//                 XLS
//               </button>
//               <button
//                 className="btn btn-outline-primary btn-margin"
//                 type="button"
//                 onClick={handlePDFDownload}
//                 style={{ marginLeft: "10px" }}
//               >
//                  <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
//                 Pdf
//               </button>
         
//             </div>

//             <hr />
//             <Table style={{ marginTop: 10 }} striped responsive bordered>
//               <thead>
//                 <tr>
//                 <th style={{ background: '#BADDDA' }}>
//                     Sr.No
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Sir Date
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Sir No
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Parcel Type
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Importer Name
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Packages
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Invoice No
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Challan No
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     BE REQUEST ID
//                   </th>
//                   <th style={{ background: '#BADDDA' }}>
//                     Current Status
//                   </th>
//                 </tr>
//               </thead>
//               <thead>
//                   <tr>
//                     <th style={{ background: "#BADDDA" }} scope="col">
//                      Total
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                    
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
//                      {totalSirNoCount}
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                    
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                    
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
//                     {totaleImpNoOfPackages}
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                    
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                     
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                    
//                     </th>
//                     <th style={{ background: "#BADDDA" }} scope="col">
                     
//                     </th>
//                   </tr>
//                 </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{formatedDate(item.sirDate)}</td>
//                     <td>{item.sirNo}</td>
//                     <td>{item.importType}</td>
//                     <td>{getpartyId[item.exporter]}</td>
//                     <td>{item.nop}</td>
//                     <td>{item.invoiceNo}</td>
//                     <td>{item.challanNo}</td>
//                     <td>{item.requestId}</td>
//                     <td>{item.dgdcStatus}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>

//             <div
//               style={{
//                 marginTop: 4,
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <p style={{ fontWeight: "bold" }}>
//                 Total No. SIR No: {totalSirNoCount}
//               </p>
//               <p style={{ fontWeight: "bold" }}>
//                 Total No. of Packages: {totaleImpNoOfPackages}
//               </p>
//             </div>
//             <Pagination>
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <Pagination.Item
//                   key={index + 1}
//                   active={index + 1 === currentPage}
//                   onClick={() => handlePageChange(index + 1)}
//                 >
//                   {index + 1}
//                 </Pagination.Item>
//               ))}
//             </Pagination>
//           </CardBody>
//         )}
//       </Card>
//     </div>
//   );
// }


import ipaddress from "../Components/IpAddress";
import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../Components/Style.css";
import html2canvas from "html2canvas";
import { renderToStaticMarkup } from "react-dom/server";

import jsPDF from "jspdf";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FileSaver from "file-saver"; // This library is used for saving the file
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dgdcImage from "../Images/report.jpeg";
import Pagination from 'react-bootstrap/Pagination';
import "../Parent_Pages/parent.css";
import { CardBody, Label } from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToEye, faBorderAll, faFileAlt, faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import {
  faCheck,
  faSave,
  faTimes,
  faSyncAlt,
  faFileExcel,
  faFilePdf,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Line, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { BlobProvider } from "@react-pdf/renderer";
import { setActiveLink } from "react-scroll/modules/mixins/scroller";
import { toast } from "react-toastify";
const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Image src={dgdcImage} style={styles.headerImage} />
    </View>
  );
};





const styles = StyleSheet.create({
  centeredTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:7,
  },
  rightText: {
    fontSize: 10,
    textAlign: "right", // Center text horizontally
  },
  centeredText: {
    fontSize: 10,
    textAlign: "center", // Center text horizontally
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  page: {
    paddingTop: 18,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 5,
  },
  heading: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",
  },

  leftColumn: {
    width: "100%",
    paddingTop: 9,
  },
  headingwithbox: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",

    // Add padding for space between text and border
  },
  viewheadingwithbox: {
    border: "1px solid black",
    padding: 5,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 5,
  },
  headingwithborder: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",
    borderBottom: "1px solid black",
    // Add padding for space between text and border
  },
  image: {
    width: 306,
    height: 100,
    marginBottom: 0,
    marginLeft: 117,
    justifyContent: "center",
  },

  dateSize: {
    fontSize: 8,
  },
  normaltext: {
    fontSize: 10,
    marginTop: 18,
    fontWeight: "bold",
  },
  line: {
    width: "100%", // Adjust the width of the line
    marginTop: 4, // Adjust the space above the line
    marginBottom:5, // Adjust the space below the line
    borderTop: "0.2pt solid black", // Style the line
  },

  tableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tableCell: {
    border: "0.3px solid #000",
    padding: 1,
    flexWrap: "wrap",
    width: 52,
    textAlign:'center',
    fontSize: 7,
  },
  tableCellHeader: {
    fontWeight: "bold",
    flexWrap: "wrap",
    width: 52,
    fontWeight: "bold",
    fontSize: 9,
    textAlign:'center',
  },
  table: {
    width: "100%",
    marginBottom: 4,
    flexWrap: "wrap",
  },
});


const PAGE_BREAK_ROWS = 15; // Adjust this based on how many rows fit on one page


export default function Sub_import_transaction() {
  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [ReordList, setReordList] = useState([]);

  const totalSirNoCount = ReordList.length;

  const totaleImpNoOfPackages = ReordList.reduce(
    (total, item) => total + item[4],
    0
  );


  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const today = new Date();
  const [JarListDtlDGDC, setJarListDtlDGDC] = useState([]);

  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };


  function fetchExporterName(companyId, branchId, partyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(
        `http://${ipaddress}importsub/findPartyName/${companyId}/${branchId}/${partyId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }










  const MyPDFDocument = ({ sbCount, noOfPackages, ReordList }) => (
    <Document>
      {Array.from({
        length: Math.ceil(ReordList.length / PAGE_BREAK_ROWS),
      }).map((_, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <CustomHeader />
          <View>
            <Text style={styles.centeredText}>
              Date: {formatedDate(searchCriteria.sirDate)}
            </Text>
            <Text style={styles.centeredText}>
              Status:{searchCriteria.dgdcStatus}
              {"\n\n"}
            </Text>

            <Text style={styles.headerText}>
              Subcontract Import Transaction
            </Text>
          </View>

          <View style={styles.table}>
            {" "}
            <View style={styles.tableRow}>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap", width: 31 },
                ]}
              >
                Sl.No.
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap", width: 63 },
                ]}
              >
                SIR Date
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap", width: 63 },
                ]}
              >
                SIR No
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap" },
                ]}
              >
                Parcel Type
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap", width: 63 },
                ]}
              >
                Importer Name
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap", width: 31 },
                ]}
              >
                NOP
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  { flexWrap: "wrap" },
                ]}
              >
                Invoice No
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  { flexWrap: "wrap" },
                ]}
              >
                Challan No
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  { flexWrap: "wrap" },
                ]}
              >
                BE REQUEST ID
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  {  flexWrap: "wrap", width: 72 },
                ]}
              >
                Current Status
              </Text>
            </View>
            {ReordList.slice(
              pageIndex * PAGE_BREAK_ROWS,
              (pageIndex + 1) * PAGE_BREAK_ROWS
            ).map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={{ ...styles.tableCell, width: 31 }}>
                  {index + 1 + pageIndex * PAGE_BREAK_ROWS}
                </Text>
                <Text style={{ ...styles.tableCell, width: 63 }}>
                  {formatedDate(item.sirDate)}
                </Text>
                <Text style={{ ...styles.tableCell, width: 63 }}>
                  {item.sirNo}
                </Text>
                <Text style={{ ...styles.tableCell }}>{item.importType}</Text>
                <Text style={{ ...styles.tableCell, width: 63 }}>
                  {getpartyId[item.exporter]}
                </Text>
                <Text style={{ ...styles.tableCell, width: 31 }}>
                  {item.nop}
                </Text>
                <Text style={{ ...styles.tableCell }}>{item.invoiceNo}</Text>
                <Text style={{ ...styles.tableCell }}>{item.challanNo}</Text>
                <Text style={{ ...styles.tableCell }}>{item.requestId}</Text>
                <Text style={{ ...styles.tableCell, width: 72 }}>
                  {item.dgdcStatus}
                </Text>
              </View>
            ))}
          </View>

          {/* Display the "Total" row only on the last page */}
          {pageIndex === Math.ceil(ReordList.length / PAGE_BREAK_ROWS) - 1 && (
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, width: 31 }}>Total</Text>
              <Text style={{ ...styles.tableCell, width: 63 }}></Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  { width: 63 },
                ]}
              >
                {sbCount}
              </Text>
              <Text style={{ ...styles.tableCell }}></Text>
              <Text style={{ ...styles.tableCell, width: 63 }}></Text>
              <Text style={{ ...styles.tableCell, width: 31 }}>
                {noOfPackages}
              </Text>
              <Text style={{ ...styles.tableCell }}></Text>
              <Text style={{ ...styles.tableCell }}></Text>
              <Text style={{ ...styles.tableCell }}></Text>
              <Text style={{ ...styles.tableCell, width: 72 }}></Text>
            </View>
          )}
          <View>
            <Text style={styles.rightText}>{"\n\n"}(For DGDC LIMITED)</Text>
          </View>
        </Page>
      ))}
    </Document>
  );


  const initialSearchCriteria = {
    companyId: companyid,
    branchId: branchId,
    dgdcStatus: "",
    sirDate: new Date(),
  };



  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);

 

  useEffect(() => {
    getlist();
  }, []);

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/dgdcstatus/${companyid}`)
      .then((response) => {
        setJarListDtlDGDC(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const handleShow = () => {
    axios
      .get(`http://${ipaddress}importsub/importSubTransaction`, {
        params: searchCriteria,
      })
      .then((response) => {
        setReordList(response.data);

        toast.success("Data  Found !", {
          position: "top-center",
          autoClose: 540, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      })
      .catch((error) => {
        toast.error("Data Not Found !", {
          position: "top-center",
          autoClose: 540, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setReordList([]);
        console.error("GET list error:", error);
      });
  };

  const handleRest = () => {
    setSearchCriteria({
      ...searchCriteria,
      dgdcStatus: "", // Clear the dgdcStatus
      sirDate: new Date(), // Set sbDate to today's date
    });
    setReordList([]);
  };

  function fetchCompanyName(companyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(`http://${ipaddress}importsub/findCompanyname/${companyId}`)
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }

  function fetchBranchName(companyId, branchId) {
    // Make an Axios GET request to retrieve the branch name based on branchId
    return axios
      .get(
        `http://${ipaddress}importsub/findBranchName/${companyId}/${branchId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved branch name
      })
      .catch(function (error) {
        console.error("Error fetching branch name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }

  const generateXLS = async () => {
    const modifiedRecordList = await Promise.all(
      currentItems.map(async (item, index) => {
        // const companyname = await fetchCompanyName(item.companyId);
        // const branchname = await fetchBranchName(item.companyId, item.branchId);
        const partyName = await fetchExporterName(
          item.companyId,
          item.branchId,
          item.exporter
        );
        return {
          "Sr.No": index + 1,
          // "Company Name": companyname,
          // "Branch Name": branchname,
          "SIR Date": formatedDate(item.sirDate) || "",
          "SIR No": item.sirNo || "",
          "PARCEL TYPE": item.importType || "",
          "Importer Names": getpartyId[item.exporter] || "",
          "NO OF PKGS": item.nop || "",
          "INVOICE NO": item.invoiceNo || "", // Modify this to the actual field name
          "CHALLON NO": item.challanNo || "",
          "BE REQUEST ID": item.requestId || "",
          "CURRENT STATUS": item.dgdcStatus || "",
        };
      })
    );

    // Calculate the total "SIR No" and "No of Pkgs"
    const totalSIRNo = modifiedRecordList.reduce(
      (total, item) => total + (item["SIR No"] ? 1 : 0),
      0
    );

    const totalNoOfPkgs = modifiedRecordList.reduce(
      (total, item) => total + (item["NO OF PKGS"] || 0),
      0
    );
    const distanceRow = {
      "Sr.No": "",
      // "Company Name": "",
      // "Branch Name": "",
      "SIR Date": "",
      "SIR No": "",
      "PARCEL TYPE": "",
      "Importer Names": "",
      "NO OF PKGS": "",
      "INVOICE NO": "", // Modify this to the actual field name
      "CHALLON NO": "",
      "BE REQUEST ID": "",
      "CURRENT STATUS": "",
    };
    // Add a total row
    const totalRow = {
      "Sr.No": "Total ",
      // "Company Name": "",
      // "Branch Name": "",
      "SIR Date": "",
      "SIR No": totalSIRNo,
      "PARCEL TYPE": "",
      "Importer Names": "",
      "NO OF PKGS": totalNoOfPkgs,
      "INVOICE NO": "", // Modify this to the actual field name
      "CHALLON NO": "",
      "BE REQUEST ID": "",
      "CURRENT STATUS": "",
    };

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      distanceRow,
      ...modifiedRecordList,
      distanceRow, // Insert the distance row
      totalRow, // Insert the total row
    ]);

    // Add headers for all fields
    const headers = Object.keys(modifiedRecordList[0]);
    headers.forEach((header, index) => {
      worksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
        t: "s",
        v: header,
        s: { font: { bold: true } },
      };
    });

    // Set column widths based on data
    const colWidths = headers.map((header) => ({
      wch: header.length + 2, // You can adjust the width as needed
    }));

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sub_Import_Register");
    const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
    const blob = new Blob([s2ab(xlsFile)], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, "Sub_import_transaction.xls");
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const sbCount = ReordList.filter(
    (item) => item.sbNo !== null && item.sbNo !== ""
  ).length;

  const noOfPackages = ReordList.reduce((total, item) => {
    if (item.nop !== null && !isNaN(item.nop)) {
      return total + parseInt(item.nop, 10);
    }
    return total;
  }, 0);

  const handlePrint = () => {
    const isoDate = new Date().toISOString();
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
  
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
  
    const recordsPerPage = 30;
    const recordChunks = splitArrayIntoChunks(ReordList, recordsPerPage);
  
    recordChunks.forEach((chunk, chunkIndex) => {
      if (chunkIndex > 0) {
        // Insert a page break before the new page
        printWindow.document.write('<div style="page-break-before: always;"></div>');
      }
  
      // Create a new page
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Import Sub Transaction Report</title>
    
        <style>
          @page {
            margin: 1cm;
          }
    
          .printable-area {
            font-family: Arial, sans-serif;
          }
    
          table {
            width: 100%;
            border-collapse: collapse;
          }
    
          td {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 1px;
            font-size: 10px;
          }
    
          th {
            border: 1px solid #dddddd;
            background-color: #f2f2f2;
            text-align: center;
            font-size: 12px;
          }
    
          .header img {
            max-width: auto;
            max-height: auto;
          }
    
          #page-header {
            position: static;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
          }
        </style>
        </head>
        <body>
        <div id="page-header">
        <img src="${dgdcImage}" alt="Header Image" style="max-width: 306px; display: block; margin: 0 auto;"></br>
        <div style="text-align: center;">
        <div style="font-size: 12px;">
        <strong>Date : ${formatedDate(searchCriteria.sirDate)}</strong></br>
        <strong>Status : ${searchCriteria.dgdcStatus}</strong>
        </div>
        </div>
        </div>
        <div class="content">
        <div style="font-size: 12px;padding-bottom;0px;"> <strong>Subcontract Import Transaction Report</strong></div>
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Sir Date</th>
              <th>Sir No</th>
              <th>Parcel Type</th>
              <th>Importer Name</th>
              <th>NOP</th>
              <th>Invoice No</th>
              <th>Challan No</th>
              <th>BE REQUEST ID</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            ${chunk.map((item, index) => `
              <tr>
                <td>${chunkIndex * recordsPerPage + index + 1}</td>
                <td>${formatedDate(item.sirDate) || ''}</td>
                <td>${item.sirNo || ''}</td>
                <td>${item.importType || ''}</td>
                <td>${getpartyId[item.exporter] || ''}</td>
                <td>${item.nop || ''}</td>
                <td>${item.invoiceNo || ''}</td>
                <td>${item.challanNo || ''}</td>
                <td>${item.requestId || ''}</td>
                <td>${item.dgdcStatus || ''}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        </div>
        <div>
        <p style="float: right; margin-right: 20px; margin-top: 4px; font-size: 12px;">(For DGDC LIMITED)</p>
        </div>
        </body>
        </html>
      `);
    });
  
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };
  
  // Function to split an array into chunks of a specified size
  function splitArrayIntoChunks(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const handlePDFDownload = async () => {
    const pdfBlob = await pdf(
      <MyPDFDocument {...{ sbCount, noOfPackages, ReordList }} />
    ).toBlob();
    saveAs(pdfBlob, "Sub_Import_Transaction.pdf");
  };

  

  const [partys, setPartys] = useState([]);

  const [getpartyId, setGetpartyId] = useState({});

  const fetchPartyNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
      );
      const data = await response.json();
      const namesMap = {};
      data.forEach((party) => {
        namesMap[party.partyId] = party.partyName;
      });
      setGetpartyId(namesMap);
      setPartys(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchPartyNames();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ReordList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ReordList.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const displayPages = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, centerPageCount);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  //Sub Import Transaction

 const formatDateTime2 = (value) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} `;
};
const getExcel = (imp) => {
  const filename = `DTA_Import_Transaction_${formatDateTime2(new Date())}.xlsx`; // Note: Changed file extension to xlsx
  axios.post(`http://${ipaddress}importsub/transactionexcel/${companyid}/${branchId}`, imp, { responseType: 'blob' }) // Added responseType: 'blob'
    .then(async (response) => {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      toast.error("Something went wrong", {
        autoClose: 700
      });
    });
  }
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };
  const transactionPrint = async(date,tp) =>{
    const formattedDate = formatDate(date);
    
  
    await axios.post(`http://${ipaddress}importsub/subimpTransactionReport?companyId=${companyid}&branchId=${branchId}&selecteddate=${formattedDate}&dgdcStatus=${tp}`)
    .then((response)=>{
      const base64PDF = response.data;

      // Create a new window for displaying the PDF
      const newWindow = window.open("", "_blank");

      // Write the HTML content to the new window
      newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Subcontract Import Transaction</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          embed {
            width: 100vw;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
      </body>
      </html>
    `);
    })
    .catch((error)=>{
      if(error){
        toast.error("Something went wrong",{
          autoClose:1000
        })
      }
    })      
  }



  const transactionPdf = async(date,tp) =>{
    const formattedDate = formatDate(date);
    
  
    await axios.post(`http://${ipaddress}importsub/subimpTransactionReport?companyId=${companyid}&branchId=${branchId}&selecteddate=${formattedDate}&dgdcStatus=${tp}`)
    .then((response)=>{
      const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Subcontract_Import_Transaction.pdf'; // Set the filename for the downloaded PDF
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        // Trigger the download
        downloadLink.click();
        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);
        toast.success("Downloading Pdf!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 800,
        });
      })
      .catch((error)=>{
        if(error){
          toast.error("Something went wrong",{
            autoClose:1000
          })
        }
      })      
  }
  return (
    <div className="Container">
   <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faFileAlt}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Subcontract Import Transaction</h5>
      <Card
        style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
      >
        <div>
          <Form>
            <Row>
              <Col sm={4}>
                <label className="forlabel">Select Date</label>
                <div>
                  <DatePicker
                    selected={searchCriteria.sirDate} // Set the selected date to BillGDate
                    wrapperClassName="custom-react-datepicker-wrapper"
                    onChange={(date) => {
                      if (date) {
                        setSearchCriteria({ ...searchCriteria, sirDate: date });
                      } else {
                        setSearchCriteria({ ...searchCriteria, sirDate: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={searchCriteria.sirDate}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '100%' }} />}
                    maxDate={new Date()}

                  />
                </div>
              </Col>
              <Col sm={4}>
                <div className="form-group">
                  <label className="forlabel">DGDC Status</label>
                  <select
                    name="selectedDGDCStatus"
                    className="form-control"
                    value={searchCriteria.dgdcStatus}
                    onChange={(e) =>
                      setSearchCriteria({
                        ...searchCriteria,
                        dgdcStatus: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select DGDC Status
                    </option>
                    {JarListDtlDGDC.map((item) => (
                      <option key={item.jarDtlDesc} value={item.jarDtlDesc}>
                        {item.jarDtlDesc}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col sm={4}>
                <div style={{ marginTop: 23 }}>
                  <button
                    className="btn btn-outline-primary btn-margin"
                    onClick={handleShow}
                    type="button"
                  >
                      <FontAwesomeIcon icon={faArrowsToEye} style={{ marginRight: '5px' }} />
                    Show
                  </button>
                  <button
                    className="btn btn-outline-danger btn-margin"
                    type="button"
                    onClick={handleRest}
                    style={{ marginLeft: "10px" }}
                  >
                       <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                    Reset
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>

        {ReordList.length !== 0 && (
          <CardBody style={{ marginTop: "10" }}>
            <div className="text-end" style={{ marginTop: 23 }}>
              <button
                className="btn btn-outline-primary btn-margin"
                type="button"
                onClick={()=>transactionPrint(searchCriteria.sirDate,searchCriteria.dgdcStatus)}
              >
                <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                Print
              </button>
              <button
                className="btn btn-outline-danger btn-margin"
                type="button"
                style={{ marginLeft: "10px" }}
                onClick={()=>getExcel(ReordList)}
              >
                 <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                XLS
              </button>
              <button
                className="btn btn-outline-primary btn-margin"
                type="button"
                onClick={()=>transactionPdf(searchCriteria.sirDate,searchCriteria.dgdcStatus)}
                style={{ marginLeft: "10px" }}
              >
                 <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                Pdf
              </button>
         
            </div>

            <hr />
            <Table style={{ marginTop: 10 }} striped responsive bordered>
              <thead>
                <tr>
                <th style={{ background: '#BADDDA' }}>
                    Sr.No
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    SIR Date
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    SIR No
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    Parcel Type
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    Importer Name
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    Packages
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    Invoice No
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    Challan No
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    BE REQUEST ID
                  </th>
                  <th style={{ background: '#BADDDA' }}>
                    Current Status
                  </th>
                </tr>
              </thead>
              <thead>
                  <tr>
                    <th style={{ background: "#BADDDA" }} scope="col">
                     Total
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                    
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                     {totalSirNoCount}
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                    
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                    
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                    {totaleImpNoOfPackages}
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                    
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                     
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                    
                    </th>
                    <th style={{ background: "#BADDDA" }} scope="col">
                     
                    </th>
                  </tr>
                </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                   <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                    <td>{formatedDate(item[0])}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{getpartyId[item[3]]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
                    <td>{item[6]}</td>
                    <td>{item[7]}</td>
                    <td>{item[8]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div
              style={{
                marginTop: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Total No. SIR No: {totalSirNoCount}
              </p>
              <p style={{ fontWeight: "bold" }}>
                Total No. of Packages: {totaleImpNoOfPackages}
              </p>
            </div>
            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                      <Pagination.First onClick={() => handlePageChange(1)} />
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Ellipsis />

                      {displayPages().map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}

                      <Pagination.Ellipsis />
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                    </Pagination>

          </CardBody>
        )}
      </Card>
    </div>
  );
}