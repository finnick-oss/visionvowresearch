import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaArrowLeft, FaArrowRight, FaLock } from 'react-icons/fa';
import './Dashboard.css';
import { login, getToken, clearToken, fetchSurveys, fetchSurveyCount, exportSurveys } from '../api';

// Same as Dashboard, but reads survey data from MongoDB through the backend API
const Dashboard2 = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [User, setUser] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const [countSurvey, setCountSurvey] = useState('');

  const handleApiError = useCallback((error) => {
    console.error('Error fetching data from MongoDB API:', error);
    if (error.status === 401) {
      clearToken();
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchSurveyCount()
      .then(({ count }) => setCountSurvey(count))
      .catch(handleApiError);
  }, [isLoggedIn, handleApiError]);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    fetchSurveys({ ...filters, page: currentPage, limit: itemsPerPage })
      .then(({ items, total }) => {
        setItems(items);
        setTotal(total);
      })
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, [isLoggedIn, filters, currentPage, itemsPerPage, handleApiError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(User, Password);
      setIsLoggedIn(true);
    } catch (error) {
      alert(error.status === 401 ? 'Invalid username or password' : 'Could not reach the server');
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

  const handleExport = async () => {
    try {
      const { items } = await exportSurveys(filters);
      exportToExcel(items);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Converts a YYYY-MM-DD date input to the start/end of that day in local time
  const toDayBoundary = (value, endOfDay) => {
    if (!value) return undefined;
    const [year, month, day] = value.split('-').map(Number);
    const date = endOfDay
      ? new Date(year, month - 1, day, 23, 59, 59, 999)
      : new Date(year, month - 1, day, 0, 0, 0, 0);
    return date.toISOString();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setFilters({
      pid: e.target.p_id.value.trim(),
      uid: e.target.u_ide.value.trim(),
      status: e.target.status.value.trim().toLowerCase(),
      from: toDayBoundary(e.target.date1.value, false),
      to: toDayBoundary(e.target.date2.value, true),
    });
    setCurrentPage(1);

    // Reset the status field
    if (statusRef.current) {
      statusRef.current.value = '';
    }
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(total / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoggedIn ? (
        <div className="container-fluid pt-5">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2 gradient-text">Total Surveys: {countSurvey}</h1>
            <div className="btn-toolbar mb-2 mb-md-0"></div>
          </div>

          <form ref={formRef} className="form-horizontal" onSubmit={handleFilter}>
            <div className="form-group">
              <input type="text" name="p_id" className="form-control" placeholder="PID" />
            </div>
            <div className="form-group">
              <input type="text" name="u_ide" className="form-control" placeholder="UID Starts-with or Ends-with" />
            </div>
            <div className="form-group">
              <input type="date" name="date1" className="form-control" placeholder="Date first limit" />
            </div>
            <div className="form-group">
              <input type="date" name="date2" className="form-control" placeholder="Date second limit" />
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
                    <th scope="col">Status</th>
                    <th scope="col">Completion Time</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{item.pid}</td>
                        <td>{item.uid}</td>
                        <td>{item.ip}</td>
                        <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">{loading ? 'Loading...' : 'No data available'}</td>
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

            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= totalPages}>
              <FaArrowRight />
            </button>
          </div>
          <div className="pages">
            <button onClick={handleExport} className="btn btn-export">
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

export default withRouter(Dashboard2);
