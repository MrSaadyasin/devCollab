import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import useConv from "../hooks/useConv";
export default function Home() {
  const axiosPrivate = useAxiosPrivate();
  const { setConvListState } = useConv();
  const {
    auth: { userData },
  } = useAuth();
  const [alldevPosts, setAllDevPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUserPosts = async () => {
      try {
        const res = await axiosPrivate.get("/api/dev-posts", {
          signal: controller.signal,
        });
        if (res.status === 200) {
          const posts = await res.data;
          isMounted && setAllDevPosts(posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserPosts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  // get user chat list
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // here we are only getting the user data which user have conservation
    const getConversationsList = async () => {
      try {
        const res = await axiosPrivate.get("/api/conversation", {
          signal: controller.signal,
        });
        if (res.status === 200) {
          const conv = await res.data;
          isMounted && setConvListState(conv);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversationsList();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full ">
      <div className="px-8">
        <CreatePost setCurrentPost={setCurrentPost} />
      </div>
      {/* posts timeline */}
      <div className=" mx-8 m-auto">
        {currentPost && (
          <div className="my-6 px-6">
            <PostCard
              postId={"new-post-need-slug"}
              userName={userData?.name}
              body={currentPost}
              userImg={userData?.avatarUrl}
              time={new Date()}
            />
          </div>
        )}
        {alldevPosts &&
          alldevPosts.map((post) => {
            const {
              _id,
              body,
              createdAt,
              likeUsers,
              devId: { avatarUrl, name },
            } = post;
            return (
              <div key={_id} className="my-6 px-6">
                <PostCard
                  postId={_id}
                  userName={name}
                  body={body}
                  userImg={avatarUrl}
                  time={createdAt}
                  likeUsers={likeUsers}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
