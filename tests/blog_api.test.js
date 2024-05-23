const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const initialBlogs = [
  {
    title: "first blog",
    author: "tom holland",
    url: "lovestolaugh.com",
    likes: 93,
  },
  {
    title: "second blog",
    author: "zendaya",
    url: "lovestosmile.com",
    likes: 77,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("unique identifier property is named id", async () => {
  const response = await api.get("/api/blogs");

  assert(response.body.every((blog) => blog.hasOwnProperty("id")));
});

test("POST request successfully makes new blog post", async () => {
  const newBlog = {
    title: "New Blog",
    author: "Me",
    url: "NewBlog.com",
    likes: 58,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  console.log(response);

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  assert(titles.includes("New Blog"));
});

after(async () => {
  await mongoose.connection.close();
});
