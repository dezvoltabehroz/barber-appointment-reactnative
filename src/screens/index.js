import _Auth from './Auth';
import _AboutUs from './AboutUs';
import { BarberScreenPaths } from './Barber';
import { CustomerScreenPaths } from './Customer';
import _ContactUs from './ContactUs';

export const MainScreenPaths = {
    Auth: _Auth,
    AboutUs: _AboutUs,
    ContactUs: _ContactUs,
    Barber: BarberScreenPaths,
    Customer: CustomerScreenPaths
}