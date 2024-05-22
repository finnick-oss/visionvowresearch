import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaArrowLeft, FaArrowRight, FaLock } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100); // Assuming 10 items per page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState('');
  const [Password, setPassword] = useState('');
  const formRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_NAME);
    if (token) {
      setIsLoggedIn(true);
    }
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'survey'));
        const surveyData = querySnapshot.docs.map(doc => doc.data());
        setData(surveyData.reverse());
        setFilteredData(surveyData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const envUsername = process.env.REACT_APP_USERNAME;
    const envPassword = process.env.REACT_APP_PASSWORD;
    if (User === envUsername && Password === envPassword) {
      localStorage.setItem(process.env.REACT_APP_NAME, process.env.REACT_APP_SECRET_KEY);
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const exportToExcel = (data, fileName = 'export.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
      'Serial NO.': index + 1,
      'Project ID': item.pid,
      'User ID': item.uid,
      'Status': item.status,
      'IP Address': item.ip,
      'Completion Time': item.date,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const pid = e.target.p_id.value;
    const uidEnds = e.target.u_ide.value;
    const uidStarts = e.target.u_ids.value;
    const date = e.target.date.value;
    const status = e.target.status.value;

    let filtered = data;

    if (status) {
      filtered = filtered.filter(item => item.status.toLowerCase() === status);
    }
    if (pid) {
      filtered = filtered.filter(item => item.pid.includes(pid));
    }
    if (uidEnds) {
      filtered = filtered.filter(item => item.uid.endsWith(uidEnds));
    }
    if (uidStarts) {
      filtered = filtered.filter(item => item.uid.startsWith(uidStarts));
    }
    if (date) {
      filtered = filtered.filter(item => item.date === date);
    }

    setFilteredData(filtered);
    setCurrentPage(1);

  

    // Reset the status field
    if (statusRef.current) {
      statusRef.current.value = '';
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoggedIn ? (
        <div className="container-fluid pt-5">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0"></div>
          </div>

          <form ref={formRef} className="form-horizontal" onSubmit={handleFilter}>
            <div className="form-group">
              <input type="text" name="p_id" className="form-control" placeholder="PID" />
            </div>
            <div className="form-group">
              <input type="text" name="u_ids" className="form-control" placeholder="UID Starts-with" />
            </div>
            <div className="form-group">
              <input type="text" name="u_ide" className="form-control" placeholder="UID Ends-with" />
            </div>
            <div className="form-group">
              <input type="date" name="date" className="form-control" placeholder="Date" />
            </div>
            <div className="form-group">
              <select ref={statusRef} className="form-select" name="status">
                <option style={{ display: 'none' }} value="">Status...</option>
                <option value="complete">Complete</option>
                <option value="terminate">Terminate</option>
                <option value="quotafull">Quotafull</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Filter</button>
            </div>
          </form>

          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-sm text-center">
                <thead>
                  <tr>
                    <th scope="col">Serial NO.</th>
                    <th scope="col">Project ID</th>
                    <th scope="col">User ID</th>
                    <th scope="col">IP Address</th>
                    <th scope="col">Completion Time</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{item.pid}</td>
                        <td>{item.uid}</td>
                        <td>{item.ip}</td>
                        <td>{item.date}</td>
                        <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>
           
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaArrowRight />
            </button>
          </div>
          <div className='pages'>
            <span className='total-text'>Total ({data.length})</span>

            <button onClick={() => exportToExcel(data)} className="btn btn-export">
              Export
            </button>
          </div>
        </div>
      ) : (
        <div className="parent">
          <div className="parent_div">
            <h2><FaLock /> Login to VisionVow</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                id="text"
                onChange={(e) => setUser(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Password"
                required
              />
              <input id="login-btn" type="submit" value="Login" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Dashboard);
