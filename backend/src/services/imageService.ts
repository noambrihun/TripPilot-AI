const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

type Photo = {
    src:{
        large: string;
    };
}

export const getDestinationImages = async (destination: string,generatedPlan:string) => {
  const sections = generatedPlan.split(/(?=## Day \d+)/);
  const days = sections.slice(1, 5);
  console.log("DAYS FOR IMAGES:", days);
  const dayTitles = days.map((day) => {
    const title = day.split("\n")[0];

    return title.replace(/^## Day \d+.*?:\s*/, "")  });

  console.log("DAY TITLES:", dayTitles);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(destination)}&orientation=landscape&per_page=5`,
      {
        headers: {
          Authorization: PEXELS_API_KEY || "",
        },
      }
    );
    const data = await response.json();
    const images = data.photos.map((photo: Photo) => photo.src.large);
    return images;
  };
