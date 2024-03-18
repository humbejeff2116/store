import appRoutes from "@/routes";
import { IconContext } from "react-icons";
import { 
    BiHome, 
    BiUser, 
    BiFolder, 
    BiCog, 
    BiHelpCircle, 
    BiLogOut, 
    BiCoinStack, 
    BiWallet, 
    BiSearch, 
    BiCart,
    BiSolidNotification
} from "react-icons/bi";
import { 
    FaTwitter,
    FaInstagramSquare,
    FaFacebookSquare,
    FaUsers,
    // FaLinkedinIn,
    // FaGithubSquare, 
} from 'react-icons/fa';
import { RiCoinsFill, RiLuggageCartFill, RiMenuSearchFill, RiNotification2Fill, RiNotification3Fill, RiSearch2Fill, RiSearchFill, RiShoppingBag2Fill, RiWallet2Fill, RiWallet3Fill, RiWalletFill } from "react-icons/ri";

const ICON_CLASS_NAME = "nav-icon";
const SIDENAV_FOOTER_ICON_CLASS_NAME = 'sidenav-footer-icon';

const links = [
    { 
        id: "1",
        name: "Search", 
        href: appRoutes.search, 
        icon: (
            <RiMenuSearchFill/>
        )
    },
    { 
        id: "2",
        name: "Wallet", 
        href: appRoutes.wallet, 
        icon: (
            <RiWallet3Fill/>
        )
    },
    { 
        id: "3",
        name: "Notification", 
        href: appRoutes.notification, 
        icon: (
            <RiNotification3Fill/>
        )
    },
    { 
        id: "4",
        name: "Cart", 
        href: appRoutes.cart, 
        icon: (
            <RiShoppingBag2Fill/>
        ) 
    },
]


const mainLinks = [
    { 
        id: "1",
        name: "Home", 
        href: appRoutes.home, 
        icon: (
            <BiHome/>
        )
    },
    { 
        id: "2",
        name: "About", 
        href: appRoutes.about, 
        icon: (
            <BiUser/>
        ) 
    },
    { 
        id: "3",
        name: "Sell", 
        href: appRoutes.sell, 
        icon: (
            <BiUser/>
        ) 
    },
]


class LinksService {
    #data = {
        mainLinks,
        links
    }; 
    links() {
        return this.#data.links;
    }
    mainLinks() {
        return this.#data.mainLinks;
    }
}

const headerLinksService = new LinksService();
export default headerLinksService;