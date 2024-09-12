import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useHistory, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/post";
import axios from "axios";
import post from "./api/post";
import EditPost from "./EditPost";
function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const a = "";
  const handleDelete = async (postId) => {
    console.log(`id: ${postId}`);
    const newPosts = posts.filter((post) => post.id !== postId);
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(newPosts);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const [addTitle, setTitle] = useState("");
  const [addBody, setBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const handleEdit = async (e, id) => {
    e.preventDefault();
    const updateObject = {
      id,
      title: editTitle,
      body: editBody,
      datetime: new Date().getFullYear(),
    };
    try {
      const response = await api.put(`/posts/${id}`, updateObject);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditBody(editBody);
      setEditTitle(editTitle);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    ////// nhánh 1 neeeeee
    e.preventDefault();
    const newId = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
    const newPost = {
      id: newId,
      title: addTitle,
      datetime: new Date().getFullYear(),
      body: addBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      console.log("post ne");
      console.log(response.data);
      const newPostLists = [...posts, newPost];
      setPosts(newPostLists);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [posts, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(`errrrrror: ${err.message}`);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <Header title="Tiêu đề nè" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        {" "}
        {/* Bao bọc các Route bởi Routes */}
        <Route path="/" element={<Home posts={searchResult} />} />
        <Route
          path="/post"
          element={
            <NewPost
              addTitle={addTitle}
              addBody={addBody}
              setTitle={setTitle}
              setBody={setBody}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage handleDelete={handleDelete} posts={posts} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              handleEdit={handleEdit}
              posts={posts}
              editTitle={editTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              setEditTitle={setEditTitle}
            />
          }
        />
        <Route path="*" element={<Missing />} />{" "}
        {/* Route này để xử lý các đường dẫn không hợp lệ */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
