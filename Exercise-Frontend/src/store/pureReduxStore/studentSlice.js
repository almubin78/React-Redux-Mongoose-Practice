import { createSlice } from "@reduxjs/toolkit";
import { studentsData } from "../datum/studentData/studentData";

const makePresent = (list) => list.map((s) => ({ ...s, present: true }));

const studentSlice = createSlice({
  name: "students",
  initialState: {
    batch: "ssc26",
    batchStudents: makePresent(studentsData.ssc26),
    sessionStudents: [],
    sessionTime: 5, // seconds (default)
  },

  reducers: {
    // CHANGE BATCH
    setBatch(state, action) {
      state.batch = action.payload;
      state.batchStudents = makePresent(studentsData[action.payload] || []);
      state.time = 5;
    },
    // SET SESSION TIME
    setSessionTime(state, action) {
      state.sessionTime = Number(action.payload);
    },
    // ADD STUDENT
    addStudent(state, action) {
      const nextId =
        state.batchStudents.length > 0
          ? Math.max(...state.batchStudents.map((s) => s.id)) + 1
          : 1;

      state.batchStudents.push({
        id: nextId,
        name: action.payload.name,
        imgLink: action.payload.imgLink || "",
        present: true,
      });
    },

    // UPDATE (toggle / edit)
    updateStudent(state, action) {
      const { id, data } = action.payload;
      const student = state.batchStudents.find((s) => s.id === id);
      if (student) {
        Object.assign(student, data);
      }
    },

    // DELETE
    deleteStudent(state, action) {
      state.batchStudents = state.batchStudents.filter(
        (s) => s.id !== action.payload
      );
    },
    // add inside reducers
    startSession(state) {
      state.sessionStudents = state.batchStudents.filter((s) => s.present);
    },
  },
});

export const {
  setBatch,
  updateStudent,
  deleteStudent,
  startSession,
  addStudent,
  setSessionTime,
} = studentSlice.actions;

export default studentSlice.reducer;
