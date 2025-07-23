"use client";

import { getBrands, getClothing } from "@/actions/db/queries";
import { useEffect } from "react"

export default function View() {
    useEffect(() => {
        (async () => {
            const items = await getClothing();
            console.log("Clothing items:", items);
        })();

        (async () => {
            const brands = await getBrands();
            console.log("Brands:", brands);
        })();
    }, []);
    
    return (
        <div>
            check the console for the data
        </div>
    )
}