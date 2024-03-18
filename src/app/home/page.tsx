import _Products from "@/components/_products/index.server";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Home Page',
    description: 'This is the home page',
}


export default function HomePage() {
    return (
        <div>
            <_Products/>
        </div>
    )
}
  