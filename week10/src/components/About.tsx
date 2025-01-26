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
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${amountLoaded}`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        loadPosts();
    }, [amountLoaded]);

    const loadMorePosts = () => {
        setAmountLoaded(prevAmount => prevAmount + 12);
    };

    return (
        <div>
            <h2>About</h2>
            <div className="grid-container">
                {posts.map(post => (
                    <div key={post.id} className="grid-item">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            <button onClick={loadMorePosts}>Show More</button>
            </div>
        </div>
    );
};

export default About;
