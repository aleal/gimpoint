class BusinessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BusinessError';
  }
}
export default BusinessError;
