module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'bc-desafio-02',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
