function loadPage(component) {
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)
}
export default [
    { path: '/', component: loadPage('Home') },
    { path: '/login', component: loadPage('Login') },
    { path: '/about-us', component: loadPage('Aboutus') },
    { path: '/settings', component: loadPage('Settings') },
    { path: '/myTable', component: loadPage('Home') },
    { path: '/logOut', component: loadPage('LogOut') },
    { path: '/register', component: loadPage('Registration') },
    { path: '/home', component: loadPage('Home') },
    { path: '/Schedule', component: loadPage('Schedule') },
    { path: '/secure', component: loadPage('Secure'), beforeEnter : isAuth }
]

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./api/firebase"; 
function isAuth(to, from, next) {
    console.log("Checking auth");
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            // User is signed in so continue to desired page
            return next();
            // ...        
        } else {
            // User is signed out
            // Send them back to the home page or maybe the login page
            return next({ path: '/' });
        }
    });
}