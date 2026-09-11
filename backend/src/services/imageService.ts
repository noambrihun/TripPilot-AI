const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

type Photo = {
    src:{
        large: string;
    };
}

export const getDestinationImages = async (destination: string,generatedPlan:string) => {
  const sections = generatedPlan.split(/(?=^#{1,3}\s*(?:Day\s*\d+|יום\s*\d+))/gim);  
  console.log("SECTIONS:", sections);
   const days = sections.slice(1, 5);
  console.log("DAYS FOR IMAGES:", days);
  const dayTitles = days.map((day) => {
    const title = day.split("\n")[0];

    return title
  .replace(/^#{1,6}\s*(?:Day|יום)\s*\d+\s*[-–:]?\s*/i, "")
  .trim();
   });
   console.log("DAY TITLES:", dayTitles);
   const imagePromises = dayTitles.map(async (dayTitle) => {
  const query = `${destination} ${dayTitle}`;

  console.log("PEXELS QUERY:", query);
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

  console.log("DAY TITLES:", dayTitles);
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
