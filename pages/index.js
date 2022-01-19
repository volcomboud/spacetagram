import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NasaFetcher from "../components/NasaFetcher";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spacetagram</title>
        <strong>ICI</strong>
        <meta name="Shopify Chanllenge 2022" content="NASA api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NasaFetcher/>
      </main>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
