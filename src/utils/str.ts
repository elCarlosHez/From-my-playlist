// TODO: Find a better approach to generate a random string
export const generateRandomString = (): string => (Math.random() + 1).toString(36).substring(2);
export default {};
