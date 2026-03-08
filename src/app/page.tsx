import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Icon,
  IconButton,
} from "@once-ui-system/core";
import { home, about, work, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { FeaturedProject } from "@/components/FeaturedProject";
import styles from "@/components/about/about.module.scss";
import { ScrollButton } from '@/components/ScrollButton';

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}


export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column 
        fillWidth 
        horizontal="center" 
        
        gap="m"
        style={{ 
          minHeight: '100vh', 
          justifyContent: 'center',
          overflowX: 'hidden',
          paddingBottom: '250px'  
        }}
      >
        <Column 
        //maxWidth="s" 
        horizontal="center" 
        align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          {/* Define headline and subline */}
          {/*}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading 
              wrap="balance" 
              variant="display-default-m"
              style={{ 
                fontFamily: '"Bitcount Single Ink", sans-serif',
                fontSize: '2.5rem',
              }}
            > 
              
              
              {home.headline}
              
            </Heading>

          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          */}


          {/* Add personal photo, name, tags, keywords and slight self-intro */ }
          <RevealFx 
            translateY="8" 
            delay={0.3} 
            fillWidth horizontal="center"
          >
            <Row 
              gap="24" 
              vertical="center"
              horizontal="center"
              s={{ direction: "column", align: "center" }}
              //paddingX = '64'
              paddingBottom="24"
            >
              {/* Photo */}
              <figure style={{ 
                          width: 'min(440px, 80vw)',   // ← shrinks on mobile
                          height: 'min(440px, 80vw)',
                          margin: '0',
                          borderRadius: '0%',
                          //overflow: 'hidden',
                          border: 'none',
                          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 75%)',
                          maskImage: 'radial-gradient(circle at center, black 0%, transparent 75%)'
                        }}>
                          <img 
                            src="/images/self_022.png"
                            //width="100%"
                            height="100%"
                            style={{ 
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
              </figure>

              {/* Text content */}
              <Column 
                gap="16" 
                align="start" 
                horizontal ="start"
                className={styles.heroTextColumn}
                 
                
                
              >
                <Heading 
                          className={styles.textAlign} 
                          variant="display-default-l"
                          onBackground="neutral-weak"
                          
                          style={{ 
                            fontFamily: '"Press Start 2P", cursive',
                            
                            fontSize: '3rem',
                          }}
                        >
                          {person.name}
                        </Heading>
                  <Text 
                    variant="display-default-m" 
                    className={styles.textAlign} 
                    //onBackground="neutral-weak"
                    style={{ 
                      fontFamily: '"Bitcount Single", sans-serif',
                      fontSize: '2rem',
                      color: 'transparent',
                      WebkitTextStroke: '0.5px #5ba3c9',
                    }}
                    
                  >
                    {home.headline}
                  </Text>
      
                <Row 
                  gap="8" 
                  paddingX = "0"
                  vertical = "center"
                  horizontal="center" 
                  wrap
                  className={styles.heroTextColumn}
                > 
                   <Badge 
                    onBackground="neutral-weak"
                    background ="brand-alpha-weak"
                    style={{height: '20px'}}
                    vertical="center"
                    textVariant="label-strong-xs"
                  >
                    Agent System
                  </Badge>

                  <Badge
                    onBackground="neutral-weak"
                    background ="brand-alpha-weak"
                    style={{height: '20px'}}
                    vertical="center"
                    textVariant="label-strong-xs"
                    
                  >
                    XR
                  </Badge>
                  <Badge
                    onBackground="neutral-weak"
                    background ="brand-alpha-weak"
                    style={{ height: '20px' }}
                    vertical ="center"
                    textVariant="label-strong-xs"
                  >
                    Robotics
                  </Badge>
                  <Badge
                    onBackground="neutral-weak"
                    background ="brand-alpha-weak"
                    style={{height: '20px' }}
                    vertical ="center"
                    textVariant="label-strong-xs"
                  >
                    HCI
                  </Badge>
                  
                  {/*<div style={{ flexBasis: '100%', height: 0 }}></div>*/}
                  
                  <Badge
                    onBackground="neutral-weak"
                    background ="brand-alpha-weak"
                    style={{ height: '20px' }}
                    vertical ="center"
                    textVariant="label-strong-xs"
                  >
                    Spatial Intelligence
                  </Badge>
                 
                </Row>
              </Column>
              
            </Row>
            
          </RevealFx>

          {/* Define buttones "about me", "selected work" */}
        {/*
          <RevealFx paddingTop="12" delay={0.4} horizontal="center">
            
            <Row gap="12">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      //src={person.avatar}
                      src= "/images/og/IMG_01.jpg"
                      size="m"
                    />
                  )}
                  About Me
                </Row>
              </Button>

              <Button
                id="work"
                data-border="rounded"
                href="/#selected-work"
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                Selected Work
              </Button>
            </Row>
            
            
              
            
          </RevealFx>
          */}
          
          </Column>
          
      </Column>
      
      
      <ScrollButton />

      {/*
      <div id="selected-work">
        <RevealFx 
        delay={0.6} 
        translateY="16" 
        fillWidth 
        horizontal="center">
          <Heading 
          
          paddingTop="128"
          variant="display-default-l" 
          //style={{ fontFamily: "'Zeyada', cursive" }}
          style={{ 
            fontFamily: '"Bitcount Single", sans-serif',
            //fontSize: '2rem',
            color: 'transparent',
            WebkitTextStroke: '0.7px #5ba3c9',
          }}
          
          >
            Selected Work
          </Heading>
        </RevealFx>
    </div>
      */}
      <div id="selected-work" style={{ scrollMarginTop: '80px' }}>
        <RevealFx 
          delay={0.6} 
          translateY="16" 
          fillWidth 
          horizontal="center">
          <Heading 
            paddingTop="24"
            variant="display-default-l" 
            style={{ 
              fontFamily: '"Bitcount Single", sans-serif',
              color: 'transparent',
              WebkitTextStroke: '0.7px #5ba3c9',
            }}
          >
            Selected Work
          </Heading>
        </RevealFx>
      </div>



      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          title="XR-MultiAgent - The first system to explore collaborative agentic spatial intelligence in XR world"
          description="Architected a real-time XR spatial intelligence system that integrates natural language command 
          input with a multi-agent backend for collaborative spatial reasoning, enabling dynamic, spatially coordinated 
          XR interactions with scene objects and immersive world creation."
          images={["/images/projects/project-01/multiagentxr-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/multiagentxr-Demo-Video.mp4"
          projectUrl="/work/multi-agent-xr"
          codeUrl="https://github.com/RayChen666/Multi-Agent-XR"
        />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          title="Flying Together - Human Guided Immersive Shared Control for Aerial Robot Teams in Unknown Environments"
          description="Developed a web-based XR user interface and a 6-channel WebSocket communication layer connecting 
          to the ROS2 backend for multi-sensor control and navigation planning of a drone swarm (3-5), in collaboration 
          with the Agile Robotics and Perception Lab (work accepted for publication at IEEE ICRA 2026)."
          images={["/images/projects/project-01/xrSwarmDroneControl-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/xrSwarmDroneControl-Demo-Video.mp4"
          projectUrl="/work/xr-swarm-drone-control"
          codeUrl="https://github.com/RayChen666/XR-Swarm-Drone-Control"
        />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          title="AR-TelloSimulator - An Augmented Reality Drone Control Simulator"
          description="Designed a full-stack AR drone teleoperation system, combining spatial user interfaces and live hardware control, 
          enabling real-time synchronization from local server to headset, multi-client state sharing, and low-latency command streaming 
          to the physical drone."
          images={["/images/projects/project-01/arTelloSimulator-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/arTelloSimulator-Demo-Video.mp4"
          projectUrl="/work/ar-tello-simulator"
          codeUrl="https://github.com/RayChen666/AR-Tello-Simulator"
        />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          title="HandGestureDJITello - Using Hand Gestures to Control Drone "
          description="Designed a real-time computer vision pipeline integrating hand landmark extraction (MediaPipe, OpenCV) with TensorFlow 
          Lite classification (KeyPoint + LSTM-based Point History models) to enable gesture-driven navigation of a DJI Tello drone."
          images={["/images/projects/project-01/handgestureTello-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/handgestureTello-Demo-Video.mp4"
          projectUrl="/work/hand-gesture-dji-tello"
          codeUrl="https://github.com/RayChen666/HandGestureDJITello"
        />
      </RevealFx>

      



      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Projects range={[5]} />
      <Mailchimp /> 
    </Column>
  );
}

/*
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/about');
  }, [router]);

  return null;
}
*/
