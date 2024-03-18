import _ViewProduct from "@/components/_viewProduct";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'product Page',
    description: 'This is the home page',
}


export default function ViewProductPage() {
    return (
        <div>
            <_ViewProduct/>
        </div>
    )
}
  