import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { BlogPost, getSortedPostsData } from "../lib/blogpost";
import {GetStaticProps} from 'next';
import Date from "../components/date";
import prisma from "../db/prisma";
import { shows } from '.prisma/client';

interface Props
{
    allPostsData : BlogPost[]
    shows: shows[]
}

export default function Home({allPostsData, shows} : Props) {
    return (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <section className="my-5">
            <h2 className="text-4xl mb-3">
                Shows
            </h2>
            <ul>
                {shows.map(({shortName, id, key}) => (
                    <li key={id} className="text-xl mb-3">
                        <Link href={`/shows/${key}`}>
                            <a className="hover:text-gray-600">{shortName}</a> 
                        </Link>
                    </li>
                ))}
            </ul>
            </section>

            <section className="my-5">
            <h2 className="text-4xl mb-3">
                Blog
            </h2>
            <ul>
                {allPostsData.map(({id, date, title}) => (
                    <li key={id} className="text-xl mb-3">
                        <Link href={`/blog/${id}`}>
                            <a className="hover:text-gray-600">{title}</a> 
                        </Link>
                        <p className="text-sm text-gray-500"><Date dateString={date} /></p>
                    </li>
                ))}
            </ul>
            </section>
        </main>

        <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{" "}
                <img
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className={styles.logo}
                />
            </a>
        </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    const shows = await prisma.shows.findMany();
    return {
        props: {allPostsData, shows},
    };
}