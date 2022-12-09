import React from "react";
import toast from "react-hot-toast";
import {usePosts} from "../context/postContext";
import {useNavigate} from "react-router-dom";

export const PostCard = ({post}) => {
  const {deletePost} = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className='text-white'>
            Do you want to delete?<strong>{id} </strong>
          </p>
          <div>
            <button
              className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm'
              onClick={() => {
                toast.dismiss(t.id);
                deletePost(id);
              }}>
              Delete
            </button>
            <button
              className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2'
              onClick={() => toast.dismiss(t.id)}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      },
    );
  };
  return (
    <div
      className='grid grid-cols-1 w-full bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer relative py-2'
      onClick={() => navigate(`/posts/${post._id}`)}>
      <div className='px-4 py-5'>
        <div
          className={`grid ${
            post.image
              ? "grid-flow-col auto-cols-max justify-between"
              : "grid-cols-2"
          }`}>
          <h3 className='w-full text-lg whitespace-nowrap'>{post.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
            className='max-w-max justify-self-end bg-red-600 hover:bg-red-500 text-sm px-2 py-2 rounded-sm absolute right-0 top-0'>
            Delete
          </button>
        </div>
        <p className='text-base text-gray-400'>{post.description}</p>
      </div>
      {post.image && (
        <img
          onClick={(e) => e.stopPropagation()}
          src={post.image.url}
          alt={post.title}
          className='w-max  h-max object-cover'
        />
      )}
    </div>
  );
};
