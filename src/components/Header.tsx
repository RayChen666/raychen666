"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShineBorder } from "@/components/ShineBorder";
import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery, playground } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" 
          //fillWidth 
          vertical="center" 
          textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            //background="page"
            //background="neutral-weak"  
            //border="neutral-alpha-weak"
            s={{ hide: false }}
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
            border="neutral-alpha-weak"
          >
            {/*<ShineBorder
              //shineColor={["#5ba3c9", "#ffffff", "#5ba3c9"]}
              shineColor={["#5ba3c9", "#ffffff", "#5ba3c9"]}
              duration={6}
              borderWidth={0.6}
            />*/}
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <>
                <Row s={{ hide: true }}>
                  <ToggleButton 
                    prefixIcon="home2" 
                    href="/" 
                    selected={pathname === "/"} 
                  />
                </Row>
                <Row s={{ hide: false}}>
                <ToggleButton 
                  prefixIcon="home" 
                  href="/" 
                  selected={pathname === "/"} 
                />
                </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="face2"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="face"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid2"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book2"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                </>
              )}
              {routes["/playground"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="playground2"
                      href="/playground"
                      label={playground.label}
                      selected={pathname.startsWith("/playground")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="playground"
                      href="/playground"
                      selected={pathname.startsWith("/playground")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                    <Row s={{ hide: true }}>
                      <ThemeToggle variant="filled" />   {/* desktop: dark2/light2 */}
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ThemeToggle />                    {/* mobile: dark/light */}
                    </Row>
                </>
              )}
            </Row>
          </Row>
          <Row
            s={{ hide: true }}
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
            border="neutral-alpha-weak"
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <>
                <Row s={{ hide: true }}>
                  <ToggleButton 
                    prefixIcon="home2" 
                    href="/" 
                    selected={pathname === "/"} 
                  />
                </Row>
                <Row s={{ hide: false}}>
                <ToggleButton 
                  prefixIcon="home" 
                  href="/" 
                  selected={pathname === "/"} 
                />
                </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="face2"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="face"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid2"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book2"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                </>
              )}
              {routes["/playground"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="playground2"
                      href="/playground"
                      label={playground.label}
                      selected={pathname.startsWith("/playground")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="playground"
                      href="/playground"
                      selected={pathname.startsWith("/playground")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                    <Row s={{ hide: true }}>
                      <ThemeToggle variant="filled" />   {/* desktop: dark2/light2 */}
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ThemeToggle />                    {/* mobile: dark/light */}
                    </Row>
                </>
              )}
            </Row>
          </Row>

        </Row>
        <Flex 
          //fillWidth 
          horizontal="end" 
          vertical="center"
        >
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
