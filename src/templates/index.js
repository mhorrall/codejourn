import React from "react";
import Helmet from "react-helmet";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import PaginateLink from "../components/PaginateLink";
import Footer from "../components/Footer";
import Layout from "../components/layout";
import { graphql } from "gatsby";
// import { checkPropTypes } from "prop-types";

const IndexPage = ({ data, pageContext }) => {
  const { group, index, first, last } = pageContext;
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
  const nextUrl = (index + 1).toString();
  const total = data.allMarkdownRemark.edges.filter(
    post => post.node.frontmatter.templateKey === "blog-post"
  ).length;

  return (
    <Layout>
      <div className="home-template">
        <Helmet>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        </Helmet>

        <Header
          title="CodeJourn"
          tagline="Code Journal Blog"
        />

        <main id="site-main" className="site-main outer" role="main">
          <div className="inner">
            <div className="post-feed">
              {group.map(({ node }) => (
                <BlogCard
                  key={node.id}
                  path={node.frontmatter.path}
                  image={node.frontmatter.image.childImageSharp.fluid}
                  tag={node.frontmatter.tags[0]}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  description={node.frontmatter.description}
                  authorImage={node.frontmatter.authorImage}
                  authorName={node.frontmatter.author}
                />
              ))}
            </div>
            <div className="paginatation">
              <div className="previousLink">
                <PaginateLink tag={first} url={previousUrl} text="Prev" />
              </div>
              <p>
                {index}
                of {Math.ceil(total / 12)}
              </p>
              <div className="nextLink">
                <PaginateLink tag={last} url={nextUrl} text="Next" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 40)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
