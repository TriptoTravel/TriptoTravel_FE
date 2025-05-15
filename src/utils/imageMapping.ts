import { ConfirmedImage } from "@/contexts/types";

export function getImageUrlById(
  confirmedImages: ConfirmedImage[],
  imageId: number
): string | undefined {
  const found = confirmedImages.find((img) => img.image_id === imageId);
  return found ? found.image_url : undefined;
}