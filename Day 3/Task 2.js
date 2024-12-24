
function fetchPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                console.log(`Title: ${post.title}, User ID: ${post.userId}`);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}


fetchPosts();
