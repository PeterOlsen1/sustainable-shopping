import Image from "next/image";

export default function OurStandardsPage() {
    return (
        <div className="flex w-full flex-col items-center gap-8 mt-12 w-[90%] mx-auto">
            <div className="text-3xl">
                How we define sustainability
            </div>
            <Image
                src="/images/word-cloud.png"
                width={1200}
                height={600}
                alt="Word cloud of sustainability terms"
            />
            <div className="text-wrap text-center w-[90%]">
                These sentiments come from the responses to our survey, where we asked people to describe what sustainability means to them. 
                We used these responses to create a word cloud that visually represents the most common terms and concepts associated with sustainability.
            </div>
        </div>
    )
}