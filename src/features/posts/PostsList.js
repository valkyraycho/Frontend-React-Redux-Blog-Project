import React from "react";
import { useGetPostsQuery } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery("getPosts");

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = posts.ids.map((postId) => (
            <PostsExcerpt key={postId} postId={postId} />
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return <section>{content}</section>;
};

export default PostsList;
