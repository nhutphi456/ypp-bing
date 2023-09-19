const PATH = "./components";
export const templateDictionary: Record<string, string> = {};

export async function loadTemplate(url: string): Promise<string> {
  const response = await fetch(`${PATH}${url}`);
  const html = await response.text();

  return html;
}
