'use client';

import {
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Row,
  Media,
} from "@once-ui-system/core";

interface FeaturedProjectProps {
  title: string;
  description: string;
  images: string[];
  videoUrl: string;
  projectUrl: string;
  codeUrl?: string;
}

export function FeaturedProject({ 
  title, 
  description, 
  images,
  videoUrl,
  projectUrl, 
  codeUrl 
}: FeaturedProjectProps) {
  return (
    <Column fillWidth gap="m" paddingX="l">
      {/* Split Media Section */}
      <Row fillWidth gap="m" s={{ direction: "column" }}>
        {/* Left: Image Gallery */}
        <Column flex={1}>
          <Media
            aspectRatio="16 / 9"
            radius="m"
            alt={title}
            src={images[0]}
          />
        </Column>

        {/* Right: Video */}
        <Column flex={1}>
          <video 
            controls 
            width="100%" 
            style={{ 
              borderRadius: '8px',
              aspectRatio: '16/9',
              objectFit: 'cover'
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
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
        <Flex flex={7}>  {/* Title - keep as is */}
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
            {title}
            </Heading>
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
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={codeUrl}
              >
                <Text variant="body-default-s">Project code</Text>
              </SmartLink>
            )}
          </Flex>
        </Column>
      </Flex>
    </Column>
  );
}