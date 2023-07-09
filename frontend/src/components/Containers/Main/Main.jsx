export default function Main({ children }) {
    return (
        <div className="flex flex-col flex-grow overflow-x-auto bg-softGray overflow-hidden px-5 py-6 gap-2.5 relative" style={{ minWidth: 'calc(100vw - 16rem)' }}>
            {children}
        </div>
    )
}