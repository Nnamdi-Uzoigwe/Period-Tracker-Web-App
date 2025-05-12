export default function Button({ children }) {
    return (
        <div className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white py-3 px-8 rounded-md w-fit">{children}</div>
    )
}