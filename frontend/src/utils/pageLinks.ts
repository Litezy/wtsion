import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Roadmap from "../pages/Roadmap";
import Tokenomics from "../pages/Tokenomics";

export const GeneralPages = [
    { path: '/', component: Home },
    { path: '/tokenomics', component: Tokenomics },
    { path: '/roadmap', component: Roadmap },
    { path: '/contact', component: Contact }
]