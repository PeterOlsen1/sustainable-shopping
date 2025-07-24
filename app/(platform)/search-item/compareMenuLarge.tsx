import Cross from "@/components/ui/cross"
import { useState, useEffect } from "react"
import { Gruppo } from 'next/font/google'
import ClothingItem from "@/components/items/ClothingItem";
import setHead from "@/actions/head/setHead";

const gruppo = Gruppo({ 
  weight: '400',
  subsets: ['latin'] 
})

setHead(`Compare Products | Sustainable Shopping`, `Compare your selected sustainable clothing items`)

export default function CompareMenuLarge({ selectedItems, onClose }: any) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay to ensure the component is mounted before starting animation
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for animation to complete before calling onClose
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div 
            className={`fixed top-0 left-0 w-screen h-screen bg-white z-51 flex flex-col text-center transition-all gap-16 duration-200 ease-out p-16 ${
                isVisible 
                    ? 'opacity-100' 
                    : 'opacity-0'
            }`}
            style={{
                transition: 'transform 300ms ease-out, opacity 300ms ease-out'
            }}
        >
            <Cross className="absolute top-6 right-6 cursor-pointer text-gray-500 hover:text-gray-700" onClick={handleClose} />
            <div className={`text-4xl mt-4 ${gruppo.className}`}>
                Compare products
            </div>
            <div className="flex w-full justify-evenly">
                {selectedItems.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2">
                        <ClothingItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}