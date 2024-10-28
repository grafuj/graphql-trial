let movies = [
    { id: "1", title: "Inception", platform: ["Netflix", "Hulu"] },
    { id: "2", title: "Interstellar", platform: ["Amazon Prime"] },
    { id: "3", title: "The Dark Knight", platform: ["Disney+"] },
    { id: "4", title: "Memento", platform: ["HBO Max", "Netflix"] },
    { id: "5", title: "Dunkirk", platform: ["Hulu", "Amazon Prime"] },
];
let authors = [
    { id: "1", name: "Jill", verified: true },
    { id: "2", name: "Bean", verified: true },
    { id: "3", name: "Sam", verified: false },
];
let reviews = [
    {
        id: "1",
        rating: 9,
        content: "Fantastic movie!",
        author_id: "1",
        movie_id: "1",
    },
    {
        id: "2",
        rating: 8,
        content: "Really enjoyed it",
        author_id: "2",
        movie_id: "1",
    },
    {
        id: "3",
        rating: 7,
        content: "Good but could be better",
        author_id: "3",
        movie_id: "2",
    },
    {
        id: "4",
        rating: 6,
        content: "Average film",
        author_id: "1",
        movie_id: "3",
    },
    {
        id: "5",
        rating: 10,
        content: "Masterpiece!",
        author_id: "2",
        movie_id: "4",
    },
    { id: "6", rating: 5, content: "Not my type", author_id: "3", movie_id: "4" },
    {
        id: "7",
        rating: 8,
        content: "Great visuals",
        author_id: "1",
        movie_id: "5",
    },
    {
        id: "8",
        rating: 9,
        content: "Amazing storyline",
        author_id: "2",
        movie_id: "5",
    },
    {
        id: "9",
        rating: 4,
        content: "Quite boring",
        author_id: "3",
        movie_id: "1",
    },
    { id: "10", rating: 7, content: "Enjoyable", author_id: "1", movie_id: "2" },
    { id: "11", rating: 9, content: "Thrilling!", author_id: "2", movie_id: "3" },
    { id: "12", rating: 6, content: "Just okay", author_id: "3", movie_id: "4" },
];
export default { movies, authors, reviews };
