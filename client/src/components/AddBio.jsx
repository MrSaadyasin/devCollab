import React from 'react'
import useModal from '../hooks/useModal';
import Modal from './Modal';
import { useState } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { orange } from '../data/StyleGuide';

export default function AddBio() {
  const [openModal, changeModalState] = useModal();
  const [bioText, setBioText] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const submitBio = async (e) => {
    try {
      e.preventDefault();
      if (bioText.length > 10) {
        const res = await axiosPrivate.post("/api/user/add-bio", {
          bio: bioText,
        });
        if (res.status === 200) {
            setBioText("");
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
    <div>
        <p  onClick={changeModalState} className="cursor-pointer underline text-sm my-2">Add Bio</p>
        {openModal && (
        <Modal changeModalState={changeModalState} openModal={openModal}>
          <form onSubmit={submitBio}>
            <textarea
              onChange={(e) => setBioText(e.target.value)}
              className={`w-full  p-2 bg-gray-900`}
              name="bio"
              id=""
              placeholder="bio (10 chars minimum)..."
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
  )
}
