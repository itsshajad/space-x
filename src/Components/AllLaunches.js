import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AllLaunches.css';
import Header from './Header';
import DataList from './DataList';
import Pagination from './Pagination';
import DatePicker from './DatePicker/DatePicker';

const AllLaunches = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [currentPage, SetCurrentPage] = useState(1);
  const [listPerPage] = useState(12);
  const [value, setValue] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [newData, setNewData] = useState([]);
  const history = useHistory();

  const dateFilter = `start=${start}&end=${end}`;

  useEffect(() => {
    const url = `https://api.spacexdata.com/v3/launches?${dateFilter}`;

    async function loadData() {
      const data = await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
      setData(data);
      setNewData(data);

      SetLoading(false);
    }
    loadData();
  }, [dateFilter]);

  useEffect(() => {
    const urlValue = new URLSearchParams(window.location.search).get(
      'launches'
    );

    setValue(urlValue);
  }, []);

  useEffect(() => {
    const param = new URLSearchParams();

    if (start || end || value) {
      param.append('start', start);
      param.append('end', end);
      param.append('launches', value);
    } else {
      param.delete('launches');
    }
    history.push({ search: param.toString() });

    if (value === 'all') {
      setNewData(data);
    } else if (value === 'upcoming') {
      setNewData(data.filter((upcoming) => upcoming.upcoming));
    } else if (value === 'successfull') {
      setNewData(
        data.filter((launch_success) => launch_success?.launch_success)
      );
    } else if (value === 'failed') {
      setNewData(
        data.filter(
          (launch_success) =>
            !launch_success?.launch_success && !launch_success?.upcoming
        )
      );
    }
  }, [value, history, data, end, start]);

  const lastPage = currentPage * listPerPage;
  const firstPage = lastPage - listPerPage;
  const activePage = newData.slice(firstPage, lastPage);

  const pagination = (pageNumber) => SetCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="mainContainer">
        <div className="filterBar">
          <DatePicker
            SetLoading={SetLoading}
            setStart={setStart}
            setEnd={setEnd}
          />
          {/* select option */}
          <div className={'filterDropdown'}>
            <select
              value={value ? value : 'all'}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="all">All Launches</option>
              <option value="upcoming">Upcoming Launches</option>
              <option value="successfull">Successful Launches</option>
              <option value="failed">Failed Launches</option>
            </select>
          </div>
        </div>
        <div className="dataContainer">
          <DataList loading={loading} data={activePage} />
        </div>
        <Pagination
          listPerPage={listPerPage}
          pagination={pagination}
          currentPage={currentPage}
          totalList={newData.length}
        />
      </div>
    </>
  );
};
export default AllLaunches;
