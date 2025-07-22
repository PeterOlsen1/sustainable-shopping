export default function OpenExternally({ color = "white" }: { color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="13.7574" y1="6.24264" x2="5.75736" y2="14.2426" stroke={color}/>
            <path d="M7 6C7.74667 6 11.9778 6 14 6V13" stroke={color}/>
        </svg>
    )
}