import Lottie from "lottie-react";
import LoadingLogo from "../../assets/lottie/loadingLogo.json";

const LoadingFullPage = () => {
  return (
    <div
      id="loading"
      className="fixed left-0 top-0 h-full w-full backdrop-blur-sm"
      style={{
        transition: "all .3s ease",
        zIndex: 1000,
        background: "rgba(0,0,0,.3)",
      }}
    >
      <div className="flex h-full items-center justify-center opacity-100">
        <Lottie className="w-44" animationData={LoadingLogo} />
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#ffffff"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="#ffffff"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </>
  );
};

export { LoadingFullPage, Loading };
