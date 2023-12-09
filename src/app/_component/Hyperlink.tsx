import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import LinkifyIt from "linkify-it";
import { useRouter } from "next/navigation";
import React from "react";

export const Hyperlink = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const linkify = LinkifyIt();
  const links = linkify.match(text);
  const router = useRouter();
  const handleOpenLink = (url: string) => {
    const whitelistDomain = String(
      process.env.NEXT_PUBLIC_WHITELISTED_DOMAINS
    ).split(" ");
    if (whitelistDomain.includes(new URL(url).origin)) {
      const urlObject = new URL(url);
      stackRouterPush(router, urlObject.pathname);
    } else {
      sendWebviewEvent("OPEN_BROWSER_EVENT", { url });
    }
  };

  const replaceWithLinks = () => {
    let result = [];
    let lastIndex = 0;

    if (!links) return text;
    links.forEach(link => {
      // Add the text before the link
      result.push(text.substring(lastIndex, link.index));

      // Add the clickable link
      result.push(
        <>
          {link.index === 0 ? "" : " "}
          <button
            className="text-blue-500 hover:underline break-all text-start"
            onClick={() => {
              handleOpenLink(link.url);
            }}
          >
            {link.text}
          </button>{" "}
        </>
      );

      // Update the lastIndex for the next iteration
      lastIndex = link.lastIndex + 1;
    });

    // Add the remaining text after the last link
    result.push(text.substring(lastIndex));

    return result;
  };

  return (
    <>
      <pre
        className={classNames(
          inter.className,
          "whitespace-pre-wrap break-all",
          className
        )}
      >
        {replaceWithLinks()}
      </pre>
    </>
  );
};
