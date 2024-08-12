import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Homepage</h1>
            {categories.map(category => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    <ul>
                        {category.quizzes.sort((a, b) => b.turnFinish - a.turnFinish).map(quiz => (
                            <li key={quiz.id}>
                                <a href={`/quiz/${quiz.id}`}>{quiz.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
