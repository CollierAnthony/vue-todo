import {createRouter, createWebHistory} from "vue-router"
import About from "../views/About"
import Home from "../views/Home"
import Signup from "../views/Signup"
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router