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

export { LoadingFullPage };
