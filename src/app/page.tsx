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
import { LineShadowText } from "@/components/LineShadowText"
import { Ripple } from "@/components/Ripple"
import { HeroShaderBackground } from "@/components/HeroShaderBackground"
import { AuroraText } from "@/components/AuroraText"

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
          overflowX: 'visible',
          paddingBottom: '250px',
          position: 'relative',
        }}
      >
        {<HeroShaderBackground />}

        <Column 
          //maxWidth="s" 
          horizontal="center" 
          align="center"
          style={{ position: 'relative', zIndex: 1 }}
        >
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
              
              <div style={{ position: "relative", width: 'min(440px, 80vw)', height: 'min(440px, 80vw)' }}>
  
                {/* Ripple sits outside figure so mask doesn't clip it */}
                <Ripple 
                mainCircleSize={10} 
                numCircles={6} 
                color="#5ba3c9" 
                mainCircleOpacity={1}
                
                />

                {/* Photo with mask */}
                <figure style={{ 
                  position: "relative",
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  margin: '0',
                  border: 'none',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 75%)',
                  maskImage: 'radial-gradient(circle at center, black 0%, transparent 75%)'
                }}>
                  <img 
                    src="/images/self_022.png"
                    height="100%"
                    style={{ objectFit: 'cover', display: 'block' }}
                  />
                </figure>
              </div>
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
                          onBackground="neutral-medium"
                          
                          style={{ 
                            fontFamily: '"Press Start 2P", cursive',
                            
                            fontSize: 'clamp(2.5rem, 4vw, 3rem)'
                          }}
                        > 
                        <a href={about.path} style={{ textDecoration: 'none', color: 'inherit' }} className="hoverLink">
                          <LineShadowText shadowColor="#5ba3c9" as="span">
                            {person.name}
                          </LineShadowText>
                        </a>
                  </Heading>
                  
                  <Text 
                    variant="display-default-m" 
                    className={styles.textAlign} 
                    //onBackground="neutral-weak"
                    style={{ 
                      fontFamily: '"Bitcount Single", sans-serif',
                      fontSize: 'clamp(1.7rem, 4vw, 2rem)',
                      //color: 'transparent',
                      //WebkitTextStroke: '0.5px #5ba3c9',
                    }}
                    
                  >
                    <AuroraText
                      colors={["#5ba3c9", "#67e8f9", "#7dd3fc", "#93c5fd"]}
                      speed={1}
                      style={{
                        fontFamily: '"Bitcount Single", sans-serif',
                        fontSize: 'clamp(1.7rem, 4vw, 2rem)',
                        WebkitTextStroke: '0.25px #000000'
                      }}
                    >
                    {home.headline}
                    </AuroraText>
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
                    onBackground="neutral-medium"
                    background ="brand-alpha-weak"
                    border="neutral-alpha-weak"
                    style={{height: '20px'}}
                    vertical="center"
                    textVariant="label-strong-xs"
                  >
                    Agent System
                  </Badge>
                  <Badge
                    onBackground="neutral-medium"
                    background ="brand-alpha-weak"
                    border="neutral-alpha-weak"
                    style={{height: '20px'}}
                    vertical="center"
                    textVariant="label-strong-xs"
                  >
                    XR
                  </Badge>
                  <Badge
                    onBackground="neutral-medium"
                    background ="brand-alpha-weak"
                    border="neutral-alpha-weak"
                    style={{ height: '20px' }}
                    vertical ="center"
                    textVariant="label-strong-xs"
                  >
                    Robotics
                  </Badge>
                  <Badge
                    onBackground="neutral-medium"
                    background ="brand-alpha-weak"
                    border="neutral-alpha-weak"
                    style={{height: '20px' }}
                    vertical ="center"
                    textVariant="label-strong-xs"
                  >
                    HCI
                  </Badge> 
                  <Badge
                    onBackground="neutral-medium"
                    background ="brand-alpha-weak"
                    border="neutral-alpha-weak"
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
          </Column>        
      </Column>
      
      
      <ScrollButton />

      <div id="selected-work" style={{ scrollMarginTop: '80px' }}>
        <RevealFx 
          delay={0.6} 
          translateY="16" 
          fillWidth 
          horizontal="center">
          <Heading 
            paddingTop="16"
            //variant="display-default-s" 
            //style={{ fontFamily: '"Bitcount Single", sans-serif',color: 'transparent', WebkitTextStroke: '0.7px #5ba3c9',}}
            
            onBackground="neutral-medium"
                          
            style={{ 
              fontFamily: '"Press Start 2P", cursive',           
              fontSize: 'clamp(1.5rem, 4vw,  2.5rem)',
            }}
          >
          <a href={work.path} style={{ textDecoration: 'none', color: 'inherit' }} className="hoverLink">
            <LineShadowText shadowColor="#5ba3c9" as="span">
              Selected Work
            </LineShadowText>
          </a>
          </Heading>
        </RevealFx>
      </div>



      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          keywords="2026 | Multi-Agent System | HCI | VR"
          title="XR-MultiAgent"
          //subtitle="The first system to explore collaborative agentic spatial intelligence in XR world"
          description="A real-time multi-agent system that translates natural language into spatially 
          coordinated XR scene creation and manipulation."
          images={["/images/projects/project-01/multiagentxr-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/multiagentxr-Demo-Video.mp4"
          projectUrl="/work/multi-agent-xr"
          codeUrl="https://github.com/RayChen666/Multi-Agent-XR"
        />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          keywords="2025 | Robotics | Swarm Drones | XR"
          title="Flying Together"
          //subtitle="Human Guided Immersive Shared Control for Aerial Robot Teams in Unknown Environments"
          description="Built a WebXR interface and WebSocket communication layer for multi-sensor drone 
          swarm control, published at IEEE ICRA 2026."
          images={["/images/projects/project-01/xrSwarmDroneControl-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/xrSwarmDroneControl-Demo-Video.mp4"
          projectUrl="/work/xr-swarm-drone-control"
          codeUrl="https://github.com/RayChen666/XR-Swarm-Drone-Control"
        />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          keywords="2025 | AR | Distributed System | Drone"
          title="AR-TelloSimulator"
          //subtitle="An Augmented Reality Drone Control Simulator"
          description= "A full-stack AR drone teleoperation system enabling real-time spatial control and low-latency streaming to a physical drone."
          images={["/images/projects/project-01/arTelloSimulator-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/arTelloSimulator-Demo-Video.mp4"
          projectUrl="/work/ar-tello-simulator"
          codeUrl="https://github.com/RayChen666/AR-Tello-Simulator"
        />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <FeaturedProject
          keywords="2024 | CV | Drone | Hand Geatures"
          title="HandGestureDJITello"
          // subtitle="Using Hand Gestures to Control Drone"
          description="A real-time computer vision pipeline enabling gesture-based control of a DJI Tello 
          drone using hand tracking with webcam."
          images={["/images/projects/project-01/handgestureTello-cover-image.jpg"]}
          videoUrl="/images/projects/project-01/handgestureTello-Demo-Video.mp4"
          projectUrl="/work/hand-gesture-dji-tello"
          codeUrl="https://github.com/RayChen666/HandGestureDJITello"
        />
      </RevealFx>

      



      {routes["/blog"] && (
        <Column 
          fillWidth 
          gap="24" 
          marginBottom="l" 
          paddingX="l" 
        >

          <Column fillWidth gap="32" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingTop="0" horizontal="center">
              <Heading 
                as="h2" variant="display-strong-xs" wrap="balance"
                 
                onBackground="neutral-medium"
                              
                style={{ 
                  fontFamily: '"Press Start 2P", cursive',           
                  fontSize: 'clamp(1.5rem, 4vw,  2.5rem)',
                  textAlign: 'center',
                }}
              >
              <a href="/blog" style={{ textDecoration: 'none', color: 'inherit' }} className="hoverLink">
              <LineShadowText shadowColor="#5ba3c9">
                Latest Posts
              </LineShadowText>
              </a>
              </Heading>
            </Row>

            <Column flex={1} >
            <Posts range={[1, 2]} columns="2"  gap="m" />
            </Column>
          </Column>

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
