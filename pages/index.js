import axios from 'axios';
import Head from 'next/head';
import config from '../config';

export default function HomePage({ article }) {
  if (!article) return <div>Home page content not found</div>;

  const { attributes } = article;

  return (
    <div className={`${attributes.containerStyles || 'container mx-auto px-4 py-8 max-w-3xl'}`}>
      <Head>
        <title>{attributes.MetTTitle}</title>
        <meta name="description" content={attributes.MetaDescription} />
        <link rel="canonical" href={`https://${attributes.CanonicalURL}`} />
        <script type="application/ld+json">{attributes.Schema}</script>
      </Head>

      <main>
        <header className={attributes.headerStyles || 'mb-8'}>
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{attributes.H1}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{attributes.Title}</h2>
        </header>

        <div className={attributes.bodyStyles || 'prose max-w-none'}>
          <p className={attributes.paragraphStyles || 'text-lg mb-4 text-gray-600'}>{attributes.Paragraph}</p>
          <div dangerouslySetInnerHTML={{ __html: attributes.Markdown }} />
        </div>
      </main>

      <footer className="mt-8 text-sm text-gray-500">
        <p>Last updated: {new Date(attributes.updatedAt).toLocaleDateString()}</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get(config.API_URL, {
      headers: {
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    });
    const allArticles = res.data.data;
    const article = allArticles.find(
      article => 
        article.attributes.Domain === config.HARDCODED_DOMAIN &&
        article.attributes.urlSlug === '/'
    );

    if (!article) {
      return { notFound: true };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}