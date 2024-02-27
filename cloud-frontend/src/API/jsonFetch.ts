export const jsonFetch = async (
  search: string | { url: string; options: object }
) => {
  let url;
  let options = {};
  if (typeof search == "string") {
    url = search;
  } else {
    url = search.url;
    options = search.options;
  }
  const response = await fetch(url, options);
  if (!response.ok)
    throw new Error(`${response.status}-${response.statusText}`);

  const result = await response.json();

  return result && JSON.stringify(result);
};
