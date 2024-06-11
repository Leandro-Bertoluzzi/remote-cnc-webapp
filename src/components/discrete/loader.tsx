export default function Loader() {
    return (
        <div className="h-[32rem]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="m-auto w-full md:h-full"
            >
                <linearGradient id="a12">
                    <stop offset="0" stopColor="#643BFF" stopOpacity="0" />
                    <stop offset="1" stopColor="#643BFF" />
                </linearGradient>
                <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="url(#a12)"
                    strokeDasharray="0 44 0 44 0 44 0 44 0 360"
                    strokeLinecap="round"
                    strokeWidth="10"
                >
                    <animateTransform
                        attributeName="transform"
                        calcMode="discrete"
                        dur="2"
                        repeatCount="indefinite"
                        type="rotate"
                        values="360;324;288;252;216;180;144;108;72;36"
                    />
                </circle>
            </svg>
        </div>
    );
}
