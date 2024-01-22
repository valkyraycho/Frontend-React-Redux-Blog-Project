import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersSlice";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

const UserPage = () => {
    const { userId } = useParams();
    const {
        user,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        isError: isErrorUser,
        error: errorUser,
    } = useGetUsersQuery("getUsers", {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            user: data?.entities[userId],
            isLoading,
            isSuccess,
            isError,
            error,
        }),
    });

    const {
        data: userPosts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsByUserIdQuery(userId);

    let content;
    if (isLoading || isLoadingUser) content = <p>Loading...</p>;
    else if (isSuccess & isSuccessUser) {
        const { ids, entities } = userPosts;
        content = (
            <section>
                <h2>{user?.name}</h2>
                <ol>
                    {ids.map((id) => (
                        <li key={id}>
                            <Link to={`/post/${id}`}>{entities[id].title}</Link>
                        </li>
                    ))}
                </ol>
            </section>
        );
    } else if (isError || isErrorUser) content = <p>{error || errorUser}</p>;

    return content;
};

export default UserPage;
