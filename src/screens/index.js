import _Auth from './Auth';
import _AboutUs from './AboutUs';
import { BarberScreenPaths } from './Barber';
import { CustomerScreenPaths } from './Customer';
import _ContactUs from './ContactUs';
import _ForgetPassword from './ForgetPassword';
import _ResetPassword from './ResetPassword';
import _NewPassword from './NewPassword';
export const MainScreenPaths = {
    Auth: _Auth,
    AboutUs: _AboutUs,
    ContactUs: _ContactUs,
    ForgetPassword: _ForgetPassword,
    ResetPassword: _ResetPassword,
    NewPassword: _NewPassword,
    Barber: BarberScreenPaths,
    Customer: CustomerScreenPaths
}