import React, {useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {usePosts} from "../context/postContext";
import {useNavigate, useParams, Link} from "react-router-dom";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

export const PostForm = () => {
  const [nameFile, setNameFile] = useState("");
  const {createPost, getPost, updatePost} = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 p-5 shadow-md shadow-black'>
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>New Post</h3>
          <Link to='/' className='text-gray-400 text-sm hover:text-gray-300'>
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required").min(4).max(20),
            description: Yup.string().required("Description is Required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize={true}>
          {({handleSubmit, setFieldValue, isSubmitting}) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor='title'
                className='text-sm block font-bold text-gray-400 md:w-96'>
                Title
              </label>
              <Field
                name='title'
                placeholder='title'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4'
              />
              <ErrorMessage
                component='p'
                className='text-red-400 text-sm'
                name='title'
              />
              <label
                htmlFor='description'
                className='text-sm block font-bold text-gray-400'>
                Description
              </label>
              <Field
                component='textarea'
                name='description'
                placeholder='description'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                rows={3}
              />
              <ErrorMessage
                component='p'
                className='text-red-400 text-sm'
                name='description'
              />
              <label
                htmlFor='image'
                className='text-sm block font-bold text-gray-400'>
                Image
              </label>

              <div className='md:max-w-max text-sm px-3 py-2 focus:outline-none rounded bg-cyan-800 hover:bg-cyan-600 hover:cursor-pointer text-white w-full relative'>
                <p className='hover:cursor-pointer z-20'>
                  {nameFile ? `File: ${nameFile}` : "Seleccione una imagen"}
                </p>
                <input
                  type='file'
                  name='image'
                  className='opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full'
                  onChange={(e) => {
                    setNameFile(e.target.files[0].name);
                    setFieldValue("image", e.target.files[0]);
                  }}
                />
              </div>
              <button
                type='submit'
                className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400'
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
