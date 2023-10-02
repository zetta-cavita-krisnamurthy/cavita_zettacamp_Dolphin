const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

function generateToken(payload) {
  console.log(payload)
  console.log(secretKey)
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
    
  } catch (error) {
    console.log(error);
  }
}

function verifyToken(rawToken) {
  try {
    let token = rawToken.split(' ')[1];
    
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new ApolloError('Invalid token');
  }
}

module.exports = { generateToken, verifyToken };