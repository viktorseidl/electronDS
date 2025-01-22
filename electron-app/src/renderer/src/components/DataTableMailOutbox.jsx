import React, { useState, useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import { MdArrowBackIos, MdArrowForwardIos, MdClose, MdDelete, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";  
import RowMessage from "./RowMessage";
import { FaSearch } from "react-icons/fa";
import RowMessageOut from "./RowMessageOut";  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { de } from 'date-fns/locale/de';
registerLocale('de', de)
const DataTableMailOutbox = ({ Data, updater }) => {
  const [filters, setFilters] = useState({
    Betrefftxt: "",
    Sendername: "Alle Empfanger",
    dateFrom: "",
    dateTo: "",
  }); 
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const rowsPerPage = 12;
  
  // Compute unique reasons with counters
  const reasonCounters = useMemo(() => {
    const counts = { 'Alle Empfanger': Data.length };
    Data.forEach((item) => { 
        item.Sendername.forEach((ab)=>{
      counts[ab] = (counts[ab] || 0) + 1;
        })
    }); 
    return counts;
  }, [Data]);
   
   const handleSelect = (id) => {
    
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    ); 
  }; 
  const selectAll = () => {
    let narr=[];
    if(selectedTickets.length!=paginatedData.length){
      paginatedData.map((item)=>{
        narr.push(item.ID)
      })
    }
    setSelectedTickets(narr)
  };
  // Filtered data based on ticket number, date, and reason
  const filteredData = useMemo(() => {  
    if (Data.length === 0) {
      return []; // Return an empty array if there's no data
    }
    return Data.filter((item) => {
      // Filter by ticket number
      const ticketMatch =!filters.Betrefftxt || item.Betreff
        .toLowerCase()
        .includes(filters.Betrefftxt.toLowerCase());

      // Filter by reason
      const reasonMatch = filters.Sendername === "Alle Empfanger" || item.Sendername.includes(filters.Sendername);
       
      // Filter by date range
      const createdDate = new Date(item.created * 1000); // Convert timestamp to Date
      const dateFromMatch =
        !filters.dateFrom || createdDate >= new Date(filters.dateFrom);
      const dateToMatch =
        !filters.dateTo || createdDate <= new Date(filters.dateTo);

      return ticketMatch && reasonMatch && dateFromMatch && dateToMatch;
    });
    //return Data
  }, [Data, filters]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const exdata=filteredData.slice(startIndex, startIndex + rowsPerPage);
    console.log(exdata)
    return exdata
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Update filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };
   
   
  return (
    <div className='w-full mt-2  flex-grow max-h-full overflow-auto flex flex-col items-start justify-start '> 
      {/* Filters */}
      <div className=' w-full h-20 flex flex-row items-center justify-end'>
          <div className='w-full px-4 '>
              <label className='  w-full flex flex-col items-center justify-center relative'> 
                  <input 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90   outline-none py-2 px-3 pl-14 text-sm'
                  placeholder="Suche in Betreff..."
                  value={filters.Betrefftxt}
                  onChange={(e) => handleFilterChange("Betrefftxt", e.target.value)}
                  />
                  <FaSearch className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>handleFilterChange("Betrefftxt", "")} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400 cursor-pointer '} style={{display:filters.Betrefftxt.length>0?'block':'none'}} />
              </label>
          </div>
          <div className='w-20 p-5 h-full flex flex-col items-center justify-center'>
              <div className='w-full aspect-square dark:bg-blue-200 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
              <MdPerson className='text-2xl' />
              </div>
          </div>
           </div>
      {/* Filters */}
      <div  className="w-full grid grid-cols-6 items-start justify-items-start gap-3 gap-x-4  text-sm px-4">
       
        <label className="w-full flex flex-col items-start justify-start">
          <a className="w-full mb-2">Empfänger</a>
        <select
          value={filters.Sendername}
          onChange={(e) => handleFilterChange("Sendername", e.target.value)}
          className="w-5/6  ml-2 dark:placeholder:text-blue-200/60 dark:text-white text-gray-800 placeholder:text-gray-500 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 outline-none ring-1 dark:ring-gray-700 ring-gray-200 rounded py-2 px-4 text-sm"
          >
          {Object.entries(reasonCounters).map(([Sendername, count]) => (
            <option key={Sendername} value={Sendername}>
              {Sendername} ({count}) {console.log(Sendername)}
            </option>
          ))}
        </select>
        </label>
        <label className="w-full flex  flex-col items-start justify-start">
        <a className="w-full mb-2">von</a>  
        <DatePicker 
        placeholderText="TT.MM.YYYY"
        locale={'de'}
        closeOnScroll={true}
        dateFormat={'dd.MM.yyyy'}
        className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 dark:text-white text-gray-800 placeholder:text-gray-500 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 outline-none ring-1 dark:ring-gray-700 ring-gray-200 rounded py-2 px-4 text-sm"
        selected={filters.dateFrom} 
        onChange={(date) => handleFilterChange("dateFrom", date)} /> 
        </label>
        <label className="w-full flex  flex-col items-start justify-start">
        <a className="w-full mb-2">bis</a>
        <DatePicker 
        placeholderText="TT.MM.YYYY"
        locale={'de'}
        closeOnScroll={true}
        dateFormat={'dd.MM.yyyy'}
        className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 dark:text-white text-gray-800 placeholder:text-gray-500 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 outline-none ring-1 dark:ring-gray-700 ring-gray-200 rounded py-2 px-4 text-sm"
        selected={filters.dateTo} 
        onChange={(date) => handleFilterChange("dateTo", date)} /> 
          </label> 
      </div>
 
      <div className='p-2 w-full flex flex-row items-center justify-between '>
                  <div className='flex flex-row items-center justify-start' > 
                      </div>
                  <div className='flex flex-row items-center justify-end'>
                      <div onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1} className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                      <MdArrowBackIos />
                      </div> 
                      <span className='px-4 text-sm h-full flex flex-row items-center justify-center gap-x-2'><a>Seite</a> <b>{currentPage}</b> <a>von</a> <b>{totalPages}</b></span>
                      <div onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      } className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                      <MdArrowForwardIos />
                      </div> 
                  </div>
              </div>

      {/* Table */}
      <div className='w-full dark:bg-gray-900 bg-white h-[77%]  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start divide-y dark:divide-gray-700 shadow-inner shadow-[rgba(0,0,0,0.3)] divide-gray-400'>  
          {paginatedData?.map((item,index) => (
           <Fragment key={item+index}><RowMessageOut item={item}  /></Fragment>
          ))}
          {paginatedData.length === 0 && (
            <div className='w-full h-full'> 
            <div className=" w-full h-full  text-center  px-4  py-20 dark:text-white">
              Keine Nachrichten vorhanden 
            </div>
          </div> 
          )} 
      </div> 
      <div className='p-2 w-full flex flex-row items-center justify-between '>
        <div className='flex flex-row items-center justify-start' > 
              </div>
          <div className='flex flex-row items-center justify-end'>
              <div  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}  className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
              <MdArrowBackIos />
              </div> 
              <span className='px-4 text-sm h-full flex flex-row items-center justify-center gap-x-2'><a>Seite</a> <b>{currentPage}</b> <a>von</a> <b>{totalPages}</b></span>
              <div  onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      } className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
              <MdArrowForwardIos />
              </div> 
          </div>
      </div>
    </div>
  );
};



export default DataTableMailOutbox;