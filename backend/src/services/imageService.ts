const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

type Photo = {
    src:{
        large: string;
    };
}

export const getDestinationImages = async (destination: string,interests:string[]) => {
  
   const imagePromises = interests.slice(0,4).map(async(interest) => {
  const query = `${destination} ${interest}`;

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`,
    {
      headers: {
        Authorization: PEXELS_API_KEY || "",
      },
    }
  );
  
  const data = await response.json();
  
  return data.photos[0]?.src.large;
});
const dayImages = await Promise.all(imagePromises);
console.log("DAY IMAGES:", dayImages);

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(destination)}&orientation=landscape&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY || "",
        },
      }
    );
    const data = await response.json();
    const heroImage = data.photos[0]?.src.large;
    const images = [heroImage, ...dayImages];
    return images;
  };
