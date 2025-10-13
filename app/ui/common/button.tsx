import Link from "next/link";

interface Props {
    label: string;
    href?: string;
    onClick?: () => void | Promise<void>;
    style?: string;
}

export default function Button({ label, href, onClick, style }: Props) {
    return (
        <div className="my-5">
            {href ? (
                <Link
                    href={href}
                    className="px-4 py-2 text-lg rounded-lg border-2 border-solid hover:bg-black hover:text-[#f5f5f5]"
                >
                    BACK
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className={`${style} bg-black text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-black`}
                >
                    {label}
                </button>
            )}
        </div>
    );
}
