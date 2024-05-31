const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    const res = await fetch(
        // Handle the case where the damain is not availiable yet
      `${apiDomain}/properties`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { fetchProperties };
