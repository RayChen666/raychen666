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
} from "@once-ui-system/core";
import { home, about, work, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { FeaturedProject } from "@/components/FeaturedProject";

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
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
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
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" 
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
                href="/work"
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                Selected Work
              </Button>
            </Row>
          </RevealFx>
          </Column>
      </Column>
      
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
