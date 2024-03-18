// import * as Yup from 'yup';
import { BiFemale, BiMale } from "react-icons/bi";
import { NavLink } from "../interfaces"
import { formInputType } from '@/components/types/form';

export type SubLink = Array<NavLink>;
type Options = Array<{id: string, name: string, value: string}>;
export type MainLinks = Array<{id: string, name: string, value: string}>;
export type SubLinks = Array<{id: string, icon: React.ReactElement, name: string, value?: string}>;

export interface SubLinkData {
    icon: React.ReactElement
    data: SubLink
}

interface Clothing {
    [key: string]: SubLinkData
    male: SubLinkData
    female: SubLinkData
}

interface Cosmetics {
    [key: string]: SubLinkData
    male: SubLinkData
    female: SubLinkData
}

export interface ActiveLink {
    name: string
}

interface Initial {
    [key: string]: any
}

interface YupValidation {
    [key: string]: any
}

type FormData = Array<SelectData>;
interface SelectData {
    [key: string]: any
    id: string
    name: string
    type: string,
    dontShowErrorText: boolean,
    options?: Options
}

export interface Form {
    initial: Initial
    yupValidation: YupValidation
    formData: FormData 
}


interface LinksData {
    [key: string]: Clothing | Cosmetics 
    clothing: Clothing
    cosmetics: Cosmetics    
}

const linksData: LinksData = {
    clothing: {  
        male: {
            icon: <BiMale/>,
            data:[
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                }
            ] 
        },
        female: {
            icon: <BiFemale/>,
            data: [
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                }

            ]
        }
    },
    cosmetics: {
        male: {
            icon: <BiMale/>,
            data: [
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                }
            ]
        },
        female: {
            icon: <BiFemale/>,
            data: [
                {
                    icon: <BiMale/>,
                    name: "Tops",
                    href:"/"
                },
                {
                    icon: <BiMale/>,
                    name: "Shoes",
                    href:"/"
                }
            ]
        }
    }
}

// Used terms...
// mainLink - all the keys of the links data object
// sublink - all the keys of a mainlink object

class LinksService {
    #data = linksData;

    /**
     * 
     * @returns all the keys of the links data object 
     */
    getMainLinks(): MainLinks {
        return Object.keys(this.#data).map((key, i) => ({id: i.toString(), name: key, value: key}));
    }

    /**
     * 
     * @returns the data of the mainLink object 
     */
    getMainLinkData(mainLink: string) {
        return this.#data[mainLink];
    }

    getMainLinksFormData(mainLinks: MainLinks) {
        const inputName = 'mainLinks';
        const selectData: SelectData = {
            id: "1",
            name: inputName,
            type: formInputType.select,
            dontShowErrorText: true,
            options: mainLinks
        }
        const formData: FormData = [selectData];
        const form: Form = {
            initial: {
                [inputName]: ''
            },
            yupValidation: {
                // [inputName]: Yup.string().required('Required')
            },
            formData: formData
        }
        return form;
    }

    getDefaultActiveMainLink() {
        return this.getMainLinks()[0];
    }

    getDefaultActiveSubLink() {
        const { name } = this.getDefaultActiveMainLink();
        return this.getSubLinks(name)[0];
    }

    getActiveSubLink(activeMAinLink: string) {
        return this.getSubLinks(activeMAinLink)[0];
    }

    /**
     * 
     * @returns the keys of the mainLink object 
     */
    getSubLinks(mainLink: string): SubLinks {
        const subLinks = this.getMainLinkData(mainLink);
        return Object.keys(subLinks).map((key, i) => ({
            id: i.toString(),
            icon: subLinks[key].icon, 
            name: key, 
            value: key
        })); 
    } 

    getSubLinksData(mainLink: string) {
        return this.getMainLinkData(mainLink);
    }

    getSubLinkData(mainLink: string, subLink: string) {
        return this.getMainLinkData(mainLink)[subLink] || null;
    }
}

const linksService = new LinksService();
export default linksService;