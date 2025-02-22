/**
 * To have a one in a billion chance of duplication,
 * approximately 295.5 trillion (295,547,804,539,008) 21-character IDs would need to be generated.
 * Source: ChatGPT
 */
export const generateNanoId = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  // Generate a random 21-character alphanumeric string to mimic nanoid
  for (let i = 0; i < 21; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
