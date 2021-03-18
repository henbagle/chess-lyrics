import Container from "../../components/container";
import Date from "../../components/date";
import DefaultLink from "../../components/link";
import {getAllPostIds, getPostData, BlogPost} from "../../lib/blogpost";
import Link from "next/link"
import Head from "next/head";

export const getStaticPaths = async () => {
    const paths = getAllPostIds();
    return {paths, fallback: false};
}

interface Props {
    postData : BlogPost
}

export default function Post({postData} : Props) {
    return(
    <Container>
        <Head>
            <title>{postData.title} - ChessLyrics Blog</title>
        </Head>
        <article>
            {/* Title/Date */}
            <h1 className="text-4xl font-bold">{postData.title}</h1>
            <div className="text-base text-gray-500 mt-2">
                <Date dateString={postData.date}></Date>
            </div>

            {/* Article */}
            <div className="my-5"dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>

        </article>
        <div className="mt-6 underline text-blue-700 hover:text-indigo-700">
          <DefaultLink href="/">
              ← Back to home
          </DefaultLink>
        </div>
    </Container>
    )
}

export const getStaticProps = async ({params}) => {
    const postData = await getPostData(params.id);
    return {
        props: {postData}
    }
}