import { useEffect, useState } from 'react';
// Adjust the import path if your generated files are structured differently
// e.g. if PostController.ts is directly under api/
import { show, store } from './api/actions/PostController';
// Or if you have an index.ts in api/ that exports them:
// import { show, store } from './api';


function App() {
  const [post, setPost] = useState<any>(null); // Consider defining a Post type

  // Fetch post with ID 1
  useEffect(() => {
    // Ensure your Laravel backend is running and accessible at http://localhost:8000
    // and that CORS is configured if they are on different ports/domains.
    const { url, method }_ = show(1); // Assuming show(1) returns an object with url and method

    fetch(url, { // This will be http://localhost:8000/posts/1 if your Laravel app is served there
      method: method,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setPost)
      .catch(error => {
        console.error("Error fetching post:", error);
        // Handle error appropriately in UI
      });
  }, []);

  // Submit new post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { url, method }_ = store(); // Assuming store() returns an object with url and method

    try {
      const response = await fetch(url, { // This will be http://localhost:8000/posts
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          title: 'My New Post from React', // Example title
          body: 'This is the body of the post sent from the React app.', // Example body
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      console.log('Post submitted successfully:', newPost);
      // Optionally, update UI or fetch posts again
      // For example, refetch post 1 or fetch all posts if you have such an endpoint
      // Or optimistically update the UI with newPost if the backend confirms creation (e.g. returns the created post)

    } catch (error) {
      console.error("Error submitting post:", error);
      // Handle error appropriately in UI
    }
  };

  return (
    <div>
      <h1>Wayfinder Test with Laravel & React</h1>
      {post ? (
        <div>
          <h2>Post Details (ID: {post.id})</h2>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p><small>Created at: {new Date(post.created_at).toLocaleString()}</small></p>
          <p><small>Updated at: {new Date(post.updated_at).toLocaleString()}</small></p>
        </div>
      ) : (
        <p>Loading post...</p>
      )}

      <form onSubmit={handleSubmit}>
        <button type="submit">Submit New Post</button>
      </form>
    </div>
  );
}

export default App;
