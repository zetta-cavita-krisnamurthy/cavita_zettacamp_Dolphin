const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const secretKey = 'C4vtA-s3CreTkEy';

function verifyToken(rawToken) {
  try {
    let token = rawToken.split(' ')[1];
    
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new ApolloError('Invalid token');
  }
}

module.exports = { verifyToken };