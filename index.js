import express      from 'express';
import sessions     from 'express-session';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';

const app  = express();
const port = 5000;

const blogPosts = [];
let nextId = 1;

blogPosts.push({
    "id": 1,
    "content": "This is my first blog post!",
    "date": "2020-01-01",
    "username": "admin"
});

app.use(sessions({
    secret:            "jecna-test",
    resave:            false,
    saveUninitialized: false,
}))
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('*', (req, res) => res.status(400).send("Invalid path"));

app.post('/api/blog', (req, res) => {
    const { content, date, username } = req.body;
  
    if (!content || !date || !username) {
      return res.status(400).json({ error: 'Content, date, and username are required.' });
    }
  
    const newPost = {
      id: nextId,
      content,
      date,
      username,
    };
  
    nextId++;
    blogPosts.push(newPost);
  
    res.status(201).json({ id: newPost.id });
  });

app.get('/api/blog', (req, res) => {
    res.status(200).json(blogPosts);
});

app.get('/api/blog/blogId', (req, res) => {
    const { blogId } = req.params;
  
    const blogPost = blogPosts.find((post) => post.id === Number(blogId));
  
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
  
    res.status(200).json(blogPost);
});

app.delete('/api/blog/blogId', (req, res) => {
    const { blogId } = req.params;
  
    const index = blogPosts.findIndex((post) => post.id === Number(blogId));
  
    if (index === -1) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
  
    blogPosts.splice(index, 1);
  
    res.sendStatus(204);
});

app.patch('/api/blog/blogId', (req, res) => {
    const { blogId } = req.params;
    const { content } = req.body;
  
    const index = blogPosts.findIndex((post) => post.id === Number(blogId));
  
    if (index === -1) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
  
    blogPosts[index].content = content;
    blogPosts[index].date = Date.now();
  
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})
