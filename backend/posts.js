const initiatePosts = (userId, postData) => {
    const data = { userId, ...postData }
    return data
}

module.exports = posts = {
    initiatePosts,
}