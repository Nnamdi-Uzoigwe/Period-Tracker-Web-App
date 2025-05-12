import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function PageNotFound() {
    return (
        <div className="h-screen flex flex-col gap-3 items-center justify-center">
            <img src="/notFound.png" alt="" width={300} />
            <h1 className="text-[#ff6c61] text-4xl font-semibold">Oops!</h1>
            <p className="text-gray-600 text-lg font-semibold">The page you are looking for is either missing or does not exist.</p>
            <Link to="/">
                <Button>
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}