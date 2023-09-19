const PATH = "./components";
export async function loadTemplate(url: string): Promise<string> {
  const response = await fetch(`${PATH}${url}`);
  return await response.text();
}
