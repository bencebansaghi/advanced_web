import { useEffect, useState } from 'react';
import "../styles/About.css";

interface Post {
    id: number;
    title: string;
    body: string;
}

const About = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [amountLoaded, setAmountLoaded] = useState<number>(12);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        loadPosts();
    }, []);

    const addMore = () => {
        setAmountLoaded((prev) => prev + 12);
    };

    return (
        <div>
            <h1>About</h1>
            <div className="grid-container">
                {posts.slice(0, amountLoaded).map((post) => (
                    <div key={post.id} className="grid-item">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
            <button onClick={addMore}>Show More</button>
        </div>
    );
};

export default About;
