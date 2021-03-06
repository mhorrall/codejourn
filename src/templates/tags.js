import React from "react"
import Header from '../components/Header'
import HomeNav from '../components/HomeNav'
import BlogCard from '../components/BlogCard'
import Footer from '../components/Footer'
import TagList from '../components/TagList'
import Layout from '../components/layout'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'

function Tags({pageContext, data}) {

    const {posts, post, tag} = pageContext
    const sortedTags = Object
        .keys(posts)
        .sort();

    if (tag) {
        return (
            <Layout>
                <div className="home-template">
                    <header className="site-header outer">
                        <Img
                            fluid={data.header.childImageSharp.fluid}
                            css={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                            style={{
                            position: `absolute`,
                            zIndex: 0
                        }}/> 
                        <div className="inner">
                            <div className="site-header-content">
                                <h1 className="site-title">
                                    {post.length}
                                    <span> </span>
                                     post{post.length === 1
                                        ? ""
                                        : "s"}
                                    <span> </span>
                                    tagged with<span> </span>
                                    <span
                                        style={{
                                        fontStyle: 'italic'
                                    }}>{tag}</span>
                                </h1>
                            </div>
                            <HomeNav/>
                        </div>
                    </header>

                    <main id="site-main" className="site-main outer" role="main">
                        <div className="inner">
                            <div className="post-feed">
                                {post.map(post => (<BlogCard
                                    key={post.id}
                                    path={post.frontmatter.path}
                                    image={post.frontmatter.image.childImageSharp.fluid}
                                    tag={post.frontmatter.tags[0]}
                                    title={post.frontmatter.title}
                                    date
                                    ={post.frontmatter.date}
                                    description={post.frontmatter.description}
                                    authorImage={post.frontmatter.authorImage}
                                    authorName={post.frontmatter.author}/>))}
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </Layout>
        )
    }
    return (
        <Layout>
            <div>
                <div className="home-template">
                    <Header
                        title="Tags"/>
                    <main id="site-main" className="site-main outer" role="main">
                        <div className="inner">
                            <div className="post-feed">
                                <div className="tag-container">
                                    {sortedTags.map((n, i) => (<TagList tag={n} key={i}/>))}
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        </Layout>
    );
}

export const pageQuery = graphql `
query {
    header: file(relativePath: { eq: "blogheader1.png" }) {
        childImageSharp {
            fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
            }
        }
    }
  }
`;

export default Tags;