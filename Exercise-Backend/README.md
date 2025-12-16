# 74
## 74-1 Module overview and `create server`
```
npm init -y

npm i express cors mongodb dotenv
```
## command `git init` and Make `.gitignore` file
```
node_modules
.env
```
* .env File Create
```
DB_USER=GeniusCarSixtySeven
DB_PASSWORD=GeniusCarSixtySevenFirst
```
# 74-2 Load available options from database
## `in index.js`
```
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@doctorportal.keyukcj.mongodb.net/?retryWrites=true&w=majority`;
```

```
async function run(){
    try{
        
    }
    finally{

    }
}
run().catch(err => err))
```
# 74-3 Simple Overview of `React Query` <sup>`new` [TanStack Query](https://tanstack.com/query/v4)</sup> and load data
## [Installation](https://tanstack.com/query/v4/docs/installation)

`index.js`
```
import {
    QueryClient,
    QueryClientProvider,
} 
from '@tanstack/react-query'

const queryClient = new QueryClient()
-------
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```
`AvailableAppointment.js`
```
const [appointmentOptions, setAppointmentOptions] = useState([])
useEffect(() => {
        fetch('http://localhost:5000/appointmentOptions')
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))
    }, [])
এর বদলে নিচের অংশ ব্যবহার করেছি

const { data:appointmentOptions= []} = useQuery({
    queryKey: ['HudaiAktaName'],
    queryFn: () => fetch('http://localhost:5000/appointmentOptions')
    .then(res => res.json())   
})

অথবা,
const { data: appointmentOptions = [] } = useQuery({
    queryKey: ['HudaiAktaName'], //for unique cashing
    queryFn: async() => {
       const res =await fetch('http://localhost:5000/appointmentOptions');
        const data = await res.json();
        return data;
    }
})
```
# 74-4 API naming convention and save Booking to database
### `SignUp.js` করার পর হোম পেজ
# 74-5 (Interesting) Find available time slots for a day
```
app.get('/appointmentOptions', async (req, res) => {
    const query = {};
    const date = req.query.date;
    const options = await appointmentOptionsCollection.find(query).toArray();
    const bookingQuery = { appointmentDate: date }//single date er jonno bookingQuery
    const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();
    options.forEach(option=>{
        const optionBooked = alreadyBooked.filter(book=>book.treatment === option.name);
        const bookedSlots = optionBooked.map(book=>book.slot);
    })
    res.send(options)
});
```
# 74-6 (Recap) Load available time slots based on the date
* For slot auto reload [UseQuery:TanStack Query](https://tanstack.com/query/v4/docs/reference/useQuery) and emplement `refetch` in `AvailableAppointment.js` and send this as a props to `BookingModal ` and implement in `POST` method.

## Make A component Shared>`Loading.js`
### [TailwindCss Loading Spinier](https://flowbite.com/docs/components/spinner/)
###  সমস্যাঃ  74-6 no Module এ refetch use  করেছি কিন্তু বুকিং থেকে স্লটের কোন পরিবর্তন হচ্ছে না [কমছেনা] ১৬ টিই রয়ে যাচ্ছে। তবে ব্যাকেন্ডে ঠিকই কম পাচ্ছি।
### `Solved`:  option.slots কে  remainingSlots তে সেট করিনি  বলে ঠিকঠাক দেখায়নি।

# 74-7 (optional) Use mongodb aggregate project pipeline
## [mongodb lookup aggregation](https://www.mongodb.com/docs/v4.2/reference/operator/aggregation/lookup/)
```
app.get('/v2/appointmentOptions', async (req, res) => {
            const date = req.query.date;
            const options = await appointmentOptionsCollection.aggregate([
                {
                    $lookup:
                    {
                        from: 'bookings',
                        localField: 'name',
                        foreignField: 'treatment',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$appointmentDate', date]
                                    }
                                }
                            }
                        ],
                        as: 'booked'
                    }
                },
                {
                    $project: {
                        name: 1,
                        slots: 1,
                        booked: {
                            $map: {
                                input: '$booked',
                                as: 'book',
                                in: '$$book.slot'
                            }
                        }
                    }
                },
                {
                    $project: {
                        name: 1,
                        slots: {
                            $setDifference: ['$slots', '$booked']
                        }
                    }
                }
            ]).toArray();
            res.send(options);
        });
```
# 74-8 Limit one booking `per user per treatment per day`
```
app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const query = {
                appointmentDate: booking.appointmentDate,
                treatment: booking.treatment,
                email: booking.email
            }
            const alreadyBooked = await bookingsCollection.find(query).toArray();
            if(alreadyBooked.length){
                const message = `You have already booking ${booking.treatment}`
                return res.send({acknowledged: false, message})
            }   
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);

        })
