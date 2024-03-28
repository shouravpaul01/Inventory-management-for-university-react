import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from 'react';


const FilterByDate = ({setFilterByDate}) => {
    const [fromAndToDate, setFromAndToDate] = useState({})
    const handleFilterByDate = (date) => {
        setFilterByDate(date)
    }
    return (
        <div className="flex flex-col md:flex-row gap-2 ">
                        <Flatpickr
                            className="input input-sm input-bordered focus:outline-none focus-within:border-violet-500 "
                            placeholder="Select From Date"
                            value={fromAndToDate?.fromDate}
                            onChange={(selectedDates, dateStr, ins) => {
                                setFromAndToDate(prev => {
                                    if (dateStr == '') {
                                        setFilterByDate({})
                                        return {}
                                    } else if (prev.fromDate && prev.toDate) {
                                        return { 'fromDate': dateStr, 'toDate': prev.toDate }
                                    } else {
                                        return { 'fromDate': dateStr }
                                    }
                                })
                               
                            }}
                            options={{
                                dateFormat: 'Y-m-d',
                                appendTo: document.body,
                            }}
                        />
                        <Flatpickr
                            className={`input input-sm input-bordered focus:outline-none focus:border-violet-500 `}
                            placeholder="Select To Date"
                            value={fromAndToDate?.toDate}
                            onChange={(selectedDates, dateStr, ins) => {
                                setFromAndToDate(prev => {
                                    if (dateStr == '') {
                                        return { 'fromDate': prev.fromDate }
                                    } else {
                                        return { 'fromDate': prev.fromDate, 'toDate': dateStr }
                                    }
                                })
                                
                            }}
                            options={{
                                dateFormat: 'Y-m-d',
                            }}
                            disabled={fromAndToDate?.fromDate ? false : true}
                        />
                        <Link onClick={() => handleFilterByDate(fromAndToDate)} className="btn btn-sm btn-primary " disabled={(fromAndToDate?.fromDate && fromAndToDate?.toDate) ? false : true}><IoFilterSharp /> Filter By Date</Link>
                    </div>
    );
};

export default FilterByDate;