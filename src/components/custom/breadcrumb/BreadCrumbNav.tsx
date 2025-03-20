"use client";

import { Breadcrumb, For, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: ReactNode;
  isCurrent?: boolean;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav() {
  const searchPath = usePathname();
  const pathSegments = searchPath?.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isCurrent = index === pathSegments.length - 1;
    return { label: decodeURIComponent(segment), href, isCurrent };
  });
  return (
    <Breadcrumb.Root size={"lg"}>
      <HStack>
        <For each={breadcrumbItems}>
          {(item, index) => (
            <NextLink key={index} href={item?.href} passHref>
              <Breadcrumb.List key={index}>
                <Breadcrumb.Item>
                  <Breadcrumb.Link>
                    {!item?.isCurrent && item?.label}
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                {item?.isCurrent && (
                  <Breadcrumb.Item>
                    <Breadcrumb.CurrentLink color={"blue.500"}>
                      {item.label}
                    </Breadcrumb.CurrentLink>
                  </Breadcrumb.Item>
                )}
                {!item?.isCurrent ? <Breadcrumb.Separator /> : null}
              </Breadcrumb.List>
            </NextLink>
          )}
        </For>
      </HStack>
    </Breadcrumb.Root>
  );
}
