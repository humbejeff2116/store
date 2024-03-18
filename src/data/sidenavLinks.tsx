import appRoutes from "@/routes";
import { NavLink } from "./interfaces";
import { BiCog, BiHome } from "react-icons/bi";
import { RiBookReadLine, RiHome2Line, RiHome3Line, RiLockLine, RiTruckLine, RiUser2Line, RiUser3Line, RiWallet3Line } from "react-icons/ri";


export type NavLinksType = Array<NavLink>;

export interface Links {
    main: Array<NavLink>
    footer: Array<NavLink>
}


interface LinksData {
    public: Links
    protected: Links    
}

const linksData: LinksData = {
    public: {
        main: [
            {
                name: "Home",
                icon: (
                    <RiHome3Line/>
                ),
                href: appRoutes.home
            },
            {
                name: "Order",
                icon: (
                    <RiTruckLine/>
                ),
                href: appRoutes.myOrders
            },
            {
                name: "Wallet",
                icon: (
                    <RiWallet3Line/>
                ),
                href: appRoutes.wallet
            },
            {
                name: "Profile",
                icon: (
                    <RiUser3Line/>
                ),
                href: appRoutes.profile
            }
        ],
        footer: [
            {
                name: "Terms",
                icon: (
                    <RiBookReadLine/>
                ),
                href: appRoutes.terms
            },
            {
                name: "Privacy",
                icon: (
                    <RiLockLine/>
                ),
                href: appRoutes.privacy
            },
            {
                name: "Settings",
                icon: (
                    <BiCog/>
                ),
                href: appRoutes.settings
            }
        ]

    },
    protected: {
        main: [
            {
                name: "Home",
                href: appRoutes.home
            }
        ],
        footer: [
            {
                name: "Sign Out",
                href: appRoutes.signOut
            },
            {
                name: "Settings",
                href: appRoutes.settings
            }
        ]
    }
}

class LinksService {
    #data = linksData;

    getPublicLinks() {
        return this.#data.public
    }

    #getProtectedLinks() {
        return this.#data.protected;
    }

    getAllLinks(): Links {
        const publicLinks = this.getPublicLinks();
        const protectedLinks = this.#getProtectedLinks();

        return ({
            main: [
                ...publicLinks.main,
                ...protectedLinks.main
            ],
            footer: [
                ...publicLinks.footer,
                ...protectedLinks.footer
            ]
        })
    }
}

const linksService = new LinksService();
export default linksService;