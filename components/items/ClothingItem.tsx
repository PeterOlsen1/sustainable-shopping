import Image from "next/image";

const shirt = {
    name: "T-shirt name",
    price: "20",
    brand: "Patagonia",
    imageUrl: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd33c434f/images/hi-res/38504_NENA.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",

}
export default function ClothingItem({ item }: {item: any}) {
    item = shirt; //for testing purposes

    return (
        <div className="flex flex-col">
            <Image 
                src={"https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd33c434f/images/hi-res/38504_NENA.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef"} 
                alt={item.name} 
                width={250} 
                height={250} 
                className="rounded-lg object-cover"
            />
            <div className="mt-2">
                <div className="text-lg font-bold">{item.brand}</div>
                <div className="text-md text-gray-400">{item.name}</div>
                <div className="text-md">${parseFloat(item.price).toFixed(2)}</div>
            </div>
        </div>
    )
}