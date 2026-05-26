'use client';

import {
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Row,
  Media,
  Card,
} from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

interface FeaturedProjectProps {
  title: string;
  subtitle?: string;
  description: string;
  keywords: string;
  images: string[];
  videoUrl?: string;
  youtubeUrl?: string; 
  projectUrl: string;
  codeUrl?: string;
  paperUrl?: string;
}

export function FeaturedProject({ 
  title, 
  subtitle,
  keywords,
  description, 
  images,
  videoUrl,
  projectUrl, 
  codeUrl,
  paperUrl, 
  youtubeUrl,
}: FeaturedProjectProps) {
  
  return (
    <Column fillWidth gap="m" paddingX="l">
      {/* Split Media Section */}
      <Row fillWidth gap="m" s={{ direction: "column" }}>
        {/* Left: Image Gallery */}
        <Column flex={1}>
          <Media
            aspectRatio="16 / 9"
            radius="l-4"
            alt={title}
            src={images[0]}
          />
        </Column>

        {/* Right: Video */}
        <Column flex={1}>
          {youtubeUrl ? (
            <iframe
              width="100%"
              style={{
                borderRadius: '20px',
                aspectRatio: '16/9',
                border: 'none',
              }}
              src={youtubeUrl}
              allowFullScreen
            />
          ) : (
            <video
              controls
              width="100%"
              style={{
                borderRadius: '20px',
                aspectRatio: '16/9',
                objectFit: 'cover',
              }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </Column>
      </Row>

      {/* Project Info (Same as normal project cards) */}
      <Flex
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
        s={{ direction: "column" }}
        >
        <Flex flex={7}>
          <Column gap="8">
            {keywords && (
              <Text variant="body-default-s" onBackground="neutral-weak" style={{ letterSpacing: '0.05em' }}>
                {keywords.split('|').map((k, i, arr) => (
                  <span key={i}>
                    {k.trim()}
                    {i < arr.length - 1 && <span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>}
                  </span>
                ))}
              </Text>
            )}
            
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            
            {subtitle && (
              <Text variant="body-strong-m" onBackground="neutral-weak">
                {subtitle}
              </Text>
            )}
            
          </Column>
        </Flex>
        


        <Column flex={7} gap="16">
          <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
            {description}
          </Text>

          <Flex gap="24" wrap>
            <SmartLink
              suffixIcon="arrowRight"
              style={{ margin: "0", width: "fit-content" }}
              href={projectUrl}
            >
              <Text variant="body-default-s">Detail description</Text>
            </SmartLink>
            {codeUrl && (
              <SmartLink
                suffixIcon="code"
                style={{ margin: "0", width: "fit-content" }}
                href={codeUrl}
              >
                <Text variant="body-default-s">Project code</Text>
              </SmartLink>
            )}
            {paperUrl && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={paperUrl}
              >
                <Text variant="body-default-s">Paper link</Text>
              </SmartLink>
            )}
          </Flex>
        </Column>
      </Flex>
    </Column>
  );
}