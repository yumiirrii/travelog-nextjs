import Link from "next/link";

interface Props {
    href?: string;
    onClick?: () => void;
}

export default function BackButton({ href, onClick }: Props) {
    return (
        <div className="my-5">
            {href ? (
                <Link
                    href={href}
                    className="px-2.5 py-1.5 text-base rounded-lg border border-solid hover:bg-black hover:text-[#f5f5f5]"
                >
                    BACK
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className="hover:bg-black hover:text-[#f5f5f5]"
                >
                    BACK
                </button>
            )}
        </div>
    );
}
