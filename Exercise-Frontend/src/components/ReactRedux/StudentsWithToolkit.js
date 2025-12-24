import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBatch,
  setSessionTime,
  startSession,
} from "../../store/studentSlice";
import {
  useAddStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
  useUpdateStudentMutation
} from "../../store/apiSliceForToolkit";

const StudentsWithToolkit = () => {
  // Local form state
  const [name, setName] = useState("");
  const [imgLink, setImgLink] = useState("");

  // Get batch from Redux store
  const { batch, sessionTime, sessionStudents } = useSelector(
    (state) => state.students
  );
  
  // RTK Query hooks
  const { 
    data: batchStudents = [], 
    isLoading, 
    isError, 
    refetch 
  } = useGetStudentsQuery(batch);
  
  const [addStudentMutation] = useAddStudentMutation();
  const [updateStudentMutation] = useUpdateStudentMutation();
  const [deleteStudentMutation] = useDeleteStudentMutation();

  const dispatch = useDispatch();

  // Handle student toggle with API
  const handleToggle = async (student) => {
    try {
      await updateStudentMutation({
        id: student._id || student.id,
        data: { present: !student.present }
      }).unwrap();
      // Optional: refetch students to get latest data
      // refetch();
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  // Handle delete student with API
  const handleDelete = async (studentId) => {
    try {
      await deleteStudentMutation(studentId).unwrap();
      // Optional: refetch students to get latest data
      // refetch();
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  // Handle add student with API
  const handleAddStudent = async () => {
    if (!name.trim()) return;
    
    try {
      await addStudentMutation({
        name: name.trim(),
        imgLink: imgLink.trim(),
        batch: batch,
        present: true
      }).unwrap();
      
      // Clear form
      setName("");
      setImgLink("");
      
      // Optional: refetch students
      // refetch();
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-2">Loading students...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="p-4">
        <div className="alert alert-error">
          <span>Failed to load students. Please try again.</span>
          <button onClick={refetch} className="btn btn-sm btn-outline ml-2">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header with controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Batch Select - DaisyUI version */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Batch</span>
            </label>
            <select
              value={batch}
              onChange={(e) => dispatch(setBatch(e.target.value))}
              className="select select-bordered w-40"
            >
              <option value="ssc26">SSC 26</option>
              <option value="Eight">Class Eight</option>
              <option value="classTenComplete">Class Ten</option>
            </select>
          </div>

          {/* Session Time Select - DaisyUI version */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session Time</span>
            </label>
            <select
              value={sessionTime}
              onChange={(e) => dispatch(setSessionTime(e.target.value))}
              className="select select-bordered w-32"
            >
              <option value="5">5 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
            </select>
          </div>
        </div>

        {/* Start Session Button - DaisyUI version */}
        <button
          onClick={() => dispatch(startSession())}
          className="btn btn-success"
          disabled={!batchStudents.filter(s => s.present).length}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Start Session
          {batchStudents.filter(s => s.present).length > 0 && (
            <span className="badge badge-neutral ml-2">
              {batchStudents.filter(s => s.present).length} present
            </span>
          )}
        </button>
      </div>

      {/* Student Stats */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Students</div>
          <div className="stat-value">{batchStudents.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Present</div>
          <div className="stat-value text-success">
            {batchStudents.filter(s => s.present).length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Absent</div>
          <div className="stat-value text-error">
            {batchStudents.filter(s => !s.present).length}
          </div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batchStudents.map((student) => (
          <div
            key={student._id || student.id}
            className={`card card-compact ${student.present ? 'bg-base-100' : 'bg-base-200 opacity-80'} shadow hover:shadow-lg transition-shadow`}
          >
            <div className="card-body">
              <div className="flex items-center space-x-4">
                {/* Student Avatar */}
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img
                      src={student.imgLink || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + student.name}
                      alt={student.name}
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Student Info */}
                <div className="flex-1">
                  <h3 className="card-title text-lg">{student.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`badge ${student.present ? 'badge-success' : 'badge-error'}`}>
                      {student.present ? "Present" : "Absent"}
                    </span>
                    <span className="badge badge-outline">{student.batch}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleToggle(student)}
                  className={`btn btn-sm ${student.present ? 'btn-warning' : 'btn-success'}`}
                >
                  {student.present ? "Mark Absent" : "Mark Present"}
                </button>
                <button
                  onClick={() => handleDelete(student._id || student.id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Form - DaisyUI version */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Add New Student</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Student Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="input input-bordered"
                onKeyPress={(e) => e.key === 'Enter' && handleAddStudent()}
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Image URL (Optional)</span>
              </label>
              <input
                type="text"
                value={imgLink}
                onChange={(e) => setImgLink(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
                onKeyPress={(e) => e.key === 'Enter' && handleAddStudent()}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">&nbsp;</span>
              </label>
              <button
                onClick={handleAddStudent}
                className="btn btn-primary"
                disabled={!name.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsWithToolkit;