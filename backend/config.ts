export const serverConfig = {
  app: {
    publicFolder: 'public',
    languagesFolder: 'languages'
  },
  jwt: {
    options: {
      expiresIn: '1d'
    }
  },
  mongodb: {
    options: {
      useUnifiedTopology: true
    }
  }
};
