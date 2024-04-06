import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const parseJsonFile = async (file: File) => {
  try {
    const fileObject = URL.createObjectURL(file);

    const res = await fetch(fileObject);

    const awaitedJson = await res.json();

    URL.revokeObjectURL(fileObject);
    return awaitedJson;
  } catch (e) {
    console.log(e);
  }
};

export const saveDataToFile = ({
  data,
  fileName,
}: {
  data: unknown;
  fileName: string;
}) => {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(data)], { type: "StyledText/plain" });

  element.href = URL.createObjectURL(file);
  element.download = `${fileName}.json`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  URL.revokeObjectURL(element.href);
};
