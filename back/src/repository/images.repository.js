const imagesRepository = {};

imagesRepository.saveImage = async (prompt, filename, id) => {
    const query = `INSERT INTO images (description, url, user_id) VALUES ($1, $2, $3)`;
    const values = [prompt, filename, id];
    return pool.query(query, values);
}

imagesRepository.getURLImagesByUserId = async (userId) => {
    const query = `SELECT url FROM images WHERE user_id = ${userId}`;
    return pool.query(query);
}

module.exports = imagesRepository;