import React from "react";
import { Link, useLocation } from "react-router-dom";
import { graylight, hoverTextOrange } from "../data/StyleGuide";
import { defaultDevImg } from "../data/defaultData";
import useAuth from "../hooks/useAuth";
import Comments from "../components/Comments";
import WriteComment from "../components/WriteComment";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useState, useEffect } from "react";
import { useEffect, useState } from "react";
import getTimeAgoString from "../utls/calculateTIme";

export default function PostDetail() {
  const axiosPrivate = useAxiosPrivate();
  const [commentState, setCommentState] = useState(null);
  const [currentComment, setCurrentComment ] = useState(null)
  const {
    auth: { userData },
  } = useAuth();
  const {
    state: { body, postId, time, userName, userImg },
  } = useLocation();
  // updating comments state on new comment
  const updateComments = (newComment) => {
    setCommentState([...commentState, newComment]);
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axiosPrivate.get(`/api/post-comment/${[postId]}`);
        if (res.status === 200) {
          setCommentState(res.data);
        }
      } catch (error) {}
    };
    getComments();
  }, []);
  return (
    <div className="w-full mx-8">
      <div className={` h-fit bg${graylight}  px-4 py-5 my-5 rounded-lg  `}>
        <Link to={"/profile"} className="flex gap-2 mb-2">
          <img
            className="rounded-full w-14 "
            src={userImg ? userImg : defaultDevImg}
            alt="user"
          />
          <div className=" flex text-xl gap-2 items-center">
            <p>{userName}</p>
            <small className="text-xs text-gray-300">{time}</small>
          </div>
        </Link>
        <div>
          <p className="text-xl">{body}</p>
        </div>
        <div className="mt-4 ">
          <div className="flex gap-4">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 cursor-pointer  ${hoverTextOrange} `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <sup className="text-xs" style={{ fontSize: "10px" }}>
                12k
              </sup>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 cursor-pointer   ${hoverTextOrange}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                />
              </svg>
              <sup className="text-xs" style={{ fontSize: "10px" }}>
                6K
              </sup>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 cursor-pointer   ${hoverTextOrange}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <sup className="text-xs" style={{ fontSize: "10px" }}>
                20
              </sup>
            </div>
          </div>
        </div>
      </div>
      {/* write comment */}
      <WriteComment postId={postId} setCurrentComment={setCurrentComment} />
      {/* Post comments  */}
      <div>
      {currentComment &&<Comments
                  comment={currentComment}
                  userName={userData?.name}
                  userImg={userData?.avatarUrl}
                  time={getTimeAgoString(new Date())}
        />}
        {commentState &&
          commentState.map((singleComment) => {
            const {
              _id,
              comment,
              createdAt,
              devId: { avatarUrl, name },
            } = singleComment;
            return (
              <div key={_id}>
                <Comments
                  comment={comment}
                  userName={name}
                  userImg={avatarUrl}
                  time={getTimeAgoString(new Date(createdAt))}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
