import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import { FiEye, FiStar } from "react-icons/fi";
import { FaHandsClapping } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import coverImg from "../../assets/article-cover.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ArticleDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [commentText, setCommentText] = useState("");

    const { data: article = {}, isLoading } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/articles/${id}`);
            return data;
        },
    });

    useEffect(() => {
        const updateViewCount = async () => {
            try {
                await axios.patch(`${import.meta.env.VITE_API_URL}/articles/${id}/view`);
                queryClient.invalidateQueries(["article", id]);
            } catch (err) { console.log("Failed to update view count", err); }
        };
        if (id) updateViewCount();
    }, [id, queryClient]);

    const likeMutation = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("Please login to like this article.");
            const { data } = await axiosSecure.patch(`/articles/${id}/like`, { 
                email: user.email 
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["article", id]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to like article");
        }
    });

    const commentMutation = useMutation({
        mutationFn: async (commentData) => {
            if (!user) throw new Error("Please login to comment.");
            const { data } = await axiosSecure.post(`/articles/${id}/comment`, commentData);
            return data;
        },
        onSuccess: () => {
            setCommentText("");
            toast.success("Comment added!");
            queryClient.invalidateQueries(["article", id]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to add comment");
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const { title, image, publisher, tags, description, viewCount, isPremium, author, likes = [], comments = [] } = article || {};
    
    const hasLiked = user ? likes.includes(user.email) : false;

    const handleLike = () => {
        if (!user) return toast.error("Please login to like articles");
        likeMutation.mutate();
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to comment");
        if (!commentText.trim()) return toast.error("Comment cannot be empty");
        
        commentMutation.mutate({
            text: commentText,
            authorName: user.displayName,
            authorEmail: user.email,
            authorImage: user.photoURL
        });
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen pb-12">
            <Helmet><title>{title || "Article"} | OpenPage</title></Helmet>

            <div className="w-full h-56 sm:h-80 lg:h-96 overflow-hidden relative bg-gray-100 dark:bg-zinc-900">
                <img 
                    className="w-full h-full object-cover" 
                    src={image || coverImg} 
                    alt={title || "Article cover"} 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = coverImg;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-white/20 dark:via-zinc-950/40 to-transparent" />
            </div>

            <Container>
                <div className="max-w-3xl mx-auto py-8 sm:py-12">
                    {isPremium && (
                        <div className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl w-fit">
                            <FiStar size={14} className="text-amber-500 dark:text-amber-400" />
                            <p className="text-amber-700 dark:text-amber-300 text-sm font-medium">Premium Article</p>
                        </div>
                    )}

                    {publisher?.publisherName && (
                        <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">
                            {publisher.publisherName}
                        </p>
                    )}

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">{title}</h1>

                    <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-white/[0.08]">
                        {author && (
                            <div className="flex items-center gap-2.5">
                                <img className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-white/10"
                                    referrerPolicy="no-referrer" src={author.image} alt={author.name} />
                                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{author.name}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-5 text-gray-500 dark:text-gray-400 text-sm">
                            <div className="flex items-center gap-1.5">
                                <FiEye size={16} /><span>{viewCount || 0}</span>
                            </div>
                            <button 
                                onClick={handleLike} 
                                disabled={likeMutation.isPending}
                                className={`flex items-center gap-1.5 transition-colors ${hasLiked ? 'text-blue-500 dark:text-blue-400' : 'hover:text-gray-700 dark:hover:text-gray-300'}`}
                            >
                                <FaHandsClapping size={16} /><span>{likes?.length || 0}</span>
                            </button>
                            <div className="flex items-center gap-1.5">
                                <FaRegComment size={16} /><span>{comments?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed custom-first-letter">{description}</p>

                    {tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-white/[0.08]">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/[0.08]">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments?.length || 0})</h2>
                        
                        {/* Comments List */}
                        <div className="space-y-6 mb-8">
                            {comments?.length > 0 ? (
                                comments.map((comment, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <img src={comment.authorImage || coverImg} alt={comment.authorName} className="w-10 h-10 rounded-full object-cover bg-gray-100" referrerPolicy="no-referrer" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-900 dark:text-white text-sm">{comment.authorName}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-800">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet. Be the first to share your thoughts!</p>
                            )}
                        </div>

                        {/* Add Comment Form */}
                        {user ? (
                            <form onSubmit={handleCommentSubmit} className="flex gap-4">
                                <img src={user?.photoURL || coverImg} alt={user?.displayName} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-800" referrerPolicy="no-referrer" />
                                <div className="flex-1 flex flex-col gap-3">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full bg-transparent border border-gray-200 dark:border-zinc-800 rounded-lg p-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none h-24"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={commentMutation.isPending || !commentText.trim()}
                                        className="self-end px-5 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {commentMutation.isPending ? "Posting..." : "Post Comment"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-gray-100 dark:border-zinc-800 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Please <span className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline">log in</span> to join the discussion.</p>
                            </div>
                        )}
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default ArticleDetails;
