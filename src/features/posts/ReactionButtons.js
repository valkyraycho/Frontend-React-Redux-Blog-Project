import React from "react";
import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

const ReactionButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([reaction, emoji]) => {
            return (
                <button
                    key={reaction}
                    type="button"
                    className="reactionButton"
                    onClick={() => {
                        const newValue = post.reactions[reaction] + 1;
                        addReaction({
                            postId: post.id,
                            reactions: {
                                ...post.reactions,
                                [reaction]: newValue,
                            },
                        });
                    }}>
                    {emoji} {post.reactions[reaction]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
