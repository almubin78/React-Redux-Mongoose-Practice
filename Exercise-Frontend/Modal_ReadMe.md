## cd C:\Projects\batch-6\PracticingFile\DoctorsPortals\client-backend_with_tailwind\client_tailwind

# `set it by using useQuery ` in `AvailableAppointments.js` base on `Date`

### const { data: `appointmentOptions` = [], refetch, isLoading } = useQuery({
*         queryKey: ['appointmentOptions', date],
*         queryFn: async () => {
###             const res = await fetch(`http://localhost:5000/v2/appointmentOptions?date=${date}`);
*             const data = await res.json();
*             return data
*         }
*     });

* option get after appointmentOptions.
## option  set to `AppointmentOption` like to sent it `<AppointmentOption>` `COMPONENT`

```
  appointmentOption={option}
```
# destructuring:: ` AppointmentOption` 
# 
## AppointmentOption.js

