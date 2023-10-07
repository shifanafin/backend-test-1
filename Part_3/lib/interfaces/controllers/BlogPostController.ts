// infrastructure/webserver/controllers/blogPost/BlogPostController.ts

import { Request, Response } from 'express';
import { ServiceLocator } from '../../infrastructure/config/service-locator';
import BlogPost from '../../domain/entities/BlogPost';
import BlogPostValidator from '../../domain/validators/BlogPostValidator';
import ListBlogPosts from '../../application/use_cases/blogPost/ListBlogPosts';
import CreateBlogPost from '../../application/use_cases/blogPost/CreateBlogPost';
import GetBlogPost from '../../application/use_cases/blogPost/GetBlogPost';
import UpdateBlogPost from '../../application/use_cases/blogPost/UpdateBlogPost';
import DeleteBlogPost from '../../application/use_cases/blogPost/DeleteBlogPost';

export default {

  async createBlogPost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const data = request.body;

    // Validation
    try {
      await BlogPostValidator.validateAsync(data);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }

    // Treatment
    let blogPost = null;
    let error = null;
    try {
      blogPost = await CreateBlogPost(data, serviceLocator);
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      }
    }

    // Output
    if (!blogPost) {
      return response.status(400).json({ message: error });
    }
    const output = serviceLocator.blogPostSerializer.serialize(blogPost, serviceLocator);
    return response.status(201).json(output);
  },

  async listBlogPosts(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Treatment
    const blogPosts = await ListBlogPosts(serviceLocator);

    // Output
    const output = blogPosts
      .map((blogPost: BlogPost) => serviceLocator.blogPostSerializer.serialize(blogPost, serviceLocator));
    return response.json(output);
  },

  async getBlogPost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const blogPostId = request.params.id;

    // Treatment
    let blogPost = null;
    try {
      blogPost = await GetBlogPost(blogPostId, serviceLocator);
    } catch (err) {
      console.log(err);
    }

    // Output
    if (!blogPost) {
      return response.status(404).json({ message: 'Not Found' });
    }
    const output = serviceLocator.blogPostSerializer.serialize(blogPost, serviceLocator);
    return response.json(output);
  },

  async updateBlogPost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const blogPostId = request.params.id;
    const inputData = request.body;
    const data: any = {
      id: blogPostId
    };
    const acceptedFields: string[][] = [
      ['title'],
      ['content'],
      ['authorId'],
      // Add more fields as needed
    ];
    acceptedFields.forEach((acceptedField) => {
      if (inputData[acceptedField[0]] === undefined) return;
      data[acceptedField[0]] = inputData[acceptedField[0]];
    });

    // Treatment
    let blogPost = null;
    let error = null;
    try {
      blogPost = await UpdateBlogPost(data, serviceLocator);
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      }
    }

    // Output
    if (!blogPost) {
      return response.status(400).json({ message: error });
    }
    const output = serviceLocator.blogPostSerializer.serialize(blogPost, serviceLocator);
    return response.json(output);
  },

  async deleteBlogPost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const blogPostId = request.params.id;

    // Treatment
    let blogPost = null;
    try {
      blogPost = await DeleteBlogPost(blogPostId, serviceLocator);
    } catch (err) {
      console.log(err);
    }

    // Output
    if (!blogPost) {
      return response.status(404).json({ message: 'Not Found' });
    }
    return response.sendStatus(204);
  },

};
