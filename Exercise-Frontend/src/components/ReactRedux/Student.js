import { useDispatch, useSelector } from "react-redux";

import {
  setBatch,
  updateStudent,
  deleteStudent,
  startSession,
} from "../../store/studentSlice";

const Student = () => {
  const dispatch = useDispatch();
  const { batch, batchStudents,sessionStudents } = useSelector((state) => state.students);
 

  console.log('ss',sessionStudents); // ONLY present students

  return (
    <div className="p-4 space-y-4">
      {/* Batch Select */}
      <select
        value={batch}
        onChange={(e) => dispatch(setBatch(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="ssc26">SSC 26</option>
        <option value="Eight">Class Eight</option>
        <option value="classTenComplete">Class Ten</option>
      </select>

      {/* Student Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {batchStudents.map((s, index) => (
          <div
            key={`${s.id}-${index}`}
            className="border rounded p-3 flex gap-3 items-center"
          >
            <img
              src={s.imgLink || "https://via.placeholder.com/50"}
              alt={s.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm">{s.present ? "Present" : "Absent"}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() =>
                  dispatch(
                    updateStudent({
                      id: s.id,
                      data: { present: !s.present },
                    })
                  )
                }
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => dispatch(deleteStudent(s.id))}
                className="text-xs px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Start Session */}
      <button
        onClick={() => dispatch(startSession())}
        className="px-3 py-2 bg-green-600 text-white rounded"
      >
        Start Session
      </button>
    </div>
  );
};

export default Student;
