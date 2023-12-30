import HeaderContainer from "@/app/_component/HeaderContainer";
import { Hyperlink } from "@/app/_component/Hyperlink";
const markdown = `
caniuse-lite
https://github.com/browserslist/caniuse-lite
CC BY 4.0 License

@ampproject/remapping
https://github.com/ampproject/remapping
Apache-2.0 License

@react-native-firebase/analytics
https://github.com/invertase/react-native-firebase/tree/main/packages/analytics
Apache-2.0 License

@react-native-firebase/app
https://github.com/invertase/react-native-firebase/tree/main/packages/app
Apache-2.0 License

bser
https://github.com/facebook/watchman
Apache-2.0 License

caniuse-lite
https://github.com/browserslist/caniuse-lite
CC BY 4.0 License

detect-libc
https://github.com/lovell/detect-libc
Apache-2.0 License

detect-libc
https://github.com/lovell/detect-libc
Apache-2.0 License

fb-watchman
https://github.com/facebook/watchman
Apache-2.0 License

find-yarn-workspace-root
https://github.com/lovell/detect-libc
Apache-2.0 License

human-signals
https://github.com/ehmicky/human-signals
Apache-2.0 License

localforage
https://github.com/lovell/detect-libc
Apache-2.0 License

walker
https://github.com/daaku/nodejs-walker
Apache-2.0 License

xcode
https://github.com/apache/cordova-node-xcode
Apache-2.0 License

@swc/helpers
https://github.com/swc-project/swc
Apache-2.0 License

pdfjs-dist
https://github.com/mozilla/pdfjs-dist
Apache-2.0 License

The Wolf Kit Icons (v.1.0.1)
https://www.figma.com/community/file/1194632762582105952
CC BY 4.0 License
`;

const OpenSourcePage = () => {
  return (
    <>
      <HeaderContainer title="오픈소스 라이선스">
        <Hyperlink text={markdown} className="px-4" />
      </HeaderContainer>
    </>
  );
};

export default OpenSourcePage;
