import Image from "next/image";

export default function OurStandardsPage() {
    return (
        <div className="flex w-full flex-col items-center gap-8 mt-12 w-[90%] mx-auto">
            <div>
                How we define sustainability
            </div>
            <Image
                src="/images/word-cloud.png"
                width={1200}
                height={600}
                alt="Word cloud of sustainability terms"
            />
        </div>
    )
}