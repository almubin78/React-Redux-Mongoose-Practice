
import { useDatumForComponents } from '../hooks/useDatumForComponents';
// import SelectBatchAndTime from './SettingPages/SettingBatchAndTimer/SelectBatchAndTime';
import Student from './ReactRedux/Student';

const RootPage = () => {

    const {
        batch,setBatch,
        batchStudents,

    } = useDatumForComponents();

    console.log(batch,batchStudents);
    return (
        <div>
            this is root page
            {/* <div>
                <SelectBatchAndTime
                    setBatch={setBatch}
                />
            </div> */}
            <p className='text-2xl uppercase text- bg-yellow-300'>this is react redux practice</p>
            <Student/>
            <p className='text-2xl uppercase text- bg-yellow-300'>this is react redux practice with Toolkit</p> 
        </div>
    );
};

export default RootPage;