```
## `HomeWork Also` in the last time on this video
# 75-1 Create Dashboard route with Drawer and Nested Route
* Layout>`DashboardLayout.js`
* `DaisyKhala> Drawer`> Drawer for mibile + fixed sidebar for desktop> Copy
* Pages>Dashboard>AllUsers>`AllUsers.js`
* src> hooks> `useAdmin.js`
* src> hooks> `useToken.js`
* some task in `Navbar.js`
# 75-2 Display User specific Appointments using Data Table
* Pages>Dashboard>MyAppontment>`MyAppontment.js`
* `daisyui`>table
```
app.get('/bookings', async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const query = {email: email};
    const booking = await bookingsCollection.find(query).toArray()
    res.send(booking)

})
```
# 75-3 Save Registered user information in the database
## in `SignUp.js`
```
const saveUser = (name,email)=>{
    const user = {name,email};
    fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('saveUser',data);
        navigate('/')
        // navigate(from, { replace: true });
    })
}
```
# 75-4 (Recap) Issue Simple JWT token
```
npm i jsonwebtoken
require('crypto').randomBytes(64).toString('hex')
```
* set access token in index.js [server] in `.env`
```
app.get('/jwt',async(req,res)=>{
    const email = req.query.email;
    const query = {email: email};
    const user = await usersCollection.findOne(query);
    // res.send(user)
    if(user){
        const token = jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
        console.log(token);
        return res.send({accessToken: token})
        //the name 'accessToken' sent to 'SignUp.js'
    }
    res.status(403).send({accessToken: ''})
})
```
# 75-5 (Recap) Send JWT token to back end for verification
```
function verifyJWT(req,res,next){
    // console.log('myAppoinment to Backed verifyJWT=',req.headers.authorization);

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.send(401).send('unauthorized access');
    }
    const token = authHeader.split(' ')[1];
    console.log('get token after split in verifyJWT=',token);
}
```
# 75-6 (Recap) Verify JWT Token and create custom hook
```
const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                    }
                });
        }
    }, [email]);
    return [token];
};

export default useToken;
```
# 75-7 Load all users on the Dashboard page
`AllUsers.js` and 
```
app.get('/users', async (req, res) => {
    const query = {};
    const users = await usersCollection.find(query).toArray();
    res.send(users)
});
```
# 75-8 Create Make admin API limit the feature based on admin level
===========
```
expiresIn: expressed in seconds or a string describing a time span vercel/ms.
Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
```
===========
# 76-1 Module Overview and Add a doctor admin route setup
* `adila1@jannat.com`
# 76-2 Load services with data project and Add file type input
`AddDoctor.js` useForm()
```
app.get('/appointmentSpecialty', async (req, res) => {
    const query = {}
    const result = await appointmentOptionCollection.find(query).project({ name: 1 }).toArray();
    res.send(result);
})
```
# 76-3 File Type image field and understand form data
# 76-4 Upload image to `image hosting server imgbb` and get image url
* goto [imgbbAPI](https://api.imgbb.com/)> copy api
* go to `.env.local` create a `name=api` and use it `AddDoctor.js`
# 76-5 Save Doctor info in the database and display success message 
### post in `AddDoctor.js` and send to database
### create `ManageDoctors.js` and setup it to `DashboardLayout.js`
## `app.get('/doctors)`
# 76-6 Mange Doctors and delete doctor with authorization (homework)
### `ManageDoctors.js`
# 76-7 Create a generic purpose confirmation modal
* Shared>ConfirmatonModal>ConfirmatonModal.js
# 76-8 Delete User VerifyAdmin middleware and load all doctors
```
app.delete('/doctors/:id',async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await doctorsCollection.deleteOne(filter);
    res.send(result);
})
```
# 76-9 Module Summary and modal correction
```
const verifyAdmin = async (req, res, next) => {
    const decodedEmail = req.decoded.email;
    const query = { email: decodedEmail };
    const user = await usersCollection.findOne(query)
    if (user?.role !== 'admin') {
        return res.status(403).send({ message: 'forbidden access' })
    }
    next();
}
```
# 77
* [goto Stripe](https://stripe.com/docs/stripe-js/react)
```
npm install --save @stripe/react-stripe-js @stripe/stripe-js

```
## নতুন ভাবে সেটাপ দেবার পর accessToken setap notun vabe diyechi