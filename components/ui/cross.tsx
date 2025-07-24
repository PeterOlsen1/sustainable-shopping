export default function Cross({ className, onClick }: { className?: string, onClick?: () => void }) {
    return (
        <div onClick={onClick} className={`cursor-pointer ${className}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <line
                    x1="15.8536"
                    y1="4.35355"
                    x2="3.85355"
                    y2="16.3536"
                    stroke="#1D1D1D"
                    />
                    <line
                    x1="16.1464"
                    y1="16.3536"
                    x2="4.14645"
                    y2="4.35355"
                    stroke="#1D1D1D"
                    />
                </svg>
        </div>
    )
}