import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase';
import { FaArrowLeft, FaArrowRight, FaLock } from 'react-icons/fa';
import './Dashboard.css';
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('G8KZ33QU0S', 'd335cb9b3a2273f8123c95e161b35255');
const index = client.initIndex('visionvowresearch-survey');

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [dataAlgolia, setDataAlgolia] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(100); // Assuming 100 items per page
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const formRef = useRef(null);
    const statusRef = useRef(null);
    const [countSurvey, setCountSurvey] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
                let result = await index.search('', { hitsPerPage: 101 });
                let hits = result.hits;

                setData(hits)
                setFilteredData(hits)


            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            }
        };


        const fetchDataLast = async () => {
            try {

                let result = await index.search('', { hitsPerPage: 1000 });
                let hits = result.hits;


                setDataAlgolia(hits);
                setFilteredData(hits);

                // Fetch another 1000 results
                result = await index.search('', { hitsPerPage: 1000, page: 1 });
                hits = hits.concat(result.hits);



                setDataAlgolia(hits);
                setFilteredData(hits);

                // Fetch another 1000 results
                result = await index.search('', { hitsPerPage: 1000, page: 2 });
                hits = hits.concat(result.hits);


                setDataAlgolia(hits);
                setFilteredData(hits);

                // Fetch another 1000 results
                result = await index.search('', { hitsPerPage: 1000, page: 3 });
                hits = hits.concat(result.hits);


                setDataAlgolia(hits);
                setFilteredData(hits);

                // Fetch another 1000 results
                result = await index.search('', { hitsPerPage: 1000, page: 4 });
                hits = hits.concat(result.hits);

                setDataAlgolia(hits);
                setFilteredData(hits);

                // Fetch another 1000 results
                result = await index.search('', { hitsPerPage: 1000, page: 5 });
                hits = hits.concat(result.hits);

                setDataAlgolia(hits);
                setFilteredData(hits);


            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            }
        };


        const fetchTotalSize = async () => {
            try {

                const coll = collection(db, "survey");
                const snapshot = await getCountFromServer(coll);
                setCountSurvey(snapshot.data().count);


            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            }
        };


        fetchTotalSize();
        fetchData();
        fetchDataLast();

    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const envUsername = process.env.REACT_APP_ADMIN_USERNAME;
        const envPassword = process.env.REACT_APP_ADMIN_PASSWORD;
        console.log(envUsername +""+ envPassword);
        if (User === envUsername && Password === envPassword) {
            localStorage.setItem(process.env.REACT_APP_ADMIN_APP_NAME, process.env.REACT_APP_ADMIN_APP_SECRET_KEY);
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

    const parseCustomDate = (dateString) => {
        if (!dateString) return null;

        try {
            if (dateString.includes(', ')) {
                // Custom format: DD-MM-YYYY, hh:mm:ss AM/PM
                const [datePart, timePart] = dateString.split(', ');
                const [day, month, year] = datePart.split('-').map(Number);
                const [time, period] = timePart.split(' ');
                let [hours, minutes, seconds] = time.split(':').map(Number);

                if (period.toLowerCase() === 'pm' && hours < 12) {
                    hours += 12;
                } else if (period.toLowerCase() === 'am' && hours === 12) {
                    hours = 0;
                }

                return new Date(year, month - 1, day, hours, minutes, seconds);
            } else if (dateString.includes('-')) {
                // Format: YYYY-MM-DD
                const [year, month, day] = dateString.split('-').map(Number);
                return new Date(year, month - 1, day);
            }
            return null;
        } catch (error) {
            console.error('Error parsing date:', error);
            return null;
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const pid = e.target.p_id.value.trim().toLowerCase();
        const uidValue = e.target.u_ide.value.trim();
        const date1 = e.target.date1.value;
        const date2 = e.target.date2.value;
        const status = e.target.status.value.trim().toLowerCase();

        let filtered = dataAlgolia;

        if (status) {
            filtered = filtered.filter(item => item.status.toLowerCase() === status);
        }
        if (pid) {
            filtered = filtered.filter(item => item.pid.toLowerCase().includes(pid.toLowerCase()));
        }
        if (uidValue) {
            filtered = filtered.filter(item => item.uid.toLowerCase().includes(uidValue.toLowerCase()));
        }

        const filterByDate = (itemDate, date1, date2) => {
            const parsedItemDate = parseCustomDate(itemDate);
            if (!parsedItemDate) return false;

            const date1Obj = date1 ? parseCustomDate(date1) : null;
            const date2Obj = date2 ? parseCustomDate(date2) : null;

            if (date1Obj && date2Obj) {
                return (
                    parsedItemDate.getFullYear() >= date1Obj.getFullYear() &&
                    parsedItemDate.getMonth() >= date1Obj.getMonth() &&
                    parsedItemDate.getDate() >= date1Obj.getDate() &&
                    parsedItemDate.getFullYear() <= date2Obj.getFullYear() &&
                    parsedItemDate.getMonth() <= date2Obj.getMonth() &&
                    parsedItemDate.getDate() <= date2Obj.getDate()
                );
            } else if (date1) {
                return parsedItemDate.toDateString() === date1Obj.toDateString();
            } else if (date2) {
                return parsedItemDate.toDateString() === date2Obj.toDateString();
            }
            return true;
        };

        filtered = filtered.filter(item => filterByDate(item.date, date1, date2));

        setFilteredData(filtered);
        console.log(filtered);
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
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={index}>
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
                    <div className="pages">
                        <button onClick={() => exportToExcel(data)} className="btn btn-export">
                            Export
                        </button>
                    </div>
                </div>
            ) : (
                <div className="parent">
                    <div className="parent_div">
                        <h2><FaLock /> Hi admin Namaste!</h2>
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

export default withRouter(AdminDashboard);
