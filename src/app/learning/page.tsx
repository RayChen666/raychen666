import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { learning, person, baseURL } from "@/resources";
//import { HeroShaderBackground } from "@/components/HeroShaderBackground";
import VoronoiMetaballShader from "@/components/VoronoiMetaballShader"
import { LineShadowText } from "@/components/LineShadowText";
import styles from "@/components/about/about.module.scss";
import { AuroraText } from "@/components/AuroraText";

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
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <VoronoiMetaballShader opacity={0.25} />
      </div>
    <Column
      //maxWidth="m"
      horizontal="center"
      style={{
        minHeight: "0vh",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
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

      {/*<HeroShaderBackground />*/}
      

      <Column
        horizontal="center"
        align="center"
        gap="24"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Heading
          variant="display-default-l"
          onBackground="neutral-medium"
          style={{
            //fontFamily: '"Zeyada", cursive',
            fontFamily: '"Cinzel Decorative", serif',
            //fontFamily: '"Bitcount Single", sans-serif',
            //fontSize: "clamp(2rem, 4vw, 3rem)",
            textAlign: "center",
          }}
        >
          {/*<LineShadowText shadowColor="#5ba3c9" as="span">
            Learning
          </LineShadowText>*/}
          Learning
        </Heading>

        {/*<Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{
            fontFamily: '"Bitcount Single", sans-serif',
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            textAlign: "center",
            opacity: 0.75,
          }}
        >
          Something's brewing here. Stay tuned!
        </Text>*/}
        <Text 
                    variant="display-default-m" 
                    className={styles.textAlign} 
                    //onBackground="neutral-weak"
                    style={{ 
                      //fontFamily: '"Bitcount Single", sans-serif',
                      fontFamily: '"Zeyada", cursive',
                      fontSize: 'clamp(1.7rem, 4vw, 2rem)',
                      //color: 'transparent',
                      //WebkitTextStroke: '0.5px #5ba3c9',
                    }}
                    
                  >
                    {/*<AuroraText
                      colors={["#5ba3c9", "#67e8f9", "#7dd3fc", "#93c5fd"]}
                      speed={1}
                      style={{
                        fontFamily: '"Bitcount Single", sans-serif',
                        fontSize: 'clamp(1.7rem, 4vw, 2rem)',
                        WebkitTextStroke: '0.25px #000000'
                      }}
                    >
                    Something's brewing here. Stay tuned!
                    </AuroraText>*/}
                    A curated collection of readings, references, and insights from my research journey. Stay tuned!
                  </Text>
      </Column>
    </Column>
  </>
  );
}