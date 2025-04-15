import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import Head from 'next/head';

import {
  About,
  Background,
  Contact,
  Footer,
  Header,
  Hero,
  Experience,
  Projects,
  RooStoreProvider,
} from '@/components';

type HomeProps = {
  repositories: Repository[];
};

const Homepage = ({ repositories }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('dark');
  }, []);

  return (
    <RooStoreProvider>
      <Head>
        <title>Mauricio Boaventura</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content='Mauricio Boaventura' key='title' />
      </Head>
      <Header />
      <main>
        <Background />
        <Hero />
        <About />
        <Experience />
        {!!repositories.length && <Projects projects={repositories} />}
        <Contact />
      </main>
      <Footer />
    </RooStoreProvider>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ locale }) => {
  const localeData = await serverSideTranslations(locale ?? 'en', [
    'common',
    'header',
    'hero',
    'about',
    'experience',
    'projects',
    'contact',
    'footer',
  ]);

  try {
    const { status, data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/repositories`,
    );

    if (status !== 200 || !data) {
      return {
        props: {
          ...localeData,
          repositories: [],
        },
      };
    }

    return {
      props: {
        ...localeData,
        repositories: data,
      },
    };
  } catch (error) {
    return {
      props: {
        ...localeData,
        repositories: [],
      },
    };
  }
};

export default Homepage;
