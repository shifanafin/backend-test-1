

import constants from './constants';
import environment from './environment';
import PasswordManager from '../../domain/services/PasswordManager';
import AccessTokenManager from '../../application/security/AccessTokenManager';
import Serializer from '../../interfaces/serializers/Serializer';
import UserRepository from '../../domain/repositories/UserRepository';
import BcryptPasswordManager from '../security/BcryptPasswordManager';
import JwtAccessTokenManager from '../security/JwtAccessTokenManager';
import UserSerializer from '../../interfaces/serializers/UserSerializer';
import UserRepositoryMongo from '../repositories/mongoose/UserRepositoryMongo';
// new
import BlogPostRepository from '../../domain/repositories/BlogPostRepository';
import BlogPostRepositoryMongo from '../repositories/mongoose/BlogPostRepositoryMongo';
import BlogPostSerializer from '../../interfaces/serializers/BlogPostSerializer';

export type ServiceLocator = {
  passwordManager: PasswordManager,
  accessTokenManager: AccessTokenManager,
  userSerializer: Serializer,
  userRepository?: UserRepository,
  // new
  blogPostSerializer: Serializer; 
  blogPostRepository?: BlogPostRepository; 
};

function buildBeans() {
  const beans: ServiceLocator = {
    passwordManager: new BcryptPasswordManager(),
    accessTokenManager: new JwtAccessTokenManager(),
    userSerializer: new UserSerializer(),
    // new
    blogPostSerializer: new BlogPostSerializer(), 
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    beans.userRepository = new UserRepositoryMongo();
    // ṇew
    beans.blogPostRepository = new BlogPostRepositoryMongo(); 
  }

  return beans;
}

export default buildBeans();
