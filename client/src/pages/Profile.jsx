import React from "react";
import useAuth from "../hooks/useAuth";
import { avatars } from "../data/Avatars";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PostCard from "../components/PostCard";
import { defaultDevImg } from "../data/defaultData";
import AddBio from "../components/AddBio";
export default function Profile() {
  const {
    auth: { userData },
  } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [devPosts, setDevPosts] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUserPosts = async () => {
      try {
        const res = await axiosPrivate.get("/api/dev-posts/current-user", {
          signal: controller.signal,
        });
        if (res.status === 200) {
          const posts = await res.data;
          isMounted && setDevPosts(posts);
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
  return (
    <div className="w-full">
      {/* cover */}
      <div className="h-100 py-4 content-baseline items-start  bg-slate-800 px-8 flex gap-5 cover-bg">
        <div className="w-40">
          <img
            src={userData.avatarUrl ? userData.avatarUrl : defaultDevImg}
            alt="user"
            className="w-40  rounded-full"
          />
        </div>
        <div className="mt-6 ">
          <p className=" text-xl font-medium tracking-widest">
            {userData?.name}
          </p>
          {userData.bio? <p className="text-sm text-gray-50 tracking-widest">
            {userData.bio}
          </p>:
          <AddBio/>}
          
        </div>
      </div>
      {/* dev posts wall */}
      <div className="my-10">
        {devPosts &&
          devPosts.map((post) => {
            const { _id, body, createdAt } = post;
            return (
              <div key={_id} className="my-6 px-6">
                <PostCard
                  time={createdAt}
                  userName={userData?.name}
                  body={body}
                  userImg={userData.avatarUrl}
                />
              </div>
            );
          })}
      </div>
      
    </div>
  );
}
