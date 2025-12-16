# Doctor's Portal
```
npm create-react-app doctor-portal
tailwind
daisyUI
react-router-dom
```
```
npm install react-day-picker date-fns
npm install react-hook-form

```
## [dayPicker](https://react-day-picker.js.org/start)
## [react-hook-form](https://react-hook-form.com/)
# 71-1 Module introduction and project setup
# 71-2 Setup react router dom layout and routes
* src>Pages>Home>Home.js 
* src>Pages>Shared>Navbar>Navbar.js `[daisy]`

* src>Pages>Shared>Footer>Footer.js
* src>Layout>`Main.js`
```
return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
```
* src>Routes>`Routes.js`
```
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            },            
])
export default router;
```
### `App.js`
```
return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
```
* src>Pages>Shared>Login>Login.js
# 71-3 Introduction to Daisy UI to use default NavBar
* max-w-[1440px] mx-auto in `App.js`
* `React.Fragment` = <></>
*  src>Pages>Home>Banner>Banner.js
# 71-4 Create simple Top Banner Using Hero component
* * daisy>Hero
### in `tailwind.config.js`
```
daisyui:{
    themes: [
      {
        doctortheme:{
          primary: '#0FCFEC',
          secondary: '#19D3AE',
          accent: "#3A4256",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        }
      }
    ]
  },
```

## `Interesting Part:` src>Pages>Home>InfoCards [Home work]
# 71-5 Make Info Card Dynamic with `dynamic CSS Class`
```
 className={`card text-white p-6 md:card-side shadow-xl ${bgClass}`}
```
# 71-6 Responsive Grid for services section
*  src>Pages>Home>Services>Services.js
# 71-7 Pop image out of the section in Appointment section
* src>pages>Home>MakeAppointment>MakeAppointment.js 
```
style={{
    background: `url(${appointment})`
}}
```
*  src>component>PrimaryButton>`PrimaryButton.js` interesting: ` bg-gradient-to-r from-primary to-secondary`
```
const PrimaryButton = ({children}) => {

  return (
      <button 
      className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">{children}</button>
  );
};
```
# 71-8 Add Testimonials with Avatar and fake data
* src>Home>Testimonial>Testimonial.js 
* src>Home>Testimonial>Review.js
* [avaterFromDaisyui](https://daisyui.com/components/avatar/)
# 71-9 Module Summary and set Footer

# 72-1 Module Introduction, Recap and Appointment Page

* src>pages>Appointment>Appointment>Appointment.js
* `set it to route`
* src>pages>Appointment>AppointmentBanner>`AppointmentBanner.js` child of `Appointment.js`
# 72-2 Create Appointment Banner using `React Day Picker`
## [dayPicker](https://react-day-picker.js.org/start)
### in `index.js`
```
import 'react-day-picker/dist/style.css';
```
```
import { format } from 'date-fns';
```
### in `AppointmentBanner.js`

# 72-3 Lift up state to share data and Available Appointment Component
* src>pages>Appointment>AvailableAppointments>`AvailableAppointments.js` child of `Appointment.js`
# 72-4 Appointment Options and available slots with conditional rendering
*` ApointmentOptions.js` 
```
<p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
<p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
```
# 72-5 Display a modal from on booking click with dynamic data
# 72-6 Create Booking form inside Booking modal
# 72-7 (Recap) Modal data and state interactions
# 72-8 Module summary and Close Modal
---------------
--------------
--------------
# 73-1 Module Introduction and `react hook form `setup
## Create `Login.js` src>Pages>Login
## `Search` - [react hook form](https://react-hook-form.com/get-started)
```
npm install react-hook-form
```
# 73-2 Setup Login page, and `Firebase Project setup`
# 73-3 Explore React hook form validation, error handling


# 74-1 Module overview and create server
### `Create server`
```
npm init -y
npm i express cors dotenv mongodb
```
# 77
* [goto Stripe](https://stripe.com/docs/stripe-js/react)
```
npm install --save @stripe/react-stripe-js @stripe/stripe-js

```
## নতুন ভাবে সেটাপ দেবার পর accessToken setap notun vabe diyechi
# 78_5-1 (Optional) Node Mailer overview and create of Send Grid account
