import { useEffect, useState } from "react";
import { studentsData } from "../datum/studentData/studentData";
import { configureStore } from '@reduxjs/toolkit'

export const useDatumForComponents = ()=>{
    const [batch, setBatch] = useState('ssc26');
    const [batchStudents, setBatchStudents] = useState([]);

    //
    const [availableStudents, setAvailableStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);

    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [extraTasks, setExtraTasks] = useState([]);



    useEffect(()=>{
        if(batch && studentsData[batch]){ 
            setBatchStudents(studentsData[batch].map((student)=>({...student,present:true})));

        }
    
    },[batch])

    return {
        batch, setBatch,
        batchStudents,

    }
}


export default configureStore({
  reducer: {},
})
