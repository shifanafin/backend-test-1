const request = require('supertest');
const app = require('../app');

// Add blog post succeeded Test
describe('Add blog post succeeded Test', () => {
  test('should add a valid blog post with all fields', async () => {
    const response = await request(app)
      .post('/api/blogs/add')
      .send({
        title: 'Valid Title',
        description: 'Valid Description',
        main_image: 'valid_main_image.jpg',
        additional_images: ['valid_image_1.jpg', 'valid_image_2.jpg'],
        date_time: 1671017981
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Valid Title');
    expect(response.body.description).toBe('Valid Description');
    expect(response.body.main_image).toBe('valid_main_image.jpg');
    expect(response.body.additional_images).toBe('valid_additional_images.jpg');
    expect(response.body.date_time).toBe('1671017981');

  });
});

//  Add blog post failed Tests
describe('Add blog post failed Tests', () => {
  // Add partial blog post fields
  test('should return error for partial blog post fields', async () => {
    const response = await request(app)
      .post('/api/blogs/add')
      .send({
        title: 'Part',
        description: 'Vali',
        main_image: 'valid_main_image.web',
        additional_images: ['valid_image_1.jpg'],
        date_time: 16
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid description');
    expect(response.body.error).toBe('Invalid title');
    expect(response.body.error).toBe('Invalid  additional_images');
    expect(response.body.error).toBe('Invalid  date_time');
    expect(response.body.error).toBe('Invalid main_image');
  });

  // Add full blog post fields with main_image that exceeds 1MB
  test('should return error for main_image exceeding 1MB', async () => {
    const response = await request(app)
      .post('/api/blogs/add')
      .send({
        title: 'Valid Title',
        description: 'Valid Description',
        main_image: 'invalid_large_image.jpg',                                   // sending a large image
        additional_images: ['valid_image_1.jpg', 'valid_image_2.jpg'],
        date_time: 1671017981
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Exceeded image size of 1MB');
  });

  // Add full blog post fields with title that has special characters
  test('should return error for title with special characters', async () => {
    const response = await request(app)
      .post('/api/blogs/add')
      .send({
        title: 'Special Title#$%', //      
        description: 'Valid Description',
        main_image: 'valid_main_image.jpg',
        additional_images: ['valid_image_1.jpg', 'valid_image_2.jpg'],
        date_time: 1671017981
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Title has special characters');
  });

  //  Add full blog post fields with ISO date_time
  test('should return error for date_time being ISO string', async () => {
    const response = await request(app)
      .post('/api/blogs/add')
      .send({
        title: 'Valid Title',
        description: 'Valid Description',
        main_image: 'valid_main_image.jpg',
        additional_images: ['valid_image_1.jpg', 'valid_image_2.jpg'],
        date_time: '2022-12-14T11:38:05.000Z' 
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Date time is not unix time');
  });
});



//  Add blog post then Get all blog posts successful Test
describe('Add blog post then Get all blog posts successful Test', () => {
    it('should successfully add a blog post and retrieve it', async () => {
      const addResponse = await request(app)
        .post('/api/blog/add')
        .send({
          title: 'Valid Title',
          description: 'Valid Description',
          main_image: 'valid_main_image.jpg',
          additional_images: ['valid_image1.jpg', 'valid_image2.jpg'],
          date_time: 1671017885
        });
  
      const getAllResponse = await request(app)
        .get('/api/blogs/all');
  
      expect(addResponse.status).toBe(200);
      expect(getAllResponse.status).toBe(200);
      expect(getAllResponse.body).toEqual(expect.arrayContaining([addResponse.body]));
    });
  });
  
  // Add blog post then Get all blog posts failed Test
  describe('Add blog post then Get all blog posts failed Test', () => {
    it('should fail to retrieve a non-existent blog post', async () => {
      const response = await request(app)
        .get('/api/blogs/add');
  
      expect(response.status).toBe(200);
      expect(response.body).not.toEqual(expect.arrayContaining([{
        title: 'invalid Title',
        description: 'invalid description',
        main_image: 'invalid main_image',
        additional_images: 'invalid additional_images',
        date_time: 'invalid date_time'
      }]));
    });
  });
  
  // Get token from Generate token API and send to Get image by token API successful Test
  describe('Get token from Generate token API and send to Get image by token API successful Test', () => {
    it('should successfully generate and retrieve image by token', async () => {
      const generateTokenResponse = await request(app)
        .post('/api/tokens/generate')
        .send({
          image_path: 'valid_image.jpg'
        });
  
      const getImageByTokenResponse = await request(app)
        .get('/api/tokens/getAll')
        .query({
          image_path: 'valid_image.jpg',
          token: generateTokenResponse.body.token
        });
  
      expect(generateTokenResponse.status).toBe(200);
      expect(getImageByTokenResponse.status).toBe(200);
    });
  });
  
  // Get token from Generate token API and send to Get image by token API failed Test
  describe('Get token from Generate token API and send to Get image by token API failed Test', () => {
    it('should fail to retrieve image with invalid token', async () => {
      const generateTokenResponse = await request(app)
        .post('/api/tokens/generatenpm run')
        .send({
          image_path: 'valid_image.jpg'
        });
  
      const getImageByTokenResponse = await request(app)
        .get('/api/tokens/getAll')
        .query({
          image_path: 'valid_image.jpg',
          token: 'invalid_token'
        });
  
      expect(generateTokenResponse.status).toBe(200);
      expect(getImageByTokenResponse.status).toBe(400);
      expect(getImageByTokenResponse.body.error).toBe('Bad token');
    });
  });