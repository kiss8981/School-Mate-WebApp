import Button from "@/app/_component/Button";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";

const SginoutAlert = ({ callbackNext }: { callbackNext: () => void }) => {
  return (
    <div className={classNames(inter.className, "px-5 flex flex-col h-[88vh]")}>
      <span className="font-bold text-xl">계정을 삭제하시겠습니까?</span>
      <div className="flex flex-col text-[#7C7C7C] mt-3">
        <span>계정을 삭제하는 경우:</span>
        <div className="flex flex-col ml-3">
          <div className="flex flex-row space-x-2">
            <span>•</span>
            <span>
              더 이상을 해당 계정으로 스쿨메이트에 로그인할 수 없게 됩니다.
            </span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>•</span>
            <span>게시한 게시물 및 사진들은 엑세스 권한이 손실됩니다.</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>•</span>
            <span>결제한 구독 서비스에 대해 환불을 받을 수 없게 됩니다.</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>•</span>
            <span>
              채팅 메시지 등 계정에 저장되지 않는 정보가 다른 사람에게 계속 표시
              될 수 있습니다.
            </span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>•</span>
            <span>계속하시겠습니까?</span>
          </div>
        </div>
      </div>
      <Button
        className="mt-auto rounded-full h-14 w-full mb-5"
        onClick={callbackNext}
      >
        계속
      </Button>
    </div>
  );
};
export default SginoutAlert;
