import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path if necessary
import { setDoc, doc } from 'firebase/firestore';
import './Complete.css';

const CompletedPage = ({ location }) => {
  const [ipAddress, setIPAddress] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then(response => response.json())
      .then(data => {
        setIPAddress(data.IPv4);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pid = searchParams.get('pid');
    const uid = searchParams.get('uid');
    const status = 'Complete';
    const completionTime = new Date().toLocaleString();
    const currentDateTime = new Date().toISOString().replace(/:/g, '-'); // Replace colons to avoid issues in Firestore ID

    if (pid && uid && ipAddress) {
      const newData = {
        pid,
        uid,
        ip: ipAddress,
        status,
        date: completionTime, // Include completionTime in newData
      };

      console.log('New Data:', newData);
      setData(prevData => [...prevData, newData]);

      const saveToFirestore = async () => {
        try {
          // Use currentDateTime as the document ID
          await setDoc(doc(db, 'survey', currentDateTime), {
            ...newData,
            timestamp: currentDateTime, // Add a timestamp to the data
          });
          console.log('Document written with ID: ', currentDateTime);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };


      saveToFirestore();
    }
  }, [location.search, ipAddress]);

  return (
    <div className="complete-page">
      <h1 className="complete-title">Completed Surveys</h1>
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
              {data.map((survey, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{survey.pid}</td>
                  <td>{survey.uid}</td>
                  <td>{survey.ip}</td>
                  <td>{survey.date}</td>
                  <td className={`status ${survey.status.toLowerCase()}`}>{survey.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedPage;
