import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { learning, person, baseURL } from "@/resources";
import VoronoiMetaballShader from "@/components/VoronoiMetaballShader";
import styles from "@/components/about/about.module.scss";
import { PaperList } from "@/components/learning/PaperList";
 
export async function generateMetadata() {
  return Meta.generate({
    title: learning.title,
    description: learning.description,
    baseURL: baseURL,
    path: learning.path,
  });
}
 
export default function Learning() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <VoronoiMetaballShader opacity={0.25} />
      </div>
 
      <Column
        maxWidth="m"
        horizontal="center"
        gap="24"
        paddingY="24"
        paddingX="l"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={learning.path}
          title={learning.title}
          description={learning.description}
          author={{
            name: person.name,
            url: `${baseURL}/about`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
 
        {/* Header */}
        <Column horizontal="center" align="center" gap="0">
          <Heading
            variant="display-default-l"
            //onBackground="neutral-medium"
            style={{
              //fontFamily: '"Cinzel Decorative", serif',
              fontFamily: '"Zeyada", cursive',
              textAlign: "center",
            }}
          >
            LEARNING
          </Heading>
          <Text
            variant="display-default-m"
            onBackground="neutral-medium"
            className={styles.textAlign}
            style={{
              fontFamily: '"Zeyada", cursive',
              fontSize: "clamp(1.7rem, 4vw, 2rem)",
            }}
          >
            A curated collection of readings, references, and insights from my research journey.
          </Text>
        </Column>
 
        {/* Paper list */}
        <PaperList />
      </Column>
    </>
  );
}
 