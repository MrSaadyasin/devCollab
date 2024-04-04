
export default function ChatSingleMessage({img, content, current,time }) {
  return (
    <div>
      <div
        className={`
        flex gap-3 items-start ${current ? "justify-end " : ""}`}
      >
        {!current && (
          <img className="rounded-full w-10 " src={img} alt="user" />
        )}
        {current && (
          <small className=" mt-2 text-gray-400 hover:text-gray-300 text-xs tracking-widest ">
            {time}
          </small>
        )}
        <p
          className={`${
            current ? "bg-gray-600" : "bg-orange-400 "
          }  font-mono font-medium inline-block px-3 rounded-lg py-2 my-2 first-letter:`}
        >
          {content}
        </p>

        {!current && (
          <small className=" w-36 mt-2 text-gray-400 hover:text-gray-300 text-xs tracking-widest ">
            {time}
          </small>
        )}
        {current && (
          <img className="rounded-full w-10 " src={img} alt="user" />
        )}
      </div>
    </div>
  );
}
// ${current ? 'float-right':''}
