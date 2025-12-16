const SelectBatchAndTime = ({ setBatch }) => {
  const handler = (e) => {
    setBatch(e.target.value);
  };
  return (
    <>
    <div className="border p-5">
        <h1>Select Batch</h1>
         <select name="" id="" onChange={handler}>
        <option value="ssc25">SSC-26</option>
        <option value="classTenComplete">Class Ten</option>
        <option value="Eight">Eight</option>
      </select>
    </div>
     
      <div>
        <h1>Select time for timer</h1>
        <select name="" id="" onChange={handler}>
          <option value="5">Test:5 Sec</option>
          <option value="60">1 Minit</option>
          <option value="120">2 Minit</option>
          <option value="300">5 Minit</option>
        </select>
      </div>
    </>
  );
};
export default SelectBatchAndTime;
