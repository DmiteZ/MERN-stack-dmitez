import React from "react";
import {usePosts} from "../context/postContext";
import {VscEmptyWindow} from "react-icons/vsc";
import {Link} from "react-router-dom";
import {PostCard} from "../components/PostCard.js";

export const HomePage = () => {
  const {posts} = usePosts();
  if (posts.length === 0)
    return (
      <>
        <header className='flex py-4'>
          <Link
            to='/new'
            className='max-w-max px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white'>
            Create New Post
          </Link>
        </header>

        <div className='flex flex-col justify-center items-center'>
          <VscEmptyWindow className='w-48 h-48 text-white' />
          <h1 className='text-white text-2xl'>There are no posts</h1>
        </div>
      </>
    );
  return (
    <div className='text-white py-6'>
      <header className='flex items-center justify-between py-4'>
        <h1 className='text-2xl text-gray-300 font-bold'>
          Posts ({posts.length})
        </h1>
        <Link
          to='/new'
          className='px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-sm'>
          Create New Post
        </Link>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center '>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
