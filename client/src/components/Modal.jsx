import { graylight, orange } from "../data/StyleGuide";

export default function Modal(props) {
  const { changeModalState, openModal } = props;
  return (
    <div>
      {openModal && (
        <div>
          {/* modal bg */}
          <div onClick={changeModalState} className="modal-bg"></div>
          <div className="modal  m-auto bg-gray-800">
            <div className="flex justify-end py-2 ">
              <svg
                onClick={changeModalState}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}
