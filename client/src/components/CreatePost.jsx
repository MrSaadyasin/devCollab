import {
  graylight,
  hoverTextOrange,
  orange,
} from "../data/StyleGuide";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
export default function CreatePost({setCurrentPost}) {
  const [openModal, changeModalState] = useModal();
  const [postText, setPostText] = useState("");
  const axiosPrivate = useAxiosPrivate();
  
  const submitPost = async (e) => {
    try {
      e.preventDefault();
      if (postText.length > 10) {
        const res = await axiosPrivate.post("/api/dev-posts", {
          body: postText,
        });
        if (res.status === 200) {
          setPostText("");
          setCurrentPost(res?.data?.body)
        }
        changeModalState();
      } else {
        alert("Post lenght should be more than 10 words");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`  m-auto bg${graylight} rounded-md   p-3  my-4`}>
      <p
        onClick={changeModalState}
        className={`text-sm text-gray-300 cursor-pointer ${hoverTextOrange}`}
      >
        What's on your mind?
      </p>
      {openModal && (
        <Modal changeModalState={changeModalState} openModal={openModal}>
          <form onSubmit={submitPost}>
            <textarea
              onChange={(e) => setPostText(e.target.value)}
              className={`w-full  p-2 bg-gray-900`}
              name="post"
              id=""
              placeholder="Start writing..."
              rows="10"
            ></textarea>
            <div className="text-right py-3">
              <button
                className={`bg${orange} px-4 py-1 rounded-lg font-medium tracking-wider `}
              >
                Write
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
