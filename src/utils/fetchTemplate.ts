const PATH = "./components";

export async function loadTemplate(url: string): Promise<string> {
  const response = await fetch(`${PATH}${url}`);
  const html = await response.text();
  
  return html;
}
